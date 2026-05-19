import os
from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel
from typing import List, Optional
from datetime import date, datetime
from supabase import create_client, Client
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables from .env
load_dotenv()

# Initialize Supabase Client
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

print("DEBUG URL:", url)
print("DEBUG KEY:", key[:10] if key else "KEY IS NONE") # Only prints the first 10 chars so we don't leak the whole key

app = FastAPI(title="LabFlow Pro API")

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Allows all methods (GET, POST, PATCH, etc.)
    allow_headers=["*"], # Allows all headers
)

# --- Pydantic Models ---

# Model for creating a new order
class OrderCreate(BaseModel):
    item_id: str
    grant_id: str
    quantity: int
    # Status defaults to 'Draft' in DB, but can be set here if needed

# Model for the Logistics PATCH request
class LogisticsUpdate(BaseModel):
    item_cost: float
    shipping_cost: float
    expected_date: date
    # You can add internal_ref or vendor_confirmation_id here based on the modal mockup

# --- Dashboard Endpoints ---

@app.get("/api/dashboard/metrics")
async def get_dashboard_metrics():
    """
    Aggregate data from the Orders table to calculate "Total Value (Pending)" 
    and group by grant_id for the "Grant Distribution" percentages.
    """
    # 1. Fetch all orders that are NOT completed/delivered
    response = supabase.table('orders').select('item_cost, quantity, grant_id, status').neq('status', 'Delivered').execute()
    
    orders = response.data
    
    total_pending_value = 0.0
    grant_totals = {}
    
    # 2. Loop through the orders to aggregate the math
    for order in orders:
        # Calculate the cost of this specific order line
        cost = float(order.get('item_cost') or 0.0) * int(order.get('quantity') or 1)
        
        # Add to the grand total
        total_pending_value += cost
        
        # Add to the specific grant bucket
        g_id = order.get('grant_id')
        if g_id:
            if g_id not in grant_totals:
                grant_totals[g_id] = 0.0
            grant_totals[g_id] += cost
            
    # 3. (Optional) Convert grant_totals into percentages for the UI
    grant_distribution = {}
    if total_pending_value > 0:
        for g_id, g_total in grant_totals.items():
            percentage = (g_total / total_pending_value) * 100
            grant_distribution[g_id] = round(percentage, 1)

    return {
        "total_pending_value": round(total_pending_value, 2),
        "grant_totals_raw": grant_totals,
        "grant_distribution_percentages": grant_distribution
    }

@app.get("/api/dashboard/pending-actions")
async def get_pending_actions():
    """
    Fetch orders specifically with the status "To Order" or "Pending Receipt".
    """
    response = supabase.table('orders').select('*').in_('status', ['To Order', 'Pending Receipt']).execute()
    return response.data


# --- Ledger Endpoints ---

@app.get("/api/orders")
async def list_orders(
    vendor: Optional[str] = None,
    grant: Optional[str] = None,
    start_date: Optional[date] = None,
    limit: int = Query(default=25, le=100),
    offset: int = 0
):
    """
    Accept query parameters to power the "Search Catalog/Vendor" filters.
    Implements pagination (limit/offset).
    """
    # Base query
    query = supabase.table('orders').select('*', count='exact')
    
    # Add filters conditionally
    if grant:
        query = query.eq('grant_id', grant)
    # Add vendor and date logic...
    
    response = query.range(offset, offset + limit - 1).execute()
    return {"data": response.data, "count": response.count}

@app.post("/api/orders")
async def create_order(order: OrderCreate):
    """
    Accept data from the "New Procurement Request" form.
    Database automatically assigns the incremental request_id (1, 2, 3...)
    """
    order_data = order.model_dump()
    
    # 1. Insert into orders table (Notice we aren't adding a request_id to order_data)
    # The database will automatically fill it in with the next number!
    order_response = supabase.table('orders').insert(order_data).execute()
    
    if not order_response.data:
        raise HTTPException(status_code=400, detail="Order creation failed")
        
    new_order_id = order_response.data[0]['id']
    
    # 2. Automatically log the initialization in order_logs
    log_data = {
        "order_id": new_order_id,
        "action_description": "Draft initialized"
    }
    supabase.table('order_logs').insert(log_data).execute()
    
    return order_response.data[0]


# --- Order Detail Endpoints ---

@app.get("/api/orders/{order_id}")
async def get_order_details(order_id: str):
    """
    Fetch a single order, joining data from Vendors, Items, and Grants.
    """
    # Using Supabase's relational query syntax to fetch joined data
    response = supabase.table('orders').select(
        '*, items(*, vendors(*)), grants(*), order_logs(*)'
    ).eq('id', order_id).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Order not found")
        
    return response.data[0]

@app.patch("/api/orders/{order_id}/logistics")
async def update_order_logistics(order_id: str, logistics: LogisticsUpdate): # Keep whatever Pydantic model name you used
    """
    Accepts costs from the "Logistical Data Entry" modal, updating financial reconciliation.
    """
    # Exclude unset fields so we only update what was actually sent, Add mode='json' so dates are converted to safe strings for the database
    update_data = logistics.model_dump(mode='json', exclude_unset=True)
    
    # 1. Update the orders table (LOWERCASE)
    response = supabase.table('orders').update(update_data).eq('id', order_id).execute()
    
    # FIX: Catch the empty array if the order_id doesn't exist, preventing a 500 crash
    if not response.data:
        raise HTTPException(status_code=404, detail="Order not found. Check if the ID is correct.")
        
    # 2. Log the action in order_logs (LOWERCASE)
    log_data = {
        "order_id": order_id,
        "action_description": "Logistics data entered (Costs & Timeline updated)"
    }
    supabase.table('order_logs').insert(log_data).execute()
    
    return response.data[0]
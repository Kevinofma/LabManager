import React, { createContext, useContext, useState, useEffect } from 'react'
import { fetchOrders } from '../utils/api'

const AppContext = createContext(null)

// Mock data for testing when API is unavailable
const MOCK_ORDERS = [
  {
    id: 'REQ-7742-ALPHA',
    item: 'HEK293 Cells',
    description: 'Standard mammalian cell line for protein expression.',
    vendor: 'Thermo Fisher',
    sku: 'R70507',
    qty: '3 x 1.0 mL',
    item_cost: 450.00,
    quantity: 3,
    grant_id: 'NIH-R01-MAIN',
    status: 'To Order'
  },
  {
    id: 'REQ-8901-GAMMA',
    item: "Dulbecco's Medium",
    description: 'High glucose, with stable glutamine.',
    vendor: 'Sigma-Aldrich',
    sku: 'D6429-500ML',
    qty: '24 Units',
    item_cost: 125.50,
    quantity: 24,
    grant_id: 'NIH-R01-MAIN',
    status: 'To Order'
  },
  {
    id: 'REQ-1122-EPSILON',
    item: 'Pipette Tips (Filtered)',
    description: 'Aerosol resistant, sterile, 1000 µL.',
    vendor: 'Eppendorf',
    sku: 'EP-003007',
    qty: '10 Packs',
    item_cost: 85.00,
    quantity: 10,
    grant_id: 'NSF-CORE-24',
    status: 'To Order'
  },
  {
    id: 'REQ-2233-ZETA',
    item: 'Bovine Serum Albumin',
    description: 'Fraction V, 96-99% pure.',
    vendor: 'Bio-Rad',
    sku: 'BR-5000001',
    qty: '5 x 50g',
    item_cost: 320.00,
    quantity: 5,
    grant_id: 'NIH-R01-MAIN',
    status: 'To Order'
  }
]

const MOCK_METRICS = {
  total_pending_value: 42850.00,
  grant_distribution_percentages: {
    'NIH-R01-MAIN': 65,
    'NSF-CORE-24': 35
  }
}

export function AppProvider({ children }) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [metrics, setMetrics] = useState(MOCK_METRICS)

  const loadOrders = async () => {
    setLoading(true)
    try {
      const data = await fetchOrders()
      setOrders(data)
    } catch (err) {
      console.error('Failed to load orders from API, using mock data', err)
      setOrders(MOCK_ORDERS)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOrders()
  }, [])

  return (
    <AppContext.Provider value={{ orders, loading, reloadOrders: loadOrders, metrics }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}

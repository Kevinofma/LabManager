import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import OrdersTable from '../components/dashboard/OrdersTable'
import { AppProvider } from '../context/AppContext'

function renderWithProvider(ui) {
  return render(<AppProvider>{ui}</AppProvider>)
}

test('renders orders and opens logistics modal', async () => {
  renderWithProvider(<OrdersTable />)

  // wait for sample order to appear
  await waitFor(() => expect(screen.getByText(/HEK293 Cells/i)).toBeInTheDocument())

  const placeBtn = screen.getAllByText(/Place Order/i)[0]
  fireEvent.click(placeBtn)

  // modal title
  expect(await screen.findByText(/Enter Logistics/i)).toBeInTheDocument()

  // fill and submit
  const saveBtn = screen.getByText('Save')
  fireEvent.click(saveBtn)

  // after submit modal closes (server responds quickly)
  await waitFor(() => expect(screen.queryByText(/Enter Logistics/i)).not.toBeInTheDocument())
})

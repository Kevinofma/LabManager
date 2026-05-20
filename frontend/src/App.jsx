import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/common/Layout'
import Dashboard from './pages/Dashboard/Dashboard'
import Orders from './pages/Orders/Orders'
import OrderDetails from './pages/Orders/OrderDetails'
import NewRequest from './pages/NewRequest/NewRequest'
import PostOrderEntry from './pages/PostOrderEntry/PostOrderEntry'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="orders/:orderId" element={<OrderDetails />} />
        <Route path="new-request" element={<NewRequest />} />
        <Route path="post-order-entry" element={<PostOrderEntry />} />
      </Route>
    </Routes>
  )
}

export default App
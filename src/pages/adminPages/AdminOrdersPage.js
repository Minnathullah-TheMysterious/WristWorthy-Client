import React from 'react'
import Layout from './../../features/layout/Layout';
import AdminOrders from '../../features/admin/components/AdminOrders';

const AdminOrdersPage = () => {
  return (
    <Layout pageTitle={'WristWorthy - Admin Orders'}>
      <AdminOrders/>
    </Layout>
  )
}

export default AdminOrdersPage

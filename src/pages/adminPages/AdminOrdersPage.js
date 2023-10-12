import React, { useEffect } from 'react'
import Layout from './../../features/layout/Layout';
import AdminOrders from '../../features/admin/components/AdminOrders';

const AdminOrdersPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Layout pageTitle={'WristWorthy - Admin Orders'}>
      <AdminOrders/>
    </Layout>
  )
}

export default AdminOrdersPage

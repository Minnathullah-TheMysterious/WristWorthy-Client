import React, { useEffect } from 'react'
import Layout from './../../features/layout/Layout';
import AdminProductDetails from '../../features/admin/components/AdminProductDetails';

const AdminProductDetailsPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Layout pageTitle={'WristWorthy - Admin Product Details'}>
      <AdminProductDetails/>
    </Layout>
  )
}

export default AdminProductDetailsPage

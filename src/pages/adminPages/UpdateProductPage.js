import React, { useEffect } from 'react'
import Layout from '../../features/layout/Layout'
import UpdateProductForm from '../../features/admin/components/UpdateProductForm'

const UpdateProductPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  
  return (
    <Layout pageTitle={'WristWorthy - Update Product'}>
      <UpdateProductForm/>
    </Layout>
  )
}

export default UpdateProductPage

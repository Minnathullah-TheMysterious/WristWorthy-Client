import React from 'react'
import Layout from '../../features/layout/Layout'
import UpdateProductForm from '../../features/admin/components/UpdateProductForm'

const UpdateProductPage = () => {
  return (
    <Layout pageTitle={'WristWorthy - Update Product'}>
      <UpdateProductForm/>
    </Layout>
  )
}

export default UpdateProductPage

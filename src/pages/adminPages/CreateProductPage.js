import React from 'react'
import Layout from './../../features/layout/Layout';
import ProductForm from '../../features/admin/components/ProductForm';

const CreateProductPage = () => {
  return (
    <Layout pageTitle={'WristWorthy - Create Product'}>
      <ProductForm/>
    </Layout>
  )
}

export default CreateProductPage

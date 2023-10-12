import React, { useEffect } from 'react'
import Layout from './../../features/layout/Layout';
import ProductForm from '../../features/admin/components/ProductForm';

const CreateProductPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  
  return (
    <Layout pageTitle={'WristWorthy - Create Product'}>
      <ProductForm/>
    </Layout>
  )
}

export default CreateProductPage

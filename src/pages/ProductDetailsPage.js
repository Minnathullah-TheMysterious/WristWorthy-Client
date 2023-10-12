import React, { useEffect } from 'react'
import ProductDetails from '../features/products/components/ProductDetails'
import Layout from '../features/layout/Layout'

const ProductDetailsPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Layout pageTitle={'WristWorthy - Product Details'}>
      <ProductDetails/>
    </Layout>
  )
}

export default ProductDetailsPage

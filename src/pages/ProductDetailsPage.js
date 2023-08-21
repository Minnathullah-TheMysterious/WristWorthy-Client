import React from 'react'
import ProductDetails from '../features/products/product-details/ProductDetails'
import Layout from '../features/layout/Layout'

const ProductDetailsPage = () => {
  return (
    <Layout pageTitle={'WristWorthy - Product Details'}>
      <ProductDetails/>
    </Layout>
  )
}

export default ProductDetailsPage

import React from 'react'
import Cart from '../features/cart/Cart'
import Layout from '../features/layout/Layout'

const CartPage = () => {
  return (
    <Layout pageTitle={'WristWorthy - Cart'}>
      <Cart btnText={'Checkout'} destination={'/checkout'}/>
    </Layout>
  )
}

export default CartPage

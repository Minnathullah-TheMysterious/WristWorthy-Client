import React from 'react'
import WishList from '../features/wishList/WishList'
import Layout from './../features/layout/Layout';

const WishListPage = () => {
  return (
    <Layout pageTitle={'WristWorthy - WishList'}>
      <WishList/>
    </Layout>
  )
}

export default WishListPage

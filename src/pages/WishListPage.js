import React, { useEffect } from 'react'
import Wishlist from '../features/wishlist/Wishlist'
import Layout from '../features/layout/Layout';

const WishlistPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Layout pageTitle={'WristWorthy - Wishlist'}>
      <Wishlist/>
    </Layout>
  )
}

export default WishlistPage

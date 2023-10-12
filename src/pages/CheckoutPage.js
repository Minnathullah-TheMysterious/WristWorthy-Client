import React, { useEffect } from 'react'
import Checkout from '../features/checkout/Checkout'

const CheckoutPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Checkout/>
    </>
  )
}

export default CheckoutPage

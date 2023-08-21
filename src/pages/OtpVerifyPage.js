import React from 'react'
import OtpVerify from './../features/auth/auth-components/OtpVerify';
import Layout from '../features/layout/Layout';

const OtpVerifyPage = () => {
  return (
    <Layout pageTitle={'WristWorthy - OTP Verification'}>
      <OtpVerify/>
    </Layout>
  )
}

export default OtpVerifyPage

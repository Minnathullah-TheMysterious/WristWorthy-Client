import React from 'react'
import PassReset from './../features/auth/components/PassReset';
import Layout from '../features/layout/Layout';

const PassResetPage = () => {
  return (
    <Layout pageTitle={'WristWorthy - Reset Password'}>
      <PassReset/>
    </Layout>
  )
}

export default PassResetPage

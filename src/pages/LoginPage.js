import React from 'react'
import Login from '../features/auth/auth-components/Login'
import Layout from '../features/layout/Layout'

const LoginPage = () => {
  return (
    <Layout pageTitle={'WristWorthy - Login'}>
      <Login/>
    </Layout>
  )
}

export default LoginPage

import React from 'react'
import Layout from './../features/layout/Layout';
import UserProfile from '../features/user/components/UserProfile';

const UserProfilePage = () => {
  return (
    <Layout pageTitle={'WristWorthy - My Profile'}>
      <UserProfile/>
    </Layout>
  )
}

export default UserProfilePage

import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Navbar } from '../components'

const Layout = () => {
  return (
    <>
        <Navbar />
        <Outlet />
    </>
  )
}

export default Layout
import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'

import '../src/styles/Navbar.css'
import c from '../src/styles/colors'

const NavBar = () => {
  return (
    <Navbar bg="dark">
      <Container >
        <Navbar.Brand style={{ color: c.light_1 }} className="container-navbar" >
          <img
            alt=""
            src="/pwa-192x192.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          <Link to="/" style={{color: c.light_1 }} className="navbar-link">Copa de la Liga 2023</Link>
        </Navbar.Brand>

      </Container>
    </Navbar>
  )
}



export default NavBar
import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'




const NavBar = () => {
  return (
    <Navbar className="navbar" bg="dark">
      <Container >
        <Navbar.Brand className="container-navbar" >
          <img
            alt=""
            src="/pwa-192x192.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          <Link to="/" className="navbar-link">Copa de la Liga 2024</Link>
        </Navbar.Brand>

      </Container>
    </Navbar>
  )
}



export default NavBar
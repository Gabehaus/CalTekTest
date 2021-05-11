import React from "react"
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap"

const HeaderMain = () => {
  return (
    <Navbar
      bg='dark'
      variant='dark'
      expand='lg'
      collapseOnSelect
      className='header1'
    >
      <Container>
        <Navbar.Brand>Cal-Tek Solutions</Navbar.Brand>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            <Nav.Link href='#services'>Services</Nav.Link>
            <Nav.Link href='#projects'>Projects</Nav.Link>
            <Nav.Link href='#testimonials'>Testimonials</Nav.Link>
            <Nav.Link href='#contact'>Contact</Nav.Link>
            <Nav.Link href='/shop'>Shop</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default HeaderMain

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { connect } from "react-redux";
import { useRouter } from 'next/router';

const mapStateToProps = (state, ownProps) => ({
  stateObject: state
})

const logoutHandler = () => {
  window.localStorage.removeItem('game_identifier')
  window.location="/"
};

const Header = (props) => {
  const router = useRouter()

  const dataUser = props.stateObject.user !== 'undefined' ? props.stateObject.user : {}
  
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Link href="/">
          <Navbar.Brand>Binar</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 justify-content-center" 
            style={{ flex: 1}}
            navbarScroll
          >
            <Link href="/home"><a className="btn nav-links me-2">Home</a></Link>
            <Link href="/game"><a className="btn nav-links me-2">Game</a></Link>
            <Link href="/contact"><a className="btn nav-links me-2">Contact</a></Link>
            <Link href="/about"><a className="btn nav-links me-2">About Me</a></Link>
          </Nav>
          {dataUser ? 
            (
              <div>
                <Link href="/profile">
                  <Button variant="outline-primary" className='me-2'>{dataUser.username}</Button>
                </Link>
                <Link href="/">
                  <Button variant="outline-danger" onClick={logoutHandler} >Logout</Button>
                </Link>
              </div>
            )
          : 
            (
              <div>
              <Link href="/login">
                <Button variant="outline-success" className='me-2'>Login</Button>
              </Link>
              <Link href="/registrasi">
                <Button variant="outline-danger">Sign Up</Button>
              </Link>
              </div>
            )
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
};

export default connect(mapStateToProps)(Header);
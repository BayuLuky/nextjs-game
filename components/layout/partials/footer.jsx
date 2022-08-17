import React from 'react';
import { Navbar, Container, NavbarBrand } from "react-bootstrap";

const Footer = () => {
  return (
    // <footer className="py-1">
    //   <p className="text-center mt-1">
    //     © Binar Chapter 10 Challenge - 2022. All rights reserved.
    //   </p>
    // </footer>
    <div className="fixed-bottom">  
        <Navbar color="dark" dark>
            <Container className="justify-content-center" >
                <NavbarBrand><p style={{fontSize: 16}}>© Binar Chapter 10 Challenge - 2022. All rights reserved</p></NavbarBrand>
            </Container>
        </Navbar>
    </div>
  );
};

export default Footer;
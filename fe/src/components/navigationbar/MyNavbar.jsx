import React from "react";
import { Navbar, Nav, Image, Container } from 'react-bootstrap';
import styles from './navbar.module.css';
import logo from '../../../src/WheelsWander.png'
import { FaUserCog } from "react-icons/fa";

const MyNav = () => {

  return (
    <>
      <Navbar className={`${styles.bgColour}`} expand="lg">
        <Container className='d-flex justify-content-between align-items-center'> {/* Aggiunto align-items-center per centrare verticalmente i link */}
          <Navbar.Brand href="/">
            <Image className={`${styles.logo}`} src={logo} alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className='text-white align-items-center fw-bold' href="/">HOME</Nav.Link>
              <Nav.Link className='text-white align-items-center fw-bold' href="/AboutUs">CHI SIAMO</Nav.Link>
              <Nav.Link className='text-white align-items-center fw-bold' href="/Concact">CONTATTI</Nav.Link>
            </Nav>
            <div className={`${styles.login} text-center`}>
              <Nav.Link className={`${styles.userAdmin}`} href="/adminLogin">
                <FaUserCog className='text-white fs-4' />
                <p className="m-0 text-white fw-bold">Login</p>
              </Nav.Link> 
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default MyNav;

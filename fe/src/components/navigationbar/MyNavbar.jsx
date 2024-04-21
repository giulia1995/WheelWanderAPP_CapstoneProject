import Container from 'react-bootstrap/Container';
import { Navbar, Nav, Image } from 'react-bootstrap';
import React from "react";
import styles from './navbar.module.css';
import logo from '../../../src/WheelsWander.png'
const MyNav = () => {

  return (
    <>
      <Navbar className={`${styles.bgColour}`} data-bs-theme="dark">
        <Container>
          <div className='d-flex align-items-center'>
            <Navbar.Brand href="#home">
              <Image className={`${styles.logo}`} src={logo} alt="Logo" />
            </Navbar.Brand>
            <Nav.Link href="/home">Home</Nav.Link>
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default MyNav;

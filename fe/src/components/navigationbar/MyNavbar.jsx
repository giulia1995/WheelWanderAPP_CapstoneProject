import Container from 'react-bootstrap/Container';
import {Navbar, Nav} from 'react-bootstrap';
import React from "react";
import styles from './navbar.module.css';


const MyNav = () => {

  return (
    <>
      <Navbar className={`${styles.bgColour}`}data-bs-theme="dark">
        <Container>
          <div className='d-flex'>
          <Navbar.Brand  href="#home"></Navbar.Brand>
            <Nav.Link href="/home">Home</Nav.Link>
          </div>
        </Container>
      </Navbar>
      
    </>
  );
}

export default MyNav;
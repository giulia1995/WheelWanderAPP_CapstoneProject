import Container from 'react-bootstrap/Container';
import { Navbar, Nav, Image } from 'react-bootstrap';
import React from "react";
import styles from './navbar.module.css';
import logo from '../../../src/WheelsWander.png'
import { FaUserCog } from "react-icons/fa";

const MyNav = () => {

  return (
    <>
      <Navbar className={`${styles.bgColour}`}>
        <Container className='justify-content-between'>
          <div className='d-flex align-items-center'>
            <Navbar.Brand href="/">
              <Image className={`${styles.logo}`} src={logo} alt="Logo" />
            </Navbar.Brand>
            <Nav.Link className='text-white align-items-center fw-bold' href="/">Home</Nav.Link>
          </div>
          <div>
          <Nav.Link href="/adminLogin"><FaUserCog className={`${styles.userAdmin}`} /></Nav.Link>
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default MyNav;

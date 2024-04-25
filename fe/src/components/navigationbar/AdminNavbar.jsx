import { Navbar, Image, Button, Container } from 'react-bootstrap';
import React from "react";
import styles from './navbar.module.css';
import logo from '../../../src/WheelsWander.png';
import { useNavigate } from "react-router-dom";

const MyNav = () => {
  const navigate = useNavigate();

  // Funzione per il logout
  const handleLogout = () => {
    // Rimuovi la sessione dallo storage locale
    localStorage.removeItem('auth');
    // Reindirizza l'utente alla home
    navigate('/');
  };

  return (
    <>
      <Navbar className={`${styles.bgColourAdmin}`}>
        <Container className='justify-content-between'>
          <div className='d-flex align-items-center'>
            <Navbar.Brand href="">
              <Image className={`${styles.logo}`} src={logo} alt="Logo" />
            </Navbar.Brand>
          </div>
          <div>
            <Button onClick={handleLogout} className='text-white fw-bold' variant="outline-danger">Logout</Button>
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default MyNav;

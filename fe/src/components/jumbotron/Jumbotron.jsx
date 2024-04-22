import React from "react";
import { Container } from "react-bootstrap";
import styles from './jumbotron.module.css'


const MyJumbotron = () => {
  return (
   
      <Container className={`${styles.bgjumbotron}`}fluid>
        <Container>
        <h1 className={`${styles.title}`}>Il primo Noleggio Moto&Bikes a Terrasini</h1>
        <p className={`${styles.subtitle}`}>Scopri i nostri scooter e le nostre bikes, e goditi la Sicilia in totale libertà!</p>
        </Container>
      </Container>
    
  );
};

export default MyJumbotron;



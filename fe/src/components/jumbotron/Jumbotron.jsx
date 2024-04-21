import React from "react";
import { Container } from "react-bootstrap";
import styles from './jumbotron.module.css'


const MyJumbotron = () => {
  return (
   
      <Container className={`${styles.bgjumbotron}`}fluid>
        <Container>
        <h1>Ciao</h1>
        <p>Pippo</p>
        </Container>
      </Container>
    
  );
};

export default MyJumbotron;



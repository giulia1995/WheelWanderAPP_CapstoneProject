import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

const WhoWeAre = () => {
  return (
    <div className="chi-siamo-section">
      <Container>
        <Row>
          <Col md={6}>
            <h2>Chi Siamo</h2>
            <p>
              Wheel Wander è l'azienda leader nel noleggio di scooter e bike a Terrasini.
              Con anni di esperienza nel settore, ci impegniamo a fornire ai nostri clienti
              un servizio di qualità superiore e un'esperienza indimenticabile.
            </p>
            <p>
              La nostra flotta di scooter e bike è costituita da veicoli di ultima generazione,
              garantendo sicurezza, comfort e affidabilità durante il vostro viaggio. Siamo
              appassionati di viaggi e avventura, e vogliamo condividere questa passione con voi,
              aiutandovi a esplorare Terrasini e i suoi dintorni in modo divertente e sostenibile.
            </p>
          </Col>
          <Col md={6}>
            <Image src="https://hd2.tudocdn.net/956753?w=691&h=414" alt="Azienda" fluid />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default WhoWeAre;

import React from 'react';
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap';
import './Contatti.css'; // Importo il file CSS per lo stile

const CallUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Grazie per averci contattato! Ti richiameremo presto!');
  };

  return (
    <div className="contatti-page">
      <Container>
        <Row>
          <Col md={6}>
            <h2 className="contatti-heading">Contatti</h2>
            <div className="contact-details">
              <p><strong>Indirizzo:</strong> Via delle Ruote, 123, Terrasini, PA</p>
              <p><strong>Telefono:</strong> +123 456 789</p>
              <p><strong>Email:</strong> info@wheelwander.com</p>
            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formNome">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" placeholder="Inserisci il tuo nome" />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Inserisci la tua email" />
              </Form.Group>
              <Form.Group controlId="formMessaggio">
                <Form.Label>Messaggio</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Inserisci il tuo messaggio" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Invia
              </Button>
            </Form>
          </Col>
          <Col md={6}>
            <Image src="https://cdn2.hubspot.net/hubfs/1982274/Blog/Rispondere%20al%20telefono%20in%20inglese.jpg" alt="Contatti" fluid />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CallUs;

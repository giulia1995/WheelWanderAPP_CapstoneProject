import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import styles from "./WhoWeAre.module.css";

const WhoWeAre = () => {
  return (
    <div className={`${styles.page}`}>
      <Container>
        <Row>
          <Col md={6}>
            <h2 className={`${styles.title}`}>Chi Siamo</h2>
            <p>
              Wheel Wander è l'azienda leader nel noleggio di scooter e bike a
              Terrasini. Con anni di esperienza nel settore, ci impegniamo a
              fornire ai nostri clienti un servizio di qualità superiore e
              un'esperienza indimenticabile.
            </p>
            <p>
              La nostra flotta di scooter e bike è costituita da veicoli di
              ultima generazione, garantendo sicurezza, comfort e affidabilità
              durante il vostro viaggio. Siamo appassionati di viaggi e
              avventura, e vogliamo condividere questa passione con voi,
              aiutandovi a esplorare Terrasini e i suoi dintorni in modo
              divertente e sostenibile.
            </p>
            <p>
              Inoltre, ci impegniamo a promuovere uno stile di vita sostenibile,
              incoraggiando l'uso di mezzi di trasporto a basso impatto
              ambientale e adottando pratiche aziendali eco-friendly.
            </p>
          </Col>
          <Col md={6}>
            <Image
              src="https://hd2.tudocdn.net/956753?w=691&h=414"
              alt="Azienda"
              fluid
            />
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={6}>
            <Image
              src="https://www.virgilio.it/motori/wp-content/uploads/sites/4/2022/01/scooter-elettrico-senza-patente.jpg"
              alt="Azienda"
              fluid
            />
          </Col>
          <Col md={6}>
            <h2 className={`${styles.title}`}>La nostra Mission</h2>
            <p>
              Siamo qui per aprire nuove strade, per dare vita a avventure e per
              alimentare la passione per la libertà su due ruote. La nostra
              mission è quella di offrire ai nostri clienti non solo un mezzo di
              trasporto, ma un'esperienza indimenticabile, un viaggio attraverso
              paesaggi mozzafiato, culture affascinanti e momenti di pura gioia.
            </p>
            <p>
              In Wheel Wander, ci impegniamo a fornire un servizio impeccabile,
              garantendo sicurezza, affidabilità e comfort in ogni viaggio. Ci
              dedichiamo a mantenere la nostra flotta di moto e bici sempre
              all'avanguardia, garantendo prestazioni ottimali e soddisfacendo
              le esigenze di ogni cliente, dai viaggiatori avventurosi agli
              esploratori urbani.
            </p>
            <p>
              Siamo più di un semplice servizio di noleggio. Siamo i custodi
              delle vostre avventure, i facilitatori dei vostri sogni di viaggio
              e i compagni fidati lungo il percorso. La nostra missione è
              guidare ogni cliente verso nuove esperienze, verso l'ignoto e
              verso la libertà di esplorare il mondo su due ruote.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default WhoWeAre;

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import styles from "./footer.module.css";

const AdminFooter = () => {
  return (
    <footer className={styles.AdminFooter}>
      <Container>
        <Row>
          <Col md={6} lg={4}>
            <h5>Contatti</h5>
            <p>
              Indirizzo: Via delle Ruote, 123 <br />
              Città: Terrasini, PA <br />
              Telefono: +123 456 789 <br />
              Email: info@wheelwander.com
            </p>
          </Col>
          <Col md={6} lg={4}>
            <h5>Social Media</h5>
            <ul className={styles.socialIcons}>
              <li>
                <a href="https://www.facebook.com/wheelwander">
                  <FontAwesomeIcon icon={faFacebook} className={styles.icon} />
                </a>
              </li>
              <li>
                <a href="https://twitter.com/wheelwander">
                  <FontAwesomeIcon icon={faTwitter} className={styles.icon}  />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/wheelwander">
                  <FontAwesomeIcon icon={faInstagram} className={styles.icon}  />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/wheelwander">
                  <FontAwesomeIcon icon={faLinkedin} className={styles.icon}  />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <p className="text-center">
              &copy; {new Date().getFullYear()} Wheel Wander. All rights
              reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default AdminFooter;

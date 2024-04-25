import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import styles from './articles.module.css';
import AddArticleModal from '../addArticle/AddArticleModal';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editedArticle, setEditedArticle] = useState(null);
  const [articleName, setArticleName] = useState("");
  const [articleDescription, setArticleDescription] = useState("");
  const [rentTimeDay, setRentTimeDay] = useState("");
  const [priceForDay, setPriceForDay] = useState("");
  const [rentTimeWeek, setRentTimeWeek] = useState("");
  const [priceForWeek, setPriceForWeek] = useState("");
  const [caution, setCaution] = useState("");
  const [articleImage, setArticleImage] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/Articles`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        if (data.length === 0) {
          throw new Error("No articles found in the response data");
        }
        setArticles(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching data");
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/article/delete/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error("Failed to delete article");
      }
      // Rimuovi l'articolo eliminato dallo stato
      setArticles(articles.filter(article => article._id !== id));
      // Mostra un messaggio di successo
    } catch (error) {
      console.error("Error deleting article:", error);
      // Mostra un messaggio di errore
    }
  };

  const openModal = (article) => {
    setEditedArticle(article);
    setShowModal(true);
    // Popola i campi con i dati attuali dell'articolo
    setArticleName(article.articleName);
    setArticleDescription(article.articleDescription);
    setRentTimeDay(article.rentTimeDay);
    setPriceForDay(article.priceForDay.$numberDecimal);
    setRentTimeWeek(article.rentTimeWeek);
    setPriceForWeek(article.priceForWeek.$numberDecimal);
    setCaution(article.caution);
    setArticleImage(article.cover); // Aggiungi questa linea per popolare il campo dell'immagine
  };

  const closeModal = () => {
    setShowModal(false);
    setEditedArticle(null);
    // Cancella i campi
    setArticleName("");
    setArticleDescription("");
    setRentTimeDay("");
    setPriceForDay("");
    setRentTimeWeek("");
    setPriceForWeek("");
    setCaution("");
    setArticleImage("");
  };

  const handleSaveChanges = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/article/update/${editedArticle._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          articleName,
          articleDescription,
          rentTimeDay,
          priceForDay,
          rentTimeWeek,
          priceForWeek,
          caution,
          cover: articleImage // Aggiungi l'URL dell'immagine alla richiesta di aggiornamento
        })
      });
      if (!res.ok) {
        throw new Error("Failed to update article");
      }
      // Aggiorna l'articolo nello stato
      const updatedArticles = articles.map(article => {
        if (article._id === editedArticle._id) {
          return { ...article, articleName, articleDescription, rentTimeDay, priceForDay, rentTimeWeek, priceForWeek, caution, cover: articleImage };
        }
        return article;
      });
      setArticles(updatedArticles);
      // Mostra un messaggio di successo
      closeModal();
    } catch (error) {
      console.error("Error updating article:", error);
      // Mostra un messaggio di errore
    }
  };

  return (
    <Container>
      <h1 className={`${styles.titleAdmin}`}>GESTIONE ARTICOLI <AddArticleModal/> </h1>
      <Row className="justify-content-center">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          articles.map((article) => (
            <Col key={article._id} xs={12} sm={12} md={12} lg={12}>
              <Card className={`${styles.cardEffectAdmin}`}>
                <Row>
                  <Col xs={12} md={4}>
                    <div>
                      <Card.Img variant="top" src={article.cover} />
                    </div>
                  </Col>
                  <Col xs={12} md={6}>
                    <Card.Body>
                      <Card.Title className={`${styles.cardTitle}`}>{article.articleName}</Card.Title>
                      <Card.Text>{article.articleDescription}</Card.Text>
                      <Card.Text>{article.rentTimeDay} - {article.priceForDay.$numberDecimal}&euro;</Card.Text>
                      <Card.Text>{article.rentTimeWeek} - {article.priceForWeek.$numberDecimal}&euro;</Card.Text>
                      <Card.Text>{article.caution}</Card.Text>
                    </Card.Body>
                  </Col>
                  <Col xs={12} md={2} className={`${styles.button}`}>
                    <div>
                      <Button variant="primary" className="mb-2 d-block" onClick={() => openModal(article)}>Modifica</Button>
                      <Button variant="danger" className="d-block" onClick={() => handleDelete(article._id)}>Elimina</Button>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))
        )}
      </Row>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica Articolo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="articleName">
              <Form.Label>Nome Articolo</Form.Label>
              <Form.Control type="text" value={articleName} onChange={(e) => setArticleName(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="articleDescription">
              <Form.Label>Descrizione Articolo</Form.Label>
              <Form.Control as="textarea" rows={3} value={articleDescription} onChange={(e) => setArticleDescription(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="rentTimeDay">
              <Form.Label>Tempo di Noleggio Giornaliero</Form.Label>
              <Form.Control type="text" value={rentTimeDay} onChange={(e) => setRentTimeDay(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="priceForDay">
              <Form.Label>Prezzo per Giorno</Form.Label>
              <Form.Control type="text" value={priceForDay} onChange={(e) => setPriceForDay(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="rentTimeWeek">
              <Form.Label>Tempo di Noleggio Settimanale</Form.Label>
              <Form.Control type="text" value={rentTimeWeek} onChange={(e) => setRentTimeWeek(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="priceForWeek">
              <Form.Label>Prezzo per Settimana</Form.Label>
              <Form.Control type="text" value={priceForWeek} onChange={(e) => setPriceForWeek(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="caution">
              <Form.Label>Caution</Form.Label>
              <Form.Control type="text" value={caution} onChange={(e) => setCaution(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="articleImage">
              <Form.Label>URL Immagine</Form.Label>
              <Form.Control type="text" value={articleImage} onChange={(e) => setArticleImage(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Chiudi</Button>
          <Button variant="primary" onClick={handleSaveChanges}>Salva Modifiche</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Articles;

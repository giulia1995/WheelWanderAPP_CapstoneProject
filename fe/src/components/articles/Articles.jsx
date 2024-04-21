import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <Container>
      <Row className="justify-content-center">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          articles.map((article) => (
            <Col key={article._id} xs={12} sm={6} md={4} lg={3}>
              <Card className="my-3">
                <Card.Img variant="top" src={article.cover} />
                <Card.Body>
                  <Card.Title>{article.articleName}</Card.Title>
                  <Card.Text>{article.articleDescription}</Card.Text>
                  <Card.Text>{article.rentTimeDay}</Card.Text>
                  <Card.Text>{article.rentTimeWeek}</Card.Text>
                  <Card.Text>{article.priceForDay.$numberDecimal}&euro;</Card.Text>
                  <Card.Text>{article.priceForWeek.$numberDecimal}&euro;</Card.Text>
                  <Card.Text>{article.caution}</Card.Text>
               
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default Articles;

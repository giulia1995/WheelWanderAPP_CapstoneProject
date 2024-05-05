import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";

// Component for adding a new book
const AddArticleModal = () => {
  // State variables for managing form inputs, file, and alerts
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [errorAlert, setErrorAlert] = useState(false);

  // Event handler for selecting a file
  const onChangeHandleFile = (e) => {
    setFile(e.target.files[0]);
  };

  // Event handler for updating form inputs
  const onChangeHandleInput = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === "priceForDay" || name === "priceForWeek" ? parseFloat(value) : value;
    setFormData({
      ...formData,
      [name]: parsedValue,
    });
  };

  // Function to upload file to the server
  const uploadFile = async () => {
    const fileData = new FormData();
    fileData.append("uploadImg", file);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/articles/cloudUploadingImg`,
        {
          method: "POST",
          body: fileData,
        }
      );
      return await response.json();
    } catch (e) {
      console.log(e.message);
    }
  };

  // Function to submit the book form
  const submitArticle = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const uploadedFile = await uploadFile(file);
        const bodyToSend = {
          ...formData,
          cover: uploadedFile.source,
        };
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_BASE_URL}/createArticle`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyToSend),
          }
        );
        const data = await response.json();
        if (response.ok) {
          setAlertMessage("Prodotto aggiunto correttamente!");
          setShowAlert(true);
          setErrorAlert(false);
        } else {
          setAlertMessage(
            data.error ||
              "Si è verificato un errore, controlla che i campi siano tutti compilati correttamente!"
          );
          setShowAlert(true);
          setErrorAlert(true);
        }
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  // State variable for managing modal visibility
  const [show, setShow] = useState(false);

  // Event handler for closing and opening the modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // JSX for rendering the component
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Aggiungi alla Flotta
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi un nuovo mezzo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form encType="multipart/form-data" onSubmit={submitArticle}>

            <input
              className="m-2"
              onChange={onChangeHandleInput}
              name="articleName"
              type="text"
              placeholder="Inserisci Nome Articolo"
            />

            <input
              className="m-2"
              onChange={onChangeHandleInput}
              name="rentTimeDay"
              type="text"
              placeholder="Noleggio Giornaliero"
            />
             <input
              className="m-2"
              onChange={onChangeHandleInput}
              name="rentTimeWeek"
              type="text"
              placeholder="Noleggio Settimanale"
            />

            <input
              className="m-2"
              onChange={onChangeHandleFile}
              type="file"
              name="uploadImg"
            />

            <input
              className="m-2"
              onChange={onChangeHandleInput}
              type="text"
              name="priceForDay"
              placeholder="Costo Noleggio Giornaliero(cifra)"
            />
             <input
              className="m-2"
              onChange={onChangeHandleInput}
              type="text"
              name="priceForWeek"
              placeholder="Costo Noleggio Giornaliero(cifra)"
            />

            <input
              className="m-2"
              onChange={onChangeHandleInput}
              type="text"
              name="articleDescription"
              placeholder="Inserisci descrizione articolo"
            />
                 <input
              className="m-2"
              onChange={onChangeHandleInput}
              type="text"
              name="caution"
              placeholder="Inserisci cauzione articolo"
            />
            <button type="submit" className="btn btn-primary pt-2 m-2">
              Aggiungi Articolo
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Alert component for displaying success/error messages */}
      <Alert
    show={showAlert}
    variant={errorAlert ? "danger" : "success"}
    onClose={() => setShowAlert(false)}
    dismissible
    style={{
        position: "fixed",
        bottom: 30, // Aumenta leggermente la distanza dal basso
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        maxWidth: 400, // Aumenta leggermente la larghezza massima
        fontSize: "1rem", // Ripristina la dimensione del testo
        padding: "1rem", // Aumenta leggermente il padding
        display: "grid",
        gridTemplateColumns: "auto 30px", // Larghezza automatica per il testo, 30px per il pulsante
        alignContent: "center", // Centra verticalmente
        gap: "10px", // Aggiungi spazio tra il testo e il pulsante
    }}
>
    {alertMessage}
</Alert>
    </>
  );
};

export default AddArticleModal;
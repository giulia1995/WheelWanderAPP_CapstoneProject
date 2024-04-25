import React, { useState } from "react";
import AxiosClient from "../../client/client";
import { useNavigate } from "react-router-dom";
import style from '../loginForm/loginForm.module.css'


// LoginForm component for user login
const LoginForm = ({ toggleForm }) => {
  // State variables for managing form data and error
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);

  // Initializing AxiosClient and useNavigate
  const client = new AxiosClient();
  const navigate = useNavigate();

  // Function to handle form submission
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      // Sending login request
      const response = await client.post("/login", formData);
      console.log(response.token);
      if (response.token) {
        // Storing token in local storage and redirecting to home page
        localStorage.setItem("auth", JSON.stringify(response.token));
        setTimeout(() => {
          navigate("/HomeAdmin");
        }, 1500);
      }
    } catch (error) {
      console.error(
        "Si è verificato un errore durante la richiesta di login:",
        error
      );
      setError("Credenziali non valide. Riprova.");
    }
  };

  // Function to handle input change
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  // State variable and function to manage error alert visibility
  const [showError, setShowError] = useState(true);
  const handleCloseError = () => {
    setShowError(false);
  };

  // Style for positioning error alert
  const alertStyle = {
    position: "absolute",
    top: "550px",
    left: "45px",
  };

  // JSX for rendering the component
  return (
    <>
      <h2 className={`${style.textColor}`}>AdminLogin</h2>

      {error && showError && (
        <div style={alertStyle} className="alert alert-danger" role="alert">
          {error}
          <button
            type="button"
            className="btn-close"
            aria-label="Chiudi"
            onClick={handleCloseError}
          ></button>
        </div>
      )}

      <form onSubmit={onSubmit} className="card-body p-lg-5">
        <div className="text-center">
          <img
            src="https://picsum.photos/340/340"
            className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
            width="200px"
            alt="profile"
          />
        </div>

        <div className="mb-3">
          <input
            onChange={onChangeInput}
            type="email"
            className="form-control"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Inserisci la tua email..."
          />
        </div>

        <div className="mb-3">
          <input
            onChange={onChangeInput}
            type="password"
            className="form-control"
            name="password"
            placeholder="Inserisci la tua password"
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary px-5 mb-5 w-100">
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;

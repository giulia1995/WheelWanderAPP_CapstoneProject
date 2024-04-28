import React, { useState } from "react";
import AxiosClient from "../../client/client";
import { useNavigate } from "react-router-dom";
import style from '../loginForm/loginForm.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importa le icone

// LoginForm component for user login
const LoginForm = ({ toggleForm }) => {
  // State variables for managing form data, error, and password visibility
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // Nuovo stato per la visibilità della password

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

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // JSX for rendering the component
  return (
    <>
      {error && (
        <div className={`alert alert-danger ${style.errorAlert}`} role="alert">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className={`${style.card} card-body`}>
        <h2 className={`${style.textColor}`}>Admin Login</h2>
        <div className="text-center m-5 text-white">
          Sei un amministratore? <br /> <span className="fw-bold">Accedi qui per la gestione</span>
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
          <div className="input-group">
            <input
              onChange={onChangeInput}
              type={showPassword ? "text" : "password"} // Usa lo stato per determinare il tipo di input
              className="form-control"
              name="password"
              placeholder="Inserisci la tua password"
            />
            <button
              type="button"
              className={`btn btn-light ${style.passwordToggle}`}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />} {/* Mostra l'icona corrispondente */}
            </button>
          </div>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary px-5 mb-5 w-100">
            Accedi
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;

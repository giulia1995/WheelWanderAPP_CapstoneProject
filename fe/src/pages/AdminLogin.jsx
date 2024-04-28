import React from 'react'
import LoginForm from "../components/loginForm/LoginForm";
import styles from "../pages/AdminLogin.module.css";
import MyNavbar from "../components/navigationbar/MyNavbar"
import Footer from "../components/footer/Footer";


const Login = () => {
   
    return (
        <>
        <MyNavbar/>
        <div>
        <div className={`${styles.body} container-fluid`} >
            <div className="row d-flex justify-content-center">
                <div className="col-md-5 col-lg-5">
                    <div className={`${styles.card} my-5`}>
                        <LoginForm />
                    
                    </div>

                </div>
            </div>
        </div>
    </div>
    <Footer/>
    </>
    )
}

export default Login

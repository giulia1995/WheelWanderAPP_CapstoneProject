import React from 'react'
import LoginForm from "../components/loginForm/LoginForm";


const Login = () => {
   
    return (
        <div>
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-5 col-lg-5">
                    <div className="card my-5">
                        <LoginForm />
                    
                    </div>

                </div>
            </div>
        </div>
    </div>
    )
}

export default Login

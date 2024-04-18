const express = require ('express');
const login = express.Router();
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
const AdminModel = require('../models/admin');

//Endpoint for admin login
login.post('/login', async (req, res)=>{
    try{
        //Find admin by email
        const admin = await AdminModel.findOne({email: req.body.email});
        //If admin does not exist
        if(!admin){
            return res.status(404).send({
                statusCode: 404,
                message: 'This admin does not exist!'
            });
        }

        //Compare entered password with hashed password
        const isPasswordValid = await bcrypt.compare(req.body.password, admin.password);
        //If password is not valid, return 401 unauthorized error
        if(!isPasswordValid){
            return res.status(401).send({
                statusCode: 401,
                message: 'Unauthorized'
            });
        }
        //Generate JWT token with admin information and set expiration time
        const token = jwt.sign({
            firstName: admin.firstName,
            lastName: admin.lastName,
            email: admin.email,
        }, process.env.SECRET_KEY, {
            expiresIn: '24h'
        });
        //Set Authorization header with token and send success responde
        res.header('Authorization', token).status(200).send({
            message: 'Login successful',
            statusCode: 200,
            token
        });
    } catch (e) {
        //handle internal server error
        res.status(500).send({
            message: 'Internal server error',
            statusCode: 500
        });
    }
});
module.exports = login;
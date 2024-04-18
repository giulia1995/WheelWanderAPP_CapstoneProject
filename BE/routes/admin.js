const express = require('express');
const admin = express.Router();
const AdminModel = require('../models/admin');
const validateAdminBody = require ('../middlewares/validateAdminBody');
const bcrypt = require ('bcrypt');


//Endpoint for CRUD operations on Admin
admin.get('/getAdmin', async (req, res)=>{
    try {
        const admins = await AdminModel.find();
        res.status(200)
        .send(admins)
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message:'Internal error server'
        })
    }
})

//Endpoint to creat new Admin
admin.post('/createAdmin',validateAdminBody, async (req, res) =>{
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const newAdmin = new AdminModel({
        firstName : req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const adminToSave = await newAdmin.save();
        res.status(201).send({
            statusCode:201,
            payload: adminToSave
        })
    } catch(e){
        res.status(500).send({
            statusCode:500,
            message: 'Internal error server'
        })
    }
});

//Endpoint to update an existing admin by ID
admin.patch('adminUpdate/:id', async (req, res)=>{
    const {id} = req.params;
    try{
    //find admin by ID
    const admin = await AdminModel.findById(id);
    if(!admin){
        return res.status(404).send({
            statusCode:404,
            message: `Admin with id ${id} not found!`,
        });
    }
    //Update admin data with new values
    const adminToUpdate = req.body;
    const options = {new : true};
    const result = await AdminModel.findByIdAndUpdate(
        id,
        adminToUpdate,
        options
    );
    res.status(200).send(result);
    } catch(e){
      res.status(500).send({
        statusCode:500,
        message:'Internal error server'
      });
    }
});

//Endpoint to delete an admin by ID

admin.delete('/adminDelete/:id', async (req, res)=>{
    const { id } = req.params;
    try{
        //Find and delete admin by ID
    const admin = await AdminModel.findByIdAndDelete(id);
    if(!admin){
        return res.status(404).send({
            statusCode: 404,
            message: 'The requested admin not exist'
        });
    }
    res.status(200).send(`Admin with id ${id} successfully removed`);
    } catch(e){
        res.status(500).send({
            statusCode: 500,
            message:'Internal error server'
        });
    }
});
module.exports = admin;

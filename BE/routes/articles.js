const express = require('express');
const articles = express.Router();
const ArticlesModel = require('../models/articles');
const multer = require('multer');
const cloudinary = require ('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');
require ('dotenv').config ();

//Configuring cloudinary for external image storage

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Configuring multer for internal image storage
const internalStorage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, 'uploads');
  },
  filename: (req, file, cb) =>{
    const fileExtension = file.originalname.split('.').pop();
    //generating unique filename with current timestamp
    cb(null, `${file.fieldname} - ${new Date().toISOString()}.${fileExtension}`);
  },
});

//Configuring cloudinary storage for image uploads
const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params:{
    folder: 'PT043', //cloudinary folder for storing images
    public_id: (req, file)=> file.name,
  },
});

const upload= multer({storage: internalStorage}); //using interna storage for multer
const cloudUpload = multer ({storage: cloudStorage}); //using cloudinary storage for multer

//Endpoint for uploading images to cloudinary
articles.post(`/articles/cloudUploadingImg`, cloudUpload.single(`uploadImg`),
async (req, res)=>{
  try{
    res.status(200).json({source:req.file.path}); //sending cloudinary image path
  } catch(e) {
    res.status(500).send({
      statusCode: 500,
      message:'File Upload Error',
    });
  }
});

//Endpoint for uploading images to internal file system
articles.post(`/articles/uploadingImg`, upload.single('uploadImg'), async (req, res)=>{
  const url = req.protocol + '://' + req.get('host');
  try{
    const imageUrl = req.file.filename;
    res.status(200).json({ source: `${url}/uploads/${imageUrl}`});
  } catch(e){
    res.status(500).send({
      statusCode: 500,
      message: 'File Upload Error'
    });
  }
});

//Endpoint to retrive for CRUD operations on articles

articles.get('/Articles', async (req, res) => {
  try {
   
    const articles = await ArticlesModel.find()
     res.status(200).send(articles);
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

//Endpoint to create a new article
articles.post('/createArticle', async (req, res) => {
  const newArticle = new ArticlesModel({
    cover: req.body.cover,
    articleName: req.body.articleName,
    rentTimeDay: req.body.rentTimeDay,
    rentTimeWeek: req.body.rentTimeWeek,
    articleDescription: req.body.articleDescription,
    priceForDay: Number(req.body.priceForDay),
    priceForWeek: Number (req.body.priceForWeek),
    caution: req.body.caution
  })

  try {
    //Save the new article to the database
    const articleToSave = await newArticle.save();
    res.status(201).send({
      statusCode: 201,
      payload: articleToSave
    })
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: 'Internal server error'
    })
  }
});

//Endpoint to update an existing article by ID
articles.patch('/article/update/:id', async (req, res) =>{
  const { id } = req.params;
  try{
    //Find article by id
    const article = await ArticlesModel.findById(id);
    if (!article) {
      return res.status(404).send({
        statusCode:404,
        message: `Article with id ${id} not found!`,
      });
    }
    //Update article data with new values
    const articleToUpdate = req.body;
    const options = {new : true};
    const result = await ArticlesModel.findByIdAndUpdate(
      id,
      articleToUpdate,
      options
    );
    res.status(200).send(result);
  } catch(e){
    res.status(500).send({
      statusCode:500,
      message: 'Internal server error',
    });
  }
});

//Endpoint to delete an article by ID
articles.delete('/article/delete/:id', async (req, res) => {
  const { id } = req.params;
  try{
    //Find and delete article by ID
    const article = await ArticlesModel.findByIdAndDelete(id);
    if(!article) {
      return res.status(404).send({
        statusCode: 404,
        message: 'The requested article not exist',
      });
    }
    res.status(200).send(`Article with id ${id} successfully removed`);
  } catch(e) {
    res.status(500).send({
      statusCode: 500,
      message: 'Internal server error'
    });
  }
});

module.exports = articles;

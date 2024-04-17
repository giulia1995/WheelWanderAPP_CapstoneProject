const express = require('express');
const articles = express.Router();
const ArticlesModel = require('../models/articles');

//Endpoint to retrive for CRUD operations on articles

articles.get('/getArticles', async (req, res) => {
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

const express = require('express');
const articles = express.Router();
const ArticlesModel = require ('../models/articles');

//Endpoint to retrive for CRUD operations on articles


//Endpoint to retrieve paginated articles
articles.get('/getArticles', async (req, res)=>{
    const { page = 1, pageSize = 24} = req.query //Pagination parameters
    try {
        //Fetch articles based on pagination, sorted by Article Name
        const articles = await ArticlesModel.find()
        .limit (pageSize)
        .skip ((page - 1)* pageSize)
        .sort ({articleName: -1});

    //Count total articles in the database
    const totaleArticles = await ArticlesModel.countDocuments();
    
    //Send paginated articles along with pagination metadata
    res.status(200).send({
        currentPage: page,
        pageSize,
        totalePages: Math.ceil(totaleArticles / pageSize),
        articles,
    });
    } catch (e){
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error',
        });
    }
});

//Endpoint to create a new article
articles.post('/articles/create', async (req, res)=>{
    const newArticle = new ArticlesModel (req.body);
    try{
        //Save the new article to the database
        await newArticle.save();
        res.status(201).send({
            statusCode: 201,
            payload: "Article saved successfully",
        });
    } catch (e){
        res.status(500).send({
            statusCode: 500,
            message:'Internal server error',
        });
    }
});

module.exports = articles;
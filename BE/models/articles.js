const mongoose = require('mongoose');

const ArticlesSchema = new mongoose.Schema({
    articleName:{
        type: String,
        required: true,
        max: 255
    },
    rentTimeDay:{
        type: String,
        required: true,
        max: 200
    },
    rentTimeWeek:{
        type: String,
        required: true,
        max: 200
    },
    articleDescpription:{
        type: String,
        required: true,
        max: 250
    },
    priceForDay:{
        type: mongoose.Types.Decimal128,
        required: true,
        default: 0.0
    },
    priceForWeek:{
        type: mongoose.Types.Decimal128,
        required: true,
        default: 0.0
    },
    caution:{
        type: String,
        required: true
    }


}, {timestamps: true, strict: true})
module.exports = mongoose.model("articlesModel", ArticlesSchema, "articles")
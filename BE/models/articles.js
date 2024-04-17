const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    cover:{
        type: String,
        required: false,
        default: "https://picsum.photos/600/400"
    },
    articleName:{
        type: String,
        required: true   
    },
    rentTimeDay:{
        type: String,
        required: true     
    },
    rentTimeWeek:{
        type: String,
        required: true       
    },
    articleDescription:{
        type: String,
        required: true       
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


module.exports = mongoose.model('ArticlesModel', ArticleSchema, 'articles')
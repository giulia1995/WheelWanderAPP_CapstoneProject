const express = require(`express`);
const mongoose = require(`mongoose`);
require('dotenv').config();

const PORT = 4040;

const app = express();

//import routes
const articlesRoutes= require ('./routes/articles');

//middleware

app.use(express.json());
app.use('/', articlesRoutes);


//connecting database
mongoose.connect(process.env.MONGODB_URL)
const db = mongoose.connection
db.on(`error`, console.error.bind(console, "Db connection error!"))
db.once(`open`, ()=> {
    console.log(`Database successfully connected!`)
})


app.listen(PORT, ()=> console.log(`Server connected and listening on port ${PORT}`))
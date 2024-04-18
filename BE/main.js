const express = require(`express`);
const mongoose = require(`mongoose`);
const logger = require('./middlewares/logger')
const cors = require('cors');

require('dotenv').config();

const PORT = 4040;

const app = express();

//import routes
const articlesRoute= require('./routes/articles');
const adminRoute = require ('./routes/admin');
const loginRoute = require ('./routes/login');

//middleware
app.use(express.json());
app.use(cors())

app.use(logger);
app.use('/', articlesRoute);
app.use('/', adminRoute);
app.use('/', loginRoute);


//connecting database
mongoose.connect(process.env.MONGODB_URL)
const db = mongoose.connection
db.on(`error`, console.error.bind(console, "Db connection error!"))
db.once(`open`, ()=> {
    console.log(`Database successfully connected!`)
})


app.listen(PORT, ()=> console.log(`Server connected and listening on port ${PORT}`))
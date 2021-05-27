const express = require("express");
const path = require('path');
const mysql = require("mysql");
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config({path:'./.env'});
const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    databse: process.env.DATABASE,
    port: process.env.DATABASE_PORT
});

db.connect((error)=>{
    if(error) {
        console.log(error)
    }
    else{
        console.log('mysql connected......')
    }
})

const publicdirectory = path.join(__dirname, '/views');
app.use(express.static(publicdirectory));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', require('./Routes/pages'));
app.use('/auth', require('./Routes/auth'));

app.listen(5000, () =>{
    console.log("Server Started on port 5000");
})
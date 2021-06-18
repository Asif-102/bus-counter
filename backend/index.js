const express = require('express');
const cors = require('cors');
const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
require('dotenv').config();

const port = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cf04q.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


app.get('/', (req, res) => {
    res.send('welcome to node js api');
})


client.connect(err => {
    const busCollection = client.db(`${process.env.DB_NAME}`).collection("bus");
    
    console.log('db connected');


});


app.listen(port, () => console.log(`Listenting to port at ${port}`));
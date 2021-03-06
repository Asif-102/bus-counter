const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require('dotenv').config()

const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const db = process.env.DB_NAME;

const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');
const uri = `mongodb+srv://${user}:${password}@cluster0.wp8tr.mongodb.net/${db}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {

    const busesCollection = client.db(db).collection("bus");


    app.get('/', (req, res) => {
        res.send('Hello I am your new node js project');
    })

    app.post('/addBus', (req, res) => {
        const bus = req.body;
        busesCollection.insertOne(bus)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })

    app.get('/buses', (req, res) => {
        busesCollection.find()
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    app.patch('/bookedSit', (req, res) => {
        const { id, bookedSit } = req.body;
        busesCollection.updateOne({ _id: ObjectId(id) },
            {
                $set: { sits: bookedSit }
            })
            .then(result => {
                res.send(result.modifiedCount > 0);
            })
            .catch(err => console.log(err));
    })

    app.patch('/makeAllAvailable', (req, res) => {
        const bus = req.body.selectedBus;
        const id = req.body.id;
        const allSits = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true];
        
        busesCollection.updateOne({ _id: ObjectId(id) }, {
            $set: { sits: allSits }
        })
            .then(result => {
                res.send(result.modifiedCount > 0);
            })
            .catch(err => console.log(err));
    })

});



app.listen(process.env.PORT || 4000);
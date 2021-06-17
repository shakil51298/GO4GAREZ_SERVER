const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser')
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors')
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bptoi.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const app = express()
const port = 5000 || process.env.PORT;


app.use(cors())
app.use(bodyParser.json())



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const serviceCollection = client.db("go4_garez_services").collection("services");

    // add services
    app.post('/addServices', (req, res) => {
        const newServices = req.body;
        serviceCollection.insertOne({ newServices })
            .then(result => {
                res.send(result.insertedCount > 0)
                console.log(result);
            })
    })

    // get services
    app.get('/services', (req, res) => {
        const newServices = req.body;
        serviceCollection.find()
            .toArray((error, serviceDocs) => {
                res.send(serviceDocs)
            })
    })
    
    // delete services
    app.delete('/delete/service/:id', (req, res) => {
        const id = ObjectID(req.params.id)
        serviceCollection.findOneAndDelete({ _id: id })
            .then(docs => {
                // do something with docs
                res.send(docs)
            })
    })

});





app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
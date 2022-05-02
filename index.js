const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
require('dotenv').config();



const { query } = require('express');
const uri = `mongodb+srv://toysdb:${process.env.REACR_PASS}@cluster0.bjlw9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const toysCollection = client.db("toysCollection").collection("toys");

async function run() {
    try {
        await client.connect();

        app.get('/toysLimited', async (req, res) => {
            const query = {};
            const cursor = toysCollection.find(query);
            const regult = await cursor.limit(6).toArray();
            res.send(regult);
        })

        app.get('/toys', async (req, res) => {
            const query = {};
            const cursor = toysCollection.find(query);
            const regult = await cursor.toArray();
            res.send(regult);
        })

        app.post('/toys', async (req, res) => {
            const query = req.body;
            const regult = await toysCollection.insertOne(query);
            res.send(regult);
        })

        app.get('/toys/:id', async (req, res) => {
            const id = req.params.id;
            const filtter = { _id: ObjectId(id) };
            const regult = await toysCollection.findOne(filtter);
            res.send(regult);
        })

        app.delete('/toys/:id', async (req, res) => {
            const id = req.params.id;
            const filtter = { _id: ObjectId(id) };
            const regult = await toysCollection.deleteOne(filtter);
            res.send(regult);
        })

        app.put('/toys/:id', async (req, res) => {
            const id = req.params.id;
            const toy = req.body;
            const fillter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateProduct = {
                $set: {
                    quantity: toy.quantity,
                }
            };
            const regult = await toysCollection.updateOne(fillter, updateProduct, options);
            res.send(regult);
        })

    } finally { }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('server is Raddy')
})
app.listen(port, () => {
    console.log('server is Ranning');
})
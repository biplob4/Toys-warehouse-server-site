const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
require('dotenv').config();



const { MongoClient, ServerApiVersion } = require('mongodb');
const { query } = require('express');
const uri = "mongodb+srv://toysdb:AlsW4MWbX4OcIz5K@cluster0.bjlw9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const toysCollection = client.db("toysCollection").collection("toys");

async function run (){
    try{
        await client.connect();

        app.get('/toysLimited',async(req,res)=>{
            const query = {};
            const cursor = toysCollection.find(query);
            const regult = await cursor.limit(6).toArray();
            res.send(regult);
        })

    }finally{}
}
run().catch(console.dir);




app.get('/',(req,res)=>{
    res.send('server is Raddy')
})
app.listen(port,()=>{
    console.log('server is Ranning');
})
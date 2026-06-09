import express from "express"
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import bodyParser  from 'body-parser';
import cors from "cors";

dotenv.config()
console.log("mongo db uri is working perfetctly fine at " , process.env.MONGO_URI)




// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passop';

// port and app 
const app = express()
app.use(bodyParser.json())
const port = 3000
app.use(cors())

await client.connect();
const db = client.db("passop");
  

//  to get all the passwords form db 
app.get('/',  async (req, res) => {
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
  res.json(findResult)
})


// to save a password 
app.post('/',  async (req, res) => {
    const password = req.body
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    console.log("save hit")
  res.send({success : true , result : findResult})
})
// to delete a password  by id 
app.delete('/',  async (req, res) => {
    const password = req.body
    const collection = db.collection('passwords');
    console.log("Deleting:", req.body)
    const findResult = await collection.deleteOne({id:password.id});

    console.log("delete hited " , {success : true , result : findResult})

  res.send({success : true , result : findResult})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
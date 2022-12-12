const express = require('express')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
// database password = tq1PLsqIKMB2akVT



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.typlwcp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const databaseName = client.db("bornoacademiccare");
        const collectionName = databaseName.collection("authors");
        const addedStudent = databaseName.collection('add-student');
        // create a document to insert


        // author post api 

        app.post('/add-author', async (req, res) => {
            const authorData = req.body;
            const authorPostData = await collectionName.insertOne(authorData)
            res.json(authorPostData)

        })

        //get author data api
        app.get('/add-author', async (req, res) => {
            const getData = await collectionName.find().toArray()
            res.send(getData)

        })

        app.delete('/add-author/:id', async (req, res) => {
            const id = req.params.id;
            const queryDelete = { _id: ObjectId(id) };
            const deleteResult = await collectionName.deleteOne(queryDelete)
            res.json(deleteResult)
            console.log(queryDelete);
        })


        // student post api 

        app.post('/add-student', async (req, res) => {
            const studentData = req.body;
            // console.log(studentData);
            const studentPostData = await addedStudent.insertOne(studentData)
            res.json(studentPostData)

        })

        //get student data api
        app.get('/add-student', async (req, res) => {
            const getStudentData = await addedStudent.find().toArray()
            res.send(getStudentData)

        })







    } finally {
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Hello World!')
})

// author post 





app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
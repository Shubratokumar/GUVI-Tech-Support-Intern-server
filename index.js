const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;


// middlewares
app.use(cors());
app.use(express.json());

// Database Connection
const uri = `mongodb+srv://shubrato:lIBtFQYShcdgMyTS@cluster0.hlfxrnh.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
    try {
      await client.connect();
      const usersCollection = client.db("techSupport").collection("users");

        //  load user by email
        app.get('/user/:email', async(req,res)=>{
            const email = req.params.email;
            const query = {email : email};
            const result = await usersCollection.findOne(query);
            res.send(result);
        })
        //  creating new user
        app.post('/user', async(req, res)=>{
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);
        })
        //  update user profile
        app.put('/user/:email', async(req, res)=>{
            const email = req.params.email;
            const user = req.body;
            const filter = { email: email };
            const options = { upsert: true };
            const updateUser = {
                $set: user,
            };
            const result = await usersCollection.updateOne(
                filter,
                updateUser,
                options
            );
            res.send(result);
        })
    } finally {

    }
  }
  run().catch(console.dir);

// server testing
app.get("/", (req, res) => {
    res.send("GUVI-Tech-Support-Intern server is running");
  });
  
  app.listen(port, () => {
    console.log(
      `GUVI-Tech-Support-Intern-server is listening from the port no : ${port}`
    );
  });
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());

// Database Connection
const uri = `mongodb+srv://shubrato:lIBtFQYShcdgMyTS@cluster0.hlfxrnh.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// server testing
app.get("/", (req, res) => {
    res.send("GUVI-Tech-Support-Intern server is running");
  });
  
  app.listen(port, () => {
    console.log(
      `GUVI-Tech-Support-Intern-server is listening from the port no : ${port}`
    );
  });
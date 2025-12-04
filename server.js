const express = require('express');
const app = express();

const DbConnect = require('./Config/Db');
DbConnect();

require("dotenv").config();
const PORT = process.env.PORT;

require("./Models/PostModel");
require("./Models/CommentModel");
require("./Models/LikeModel");

app.use(express.json());

const blog = require("./Routes/Route");
app.use("/api/v1", blog);

app.get("/", (req, res) => {
    res.send("Blog Website is Running"); 
});

app.listen(PORT, () => {
    console.log(`Server started Successfully at ${PORT}`);
});

app.get("/", (req, res) => {
    res.send("Blog Website is Running"); 
});



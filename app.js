require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const User = require("./models/user.model");
const userRouter =require("./routes/user.route")

const app = express();
const cors =require('cors');
const bodyParser =require('body-parser')
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use('/',userRouter);

const PORT = process.env.PORT || 5000;

app.get('', (req, res) => {
    res.json("Hello Word");
});

mongoose.connect(process.env.DB_KEY)
    .then(() => {
        console.log('db connected !');
        app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to database:', error);
    });

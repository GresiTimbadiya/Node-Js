const express = require('express');

const port = 8000;

const app = express();

const db = require("./config/db");

const path = require('path');

const BookModel = require("./models/bookModel");

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use("/", express.static(path.join(__dirname, 'assets')));

app.use("/uploads", express.static(path.join(__dirname, 'uploads')));

app.use("/", require("./routes/index"));

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`Server is start on port :- ${port}`);

})
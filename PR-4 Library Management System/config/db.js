const mongoose = require('mongoose');

// mongoose.connect("mongodb://localhost:27017/Book-Catalog");
mongoose.connect("mongodb+srv://gresi:gresi121@cluster0.wuw0bk5.mongodb.net/Book-Catalog");

const db = mongoose.connection;

db.once("open", (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log("Database is connectd...");
})

module.exports = db;
const mongoose = require('mongoose');

// mongoose.connect("mongodb://localhost:27017/Admin-panel");
mongoose.connect("mongodb+srv://gresi:gresi121@cluster0.wuw0bk5.mongodb.net/AdminPanel-Matrix-passport");

const db = mongoose.connection;

db.once("open", (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log("Database connected...");

})

module.exports = db;
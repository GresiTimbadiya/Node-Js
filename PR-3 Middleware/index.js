const express = require('express');

const port = 8000;

const app = express();
const db = require('./config/db')
app.set("view engine", "ejs");

const checkAge = require('./middleware/checkAge');

const path = require('path'); 

app.use("/", express.static(path.join(__dirname, 'public')))

app.get("/", (req, res) => {
    return res.render("home");
})

app.get("/product", checkAge, (req, res) => {
    return res.render('product');
})

app.get("/about", checkAge, (req, res) => {
    return res.render('about');
})

app.get("/contact", checkAge, (req, res) => {
    return res.render('contact');
})

app.use(checkAge);

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`Server is start on port :- ${port}`);
})
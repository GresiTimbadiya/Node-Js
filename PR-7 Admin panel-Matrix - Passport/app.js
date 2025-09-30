const express = require('express');

const port = 8000;

const app = express();

const path = require('path');
const session = require("express-session");
const passport = require('passport');
const localStrategies = require("./config/localStrategies");
const cookieParser = require("cookie-parser");
const db = require("./config/db");
const flash = require("connect-flash");
const flashMSG = require("./config/flashMessage");
const blogModel = require('./models/blogModel');

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'assets')));
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser());
app.use(flash());

app.use(session({
    name: "testing",
    secret: "admin-panel",
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

app.use(passport.session()); // passport connect
app.use(passport.initialize());  // passport initialize(start)
app.use(passport.setAuthenticateUser);  // print user data in dashboard
app.use(flashMSG.flashMessage);

app.use("/", require("./routes/index"));

// website front page for user
app.get("/website", async (req, res) => {
    try {
        let showData = await blogModel.find();
        return res.render("website/websitePage", {
            showData
        });
    } catch (err) {
        console.log(err);
        return res.redirect("/website");
    }
})
app.get("/blogReadMore/:id", async (req, res) => {
    try {
        let singleBlog = await blogModel.findById(req.params.id);
        return res.render("website/readMoreBlog",{
            singleBlog
        });
    } catch (err) {
        console.log(err);
        return res.redirect("/website");
    }
})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`Server is start on port :- https://localhost:${port}`);

})
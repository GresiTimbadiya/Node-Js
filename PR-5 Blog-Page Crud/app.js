const express = require('express');

const port = 8000;

const app = express();

const db = require('./config/db');

const path = require('path');

const blogModel = require("./models/blogModel");

app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.static(path.join(__dirname, 'assets')));

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
    let fetchBlog = await blogModel.find();
    return res.render("view", {
        fetchBlogData: fetchBlog
    });
})

app.get("/addBlog", (req, res) => {
    return res.render("add");
})

app.post("/addBlogData", blogModel.uploadImage, async (req, res) => {
    if (req.file) {
        req.body.image = '/uploads/' + req.file.filename;
    }
    await blogModel.create(req.body);
    return res.redirect("/");
})

app.get("/deleteBlog/:id", async (req, res) => {
    await blogModel.findByIdAndDelete(req.params.id);
    return res.redirect("/");
})

app.get("/readBlog/:id", async (req, res) => {
    let ReadFullBlog = await blogModel.findById(req.params.id);
    return res.render("readBlog", {
        readBlog: ReadFullBlog
    })
})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`Server is start on port :- ${port}`);
})
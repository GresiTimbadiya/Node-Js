const express = require('express');
const { viewBlog, addBlog, addBlogData, deleteBlog, editBlog, updateBlogData, readBlog } = require('../controllers/blogCtr');
const adminModel = require("../models/blogModel");

const Routes = express.Router();

Routes.get("/", viewBlog);

Routes.get("/addBlog", addBlog);

Routes.post("/addBlogData", adminModel.uploadBlogImage, addBlogData);

Routes.get("/deleteBlog/:id", deleteBlog);

Routes.get("/editBlog/:id", editBlog);

Routes.post("/updateBlogData/:id", adminModel.uploadBlogImage, updateBlogData);

Routes.get("/readBlog/:id", readBlog);

module.exports = Routes;
const express = require('express');
const { addCategoryPage, addCategory, viewCategory, deleteCategory, editCategory, updateCategory } = require('../controllers/categoryCtr');
const categoryModel = require("../models/categoryModel");

const Routes = express.Router();

Routes.get("/addCategory", addCategoryPage);

Routes.post("/addCategoryData", categoryModel.uploadCategoryImage, addCategory);

Routes.get("/viewCategory", viewCategory);

Routes.get("/deleteCategory/:id", deleteCategory);

Routes.get("/editCategory/:id", editCategory);

Routes.post("/updateCategory/:id", categoryModel.uploadCategoryImage, updateCategory);

module.exports = Routes;   
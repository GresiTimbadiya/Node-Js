const express = require('express');
const { addSubCategory, addSubCategoryData, viewSubCategory, deleteSubCategory, editSubCategory, updateSubCategory } = require('../controllers/subCategoryCtr');

const Routes = express.Router();

Routes.get("/addSubCategory", addSubCategory);

Routes.post('/addSubCategoryData', addSubCategoryData);

Routes.get("/viewSubCategory", viewSubCategory);

Routes.get("/deleteSubCategory/:id", deleteSubCategory);

Routes.get("/editSubCategory/:id", editSubCategory);

Routes.post("/updateSubCategory/:id", updateSubCategory);

module.exports = Routes; 
const express = require('express');
const { addExtraCategory, addExtraCategoryData, viewExtraCategory, deleteExtraCategory, editExtraCategory, updateExtraCategory, subCategory } = require('../controllers/extraCategoryCtr');

const Routes = express.Router();

Routes.get("/addExtraCategory", addExtraCategory);

Routes.post("/addExtraCategoryData", addExtraCategoryData);

Routes.get("/viewExtraCategory", viewExtraCategory);

Routes.get("/deleteExtraCategory/:id", deleteExtraCategory);

Routes.get("/editExtraCategory/:id", editExtraCategory);

Routes.post("/updateExtraCategory/:id", updateExtraCategory);

Routes.get("/subCategory", subCategory);

module.exports = Routes;
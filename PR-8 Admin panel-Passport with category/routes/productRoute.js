const express = require("express");
const productModel = require("../models/productModel");
const { addProductPage, subCategory, extraCategory, addProductData, viewProduct, deleteProduct, editProduct, updateProduct, productDetails } = require("../controllers/productCtr");

const Routes = express.Router();

Routes.get("/addProductPage", addProductPage);

Routes.get("/subCategory", subCategory);  // dependent on category

Routes.get("/extraCategory", extraCategory); // dependent on subCategory

Routes.post("/addProductData", productModel.uploadProductImage, addProductData);

Routes.get("/viewProduct", viewProduct);

Routes.get("/deleteProduct/:id", deleteProduct);

Routes.get("/editProduct/:id", editProduct);

Routes.post("/updateProduct/:id", productModel.uploadProductImage, updateProduct);

Routes.get("/productDetails/:id", productDetails);

module.exports = Routes;
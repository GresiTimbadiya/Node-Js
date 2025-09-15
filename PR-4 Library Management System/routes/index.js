const express = require('express');

const Routes = express.Router();

const bookController = require("../controllers/bookController");

const BookModel = require("../models/bookModel");

Routes.get("/", bookController.showBooks);

Routes.get("/add", bookController.add);

Routes.post("/addBook", BookModel.imageUploads, bookController.addBook);

Routes.get("/deleteBook/:id", bookController.deleteBook);

Routes.get("/editBook/:id", bookController.editBook);

Routes.post("/updateBook/:id", BookModel.imageUploads, bookController.updateBook);

Routes.get("/readBook/:id", bookController.readBook);

module.exports = Routes;  
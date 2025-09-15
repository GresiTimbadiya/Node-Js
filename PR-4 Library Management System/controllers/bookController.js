const BookModel = require("../models/bookModel");

const path = require('path');

const fs = require('fs');

module.exports.showBooks = async (req, res) => {
    let viewBooks = await BookModel.find();
    return res.render("viewBook", {
        viewBooks
    });
}

module.exports.add = (req, res) => {
    return res.render("addBook");
}

module.exports.addBook = async (req, res) => {
    if (req.file) {
        req.body.image = '/uploads/' + req.file.filename
    }
    req.body.isbn = Math.floor(Math.random() * 10000000000000);
    await BookModel.create(req.body);
    return res.redirect("/");
}

module.exports.deleteBook = async (req, res) => {
    try {
        let singleImage = await BookModel.findById(req.params.id);
        if (singleImage.image) {
            let fullPath = path.join(__dirname, "..", singleImage.image);
            await fs.unlinkSync(fullPath);
        }
    } catch (err) {
        console.log(err);
        return false;
    }
    await BookModel.findByIdAndDelete(req.params.id);
    return res.redirect("/");
}

module.exports.editBook = async (req, res) => {
    let singleBookRecord = await BookModel.findById(req.params.id);
    return res.render("editBook", {
        singleRecord: singleBookRecord
    })
}

module.exports.updateBook = async (req, res) => {
    if (req.file) {
        let singleImage = await BookModel.findById(req.params.id);
        if (singleImage.image) {
            let fullPath = path.join(__dirname, "..", singleImage.image);
            await fs.unlinkSync(fullPath);
        }
        req.body.image = '/uploads/' + req.file.filename;
    }
    req.body.isbn = Math.floor(Math.random() * 10000000000000);
    await BookModel.findByIdAndUpdate(req.params.id, req.body);
    return res.redirect("/");
}

module.exports.readBook = async (req, res) => {
    let readSingleBook = await BookModel.findById(req.params.id);
    return res.render("readbook", {
        readBook: readSingleBook
    })
}
const mongoose = require('mongoose');

const uploadImg = '/uploads';

const multer = require('multer');

const path = require('path');

const BookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    genre: {
        type: Array,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    isbn: {
        type: String, 
        required: true
    }
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', uploadImg));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now());
    }
})

BookSchema.statics.imageUploads = multer({ storage: storage }).single('image');

const BookModel = mongoose.model("BookData", BookSchema);

module.exports = BookModel;
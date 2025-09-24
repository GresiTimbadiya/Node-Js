const mongoose = require('mongoose');

const uploads = '/uploads';

const multer = require('multer');

const path = require('path');

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: Array,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..' + uploads));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now());
    }
})

blogSchema.statics.uploadImage = multer({ storage: storage }).single('image');

const blogModel = mongoose.model("Blog", blogSchema);

module.exports = blogModel;
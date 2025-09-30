const mongoose = require("mongoose");

const uploadImage = "/uploads/blogImage/";
const path = require('path');
const multer = require('multer');

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
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    updated_date: {
        type: String,
        required: true
    }
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", uploadImage));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now());
    }
})

blogSchema.statics.uploadBlogImage = multer({ storage: storage }).single("image");
blogSchema.statics.blogPath = uploadImage;

const blogModel = mongoose.model("blog", blogSchema);

module.exports = blogModel; 
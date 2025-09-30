const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const categoryImage = "/uploads/categoryImage";

const categorySchema = mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
    categoryImage: {
        type: String,
        required: true
    }
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", categoryImage));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now()); 
    }
})

categorySchema.statics.uploadCategoryImage = multer({ storage: storage }).single("categoryImage");
categorySchema.statics.categoryPath = categoryImage;

const categoryModel = mongoose.model("category", categorySchema);

module.exports = categoryModel;
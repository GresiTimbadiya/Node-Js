const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const productImage = '/uploads/productImage';

const productSchema = mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subCategory"
    },
    extraCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "extraCategory"
    },
    price: {
        type: Number
    },
    discount: {
        type: Number
    },
    quantity: {
        type: Number
    },
    image: {
        type: String
    }
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", productImage));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now());
    }
})

productSchema.statics.uploadProductImage = multer({ storage: storage }).single('image');
productSchema.statics.productPath = productImage;

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
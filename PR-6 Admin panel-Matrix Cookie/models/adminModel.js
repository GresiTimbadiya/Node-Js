const mongoose = require('mongoose');

const adminPath = "/uploads/adminImage/"
const path = require('path');
const multer = require('multer');

const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    qualification: {
        type: Array,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    created_date: {
        type: String,
        required: true
    },
    updated_date: {
        type: String,
        required: true
    }
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", adminPath));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now());
    }
})

adminSchema.statics.uploadAdminProfile = multer({ storage: storage }).single('profile');
adminSchema.statics.AdminPath = adminPath;

const adminModel = mongoose.model('admin', adminSchema);

module.exports = adminModel;     
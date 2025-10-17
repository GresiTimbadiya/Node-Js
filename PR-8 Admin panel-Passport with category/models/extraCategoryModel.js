const mongoose = require("mongoose");

const extraCatSchema = mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subCategory"
    },
    extraCategoryName: {
        type: String,
        required: true
    }
})

const extraCategoryModel = mongoose.model("extraCategory", extraCatSchema);

module.exports = extraCategoryModel;
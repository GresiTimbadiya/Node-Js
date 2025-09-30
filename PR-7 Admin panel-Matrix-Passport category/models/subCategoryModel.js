const mongoose = require("mongoose");

const subCategorySchema = mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    subCategoryName: {
        type: String,
        required: true
    }
})

const subCategoryModel = mongoose.model("subCategory", subCategorySchema);

module.exports = subCategoryModel;
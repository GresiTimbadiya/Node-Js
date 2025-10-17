const categoryModel = require("../models/categoryModel");
const extraCategoryModel = require("../models/extraCategoryModel");
const subCategoryModel = require("../models/subCategoryModel");

module.exports.addSubCategory = async (req, res) => {
    try {
        let categories = await categoryModel.find();
        return res.render("subCategory/addSubCategory", {
            categories
        });
    } catch (err) {
        console.log(err);
        return res.redirect("/admin");
    }
}

module.exports.addSubCategoryData = async (req, res) => {
    try {
        let subCategory = await subCategoryModel.create(req.body);
        if (subCategory) {
            req.flash("success", "Sub Category Added...");
            return res.redirect("/subcategory/viewSubCategory");
        } else {
            req.flash("error", "SubCategory not Added...");
            return res.redirect("/subcategory/addSubCategory");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("/subcategory/addSubCategory");
    }
}

module.exports.viewSubCategory = async (req, res) => {
    try {
        let search = "";
        if (req.query.search) {
            search = req.query.search;
        }
        let subCategories = await subCategoryModel.find({
            $or: [
                { subCategoryName: { $regex: search, $options: "i" } }
            ]
        }).populate('category');
        return res.render("subCategory/viewSubCategory", {
            subCategories
        });
    } catch (err) {
        console.log(err);
        return res.redirect("/subCategory/viewSubCategory");
    }
}

module.exports.deleteSubCategory = async (req, res) => {
    try {
        let deleteSubCat = await subCategoryModel.findByIdAndDelete(req.params.id);
        await extraCategoryModel.deleteMany({ subCategory: req.params.id }); // subCategory related extraCategory delete
        if (deleteSubCat) {
            req.flash("success", "Sub Category Deleted...");
            return res.redirect("/subCategory/viewSubCategory");
        } else {
            req.flash("error", "Sub Category Not Deleted...");
            return res.redirect("/subCategory/viewSubCategory");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("/subCategory/viewSubCategory");
    }
}

module.exports.editSubCategory = async (req, res) => {
    try {
        let categories = await categoryModel.find();
        let singleSubCat = await subCategoryModel.findById(req.params.id);
        return res.render("subCategory/editSubCategory", {
            singleSubCat, categories
        });
    } catch (error) {
        console.log(error);
        return res.redirect("/subCategory/viewSubCategory");
    }
}

module.exports.updateSubCategory = async (req, res) => {
    try {
        let updateSubCat = await subCategoryModel.findByIdAndUpdate(req.params.id, req.body);
        if (updateSubCat) {
            req.flash("success", "Sub Category Updated...");
            return res.redirect("/subCategory/viewSubCategory");
        }
        else {
            req.flash("error", "Sub Category Not Updated...");
            return res.redirect("/subCategory/viewSubCategory");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("/subCategory/viewSubCategory");
    }
} 
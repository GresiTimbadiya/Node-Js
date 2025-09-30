const categoryModel = require("../models/categoryModel");
const subCategoryModel = require("../models/subCategoryModel");
const extraCategoryModel = require("../models/extraCategoryModel");

module.exports.addExtraCategory = async (req, res) => {
    try {
        let categories = await categoryModel.find();
        let subCategories = await subCategoryModel.find();
        return res.render("extraCategory/addExtraCategory", {
            categories, subCategories
        });
    } catch (error) {
        console.log(err);
        return res.redirect("/admin");
    }
}

module.exports.addExtraCategoryData = async (req, res) => {
    try {
        let extraCategory = await extraCategoryModel.create(req.body);
        if (extraCategory) {
            req.flash("success", "Extra Category Added");
            return res.redirect("/extraCategory/viewExtraCategory");
        } else {
            req.flash("error", "Extra Category Not Added");
            return res.redirect("/extraCategory/addExtraCategory");
        }
    } catch (error) {
        console.log(error);
        return res.redirect("/extraCategory/addExtraCategory");
    }
}

module.exports.viewExtraCategory = async (req, res) => {
    try {
        let extraCategories = await extraCategoryModel.find().populate("category").populate("subCategory");
        return res.render("extraCategory/viewExtraCategory", {
            extraCategories
        })
    } catch (error) {
        console.log(error);
        return res.redirect("/admin");
    }
}

module.exports.deleteExtraCategory = async (req, res) => {
    try {
        let deleteExtraCat = await extraCategoryModel.findByIdAndDelete(req.params.id);
        if (deleteExtraCat) {
            req.flash("success", "Extra Category Deleted");
            return res.redirect("/extraCategory/viewExtraCategory");
        } else {
            req.flash("error", "Extra Category Not Deleted");
            return res.redirect("/extraCategory/viewExtraCategory");
        }
    } catch (error) {
        console.log(error);
        return res.redirect("/extraCategory/viewExtraCategory");
    }
}

module.exports.editExtraCategory = async (req, res) => {
    try {
        const single = await extraCategoryModel.findById(req.params.id).populate("category").populate("subCategory");
        return res.render("extraCategory/editExtraCategory", {
            single
        });
    } catch (error) {
        console.log(error);
        return res.redirect("/extraCategory/viewExtraCategory");
    }
}

module.exports.updateExtraCategory = async (req, res) => {
    try {
        let updateExtracat = await extraCategoryModel.findByIdAndUpdate(req.params.id, req.body);
        if (updateExtracat) {
            req.flash("success", "Extra Category Updated");
            return res.redirect("/extraCategory/viewExtraCategory");
        }
        else {
            req.flash("error", "Extra Category Not Updated");
            return res.redirect("/extraCategory/viewExtraCategory");
        }
    } catch (error) {
        console.log(error);
        return res.redirect("/extraCategory/viewExtraCategory");
    }
}

module.exports.subCategory = async (req, res) => {
    try {
        let categoryId = req.query.categoryId;
        let singleCat = await subCategoryModel.find({ category: categoryId });
        return res.json({ singleCat, message: "Sub Category Fatched..." });
    } catch (error) {
        console.log(error);
        return res.json({ message: "server error" });
    }
}
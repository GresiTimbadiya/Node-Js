const categoryModel = require("../models/categoryModel");
const path = require('path');
const fs = require('fs');
const subCategoryModel = require("../models/subCategoryModel");

module.exports.addCategoryPage = (req, res) => {
    try {
        return res.render("category/addCategory");
    } catch (err) {
        console.log(err);
        return res.redirect("/category/addCategory");
    }
}

module.exports.addCategory = async (req, res) => {
    try {
        if (req.file) {
            req.body.categoryImage = categoryModel.categoryPath + "/" + req.file.filename;
        } else {
            req.flash("error", "Image Not Added");
            return res.redirect("/category/addCategory");
        }
        let category = await categoryModel.create(req.body);
        if (category) {
            req.flash("success", "Category Added Successfully...");
            return res.redirect("/category/viewCategory");
        }
        else {
            req.flash("error", "Category Not Added");
            return res.redirect("/category/addCategory");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("/category/addCategory");
    }
}

module.exports.viewCategory = async (req, res) => {
    try {
        let search = "";
        if (req.query.search) {
            search = req.query.search;
        }
        let categories = await categoryModel.find({
            $or: [
                { categoryName: { $regex: search, $options: "i" } }
            ]
        });
        return res.render("category/viewCategory", {
            categories
        });
    } catch (err) {
        console.log(err);
        return res.redirect("/category/viewCategory");
    }
}

module.exports.deleteCategory = async (req, res) => {
    try {
        let singleCat = await categoryModel.findById(req.params.id);
        if (singleCat.categoryImage) {
            let fullPath = path.join(__dirname, "..", singleCat.categoryImage);
            try {
                fs.unlinkSync(fullPath);
            } catch (err) {
                console.log("Image Not Found");
            }
        } else {
            req.flash("error", "Image Not Found");
            return res.redirect("/category/viewCategory");
        }
        let deleteCategory = await categoryModel.findByIdAndDelete(req.params.id);
        await subCategoryModel.deleteMany({ category: req.params.id }); //category related subCategory delete
        if (deleteCategory) {
            req.flash("success", "Category Deleted Successfully...");
            return res.redirect("/category/viewCategory");
        } else {
            req.flash("error", "Category Not Deleted");
            return res.redirect("/category/viewCategory");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("/category/viewCategory");
    }
}

module.exports.editCategory = async (req, res) => {
    try {
        let singleCategory = await categoryModel.findById(req.params.id);
        return res.render("category/editCategory", {
            singleCategory
        })
    } catch (err) {
        console.log(err);
        return res.redirect("/category/viewCategory");
    }
}

module.exports.updateCategory = async (req, res) => {
    try {
        let singleCat = await categoryModel.findById(req.params.id);
        if (singleCat) {
            if (req.file) {
                if (singleCat.categoryImage) {
                    let fullPath = path.join(__dirname, "..", singleCat.categoryImage);
                    try {
                        fs.unlinkSync(fullPath);
                    } catch (error) {
                        console.log(error);
                    }
                }
                req.body.categoryImage = categoryModel.categoryPath + "/" + req.file.filename;
            }
            let upCategory = await categoryModel.findByIdAndUpdate(req.params.id, req.body);
            if (upCategory) {
                req.flash("success", "Category Updated Successfully...");
                return res.redirect("/category/viewCategory");
            } else {
                req.flash("error", "Category Not Updated");
                return res.redirect("/category/viewCategory");
            }
        } else {
            req.flash("error", "Category Not Found");
            return res.redirect("/category/viewCategory");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("/category/viewCategory");
    }
}
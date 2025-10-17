const categoryModel = require("../models/categoryModel");
const subCategoryModel = require("../models/subCategoryModel");
const extraCategoryModel = require("../models/extraCategoryModel");
const productModel = require("../models/productModel");
const path = require('path');
const fs = require('fs');

module.exports.addProductPage = async (req, res) => {
    try {
        let categories = await categoryModel.find();
        let subCategories = await subCategoryModel.find();
        let extraCategories = await extraCategoryModel.find();
        return res.render("product/addProduct", {
            categories, subCategories, extraCategories
        });
    } catch (error) {
        console.log(err);
        return res.redirect("/admin");
    }
}

module.exports.subCategory = async (req, res) => {
    try {
        let categoryId = req.query.categoryId;
        let subCategory = await subCategoryModel.find({ category: categoryId });
        return res.json({ subCategory, message: "Sub Category Fatched..." });
    } catch (error) {
        console.log(error);
        return res.redirect("/product/addProductPage");
    }
}

module.exports.extraCategory = async (req, res) => {
    try {
        let subCategoryId = req.query.subCategoryId;
        let extraCategory = await extraCategoryModel.find({ subCategory: subCategoryId });
        return res.json({ extraCategory, message: "Extra Category Fatched..." });
    } catch (error) {
        console.log(error);
        return res.redirect("/product/addProductPage");
    }
}

module.exports.addProductData = async (req, res) => {
    try {
        if (req.file) {
            req.body.image = productModel.productPath + '/' + req.file.filename;
        } else {
            req.flash("error", "Image Not Added");
            return res.redirect("/product/addProductPage");
        }
        let addProduct = await productModel.create(req.body);
        if (addProduct) {
            req.flash("success", "Product Added Successfully...");
            return res.redirect("/product/viewProduct");
        } else {
            req.flash("error", "Product Not Added");
            return res.redirect("/product/addProductPage");
        }
    } catch (error) {
        console.log(error);
        return res.redirect("/product/addProductPage");
    }
}

module.exports.viewProduct = async (req, res) => {
    try {
        let viewProduct = await productModel.find();
        return res.render("product/viewProduct", {
            viewProduct
        });
    } catch (error) {
        console.log(error);
        return res.redirect("/admin");
    }
}

module.exports.deleteProduct = async (req, res) => {
    try {
        let product = await productModel.findById(req.params.id);
        if (product.image) {
            let fullPath = path.join(__dirname, "..", product.image);
            try {
                fs.unlinkSync(fullPath);
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("Image Not Found");
            return res.redirect("/product/viewProduct");
        }
        let deleteProduct = await productModel.findByIdAndDelete(req.params.id);
        if (deleteProduct) {
            req.flash("success", "Product Deleted Successfully...");
            return res.redirect("/product/viewProduct");
        } else {
            req.flash("error", "Product Not Deleted");
            return res.redirect("/product/viewProduct");
        }
    } catch (error) {
        console.log(error);
        return res.redirect("/product/viewProduct");
    }
}

module.exports.editProduct = async (req, res) => {
    try {
        let singleProduct = await productModel.findById(req.params.id).populate("category").populate("subCategory").populate("extraCategory");
        return res.render("product/editProduct", {
            singleProduct
        });
    } catch (error) {
        console.log(error);
        return res.redirect("/product/viewProduct");
    }
}

module.exports.updateProduct = async (req, res) => {
    try {
        let singleProduct = await productModel.findById(req.params.id);
        if (singleProduct) {
            if (req.file) {
                if (singleProduct.image) {
                    let fullPath = path.join(__dirname, "..", singleProduct.image);
                    try {
                        fs.unlinkSync(fullPath);
                    } catch (error) {
                        console.log(error);
                    }
                }
                req.body.image = productModel.productPath + "/" + req.file.filename;
            } 
            let updateProduct = await productModel.findByIdAndUpdate(req.params.id, req.body);
            if (updateProduct) {
                req.flash("success", "Product Updated Successfully...");
                return res.redirect("/product/viewProduct");
            } else {
                req.flash("error", "Product Not Updated");
                return res.redirect("/product/viewProduct");
            }
        } else {
            req.flash("error", "Product Not Found");
            return res.redirect("/product/viewProduct");
        }
    } catch (error) {
        console.log(error);
        return res.redirect("/product/viewProduct");
    }
}

module.exports.productDetails = async (req, res) => {
    try {
        let singleProduct = await productModel.findById(req.params.id).populate("category").populate("subCategory").populate("extraCategory");
        return res.render("product/productDetails", {
            singleProduct
        });
    } catch (error) {
        console.log(error);
        return res.redirect("/product/viewProduct");
    }
}
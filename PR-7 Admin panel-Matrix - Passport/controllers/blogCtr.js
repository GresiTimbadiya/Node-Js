const blogModel = require("../models/blogModel");
const adminModel = require("../models/blogModel");
const moment = require("moment");
const path = require("path");
const fs = require("fs");

module.exports.viewBlog = async (req, res) => {
    try {
        let adminData = req.cookies.admin;
        let viewBlog = await adminModel.find();
        return res.render("blog/viewBlog", {
            adminData, viewBlog
        });
    } catch (err) {
        console.log(err);
        return res.redirect("/admin/blog");
    }
}

module.exports.addBlog = (req, res) => {
    try {
        let adminData = req.cookies.admin;
        return res.render("blog/addBlog", {
            adminData
        });
    } catch (err) {
        console.log(err);
        return res.redirect("/admin/blog/addBlog");
    }
}

module.exports.addBlogData = async (req, res) => {
    try {
        if (req.file) {
            req.body.image = adminModel.blogPath + req.file.filename;
        }
        req.body.updated_date = moment().format('DD-MM-YYYY, h:mm:ss a');
        let blogData = await adminModel.create(req.body);
        if (blogData) {
            req.flash("success", "Blog Added Successfully...");
            return res.redirect("/admin/blog");
        } else {
            console.log("Blog Not Added");
            return res.redirect("/admin/blog/addBlog");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("/admin/blog/addBlog");
    }
}

module.exports.deleteBlog = async (req, res) => {
    try {
        try {
            let singleBlog = await blogModel.findById(req.params.id);
            if (singleBlog.image) {
                let fullpath = path.join(__dirname, "..", singleBlog.image);
                fs.unlinkSync(fullpath);
            } else {
                console.log("Image is not found...");
                return res.redirect("/admin/blog");
            }
        } catch (err) {
            console.log(err);
            return res.redirect("/admin/blog");
        }

        let deleteBlog = await blogModel.findByIdAndDelete(req.params.id);
        if (deleteBlog) {
            req.flash("success", "Blog Deleted Successfully...");
            return res.redirect("/admin/blog");
        } else {
            console.log("Blog Not Deleted Successfully...");
            return res.redirect("/admin/blog");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("/admin/blog");
    }
}

module.exports.editBlog = async (req, res) => {
    try {
        let adminData = req.cookies.admin;
        let singleBlog = await blogModel.findById(req.params.id);
        return res.render("blog/editBlog", {
            singleBlog, adminData
        })
    } catch (err) {
        console.log(err);
        return res.redirect("/admin/blog");
    }
}

module.exports.updateBlogData = async (req, res) => {
    try {
        let singleBlog = await blogModel.findById(req.params.id);
        if (singleBlog) {
            if (req.file) {
                try {
                    let singleBlog = await blogModel.findById(req.params.id);
                    if (singleBlog.image) {
                        let fullPath = path.join(__dirname, "..", singleBlog.image);
                        fs.unlinkSync(fullPath);
                    } else {
                        console.log("Image Not Found");
                        return res.redirect("/admin/blog");
                    }
                    req.body.image = adminModel.blogPath + req.file.filename;
                } catch (err) {
                    console.log(err);
                    return res.redirect("/admin/blog");
                }
            }

            req.body.updated_date = moment().format('DD-MM-YYYY, h:mm:ss a');
            let updateBlog = await blogModel.findByIdAndUpdate(req.params.id, req.body);
            if (updateBlog) {
                req.flash("success", "Blog Updated Successfully...");
                return res.redirect("/admin/blog");
            } else {
                console.log("Blog Not Updated");
                return res.redirect("/admin/blog");
            }
        } else {
            console.log("Blog Not Found");
            return res.redirect("/admin/blog");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("/admin/blog");
    }
}

module.exports.readBlog = async (req, res) => {
    try {
        let readBlog = await blogModel.findById(req.params.id);
        return res.render("blog/readBlog", {
            readBlog
        });
    } catch (err) {
        console.log(err);
        return res.redirect("/admin/blog/addBlog");
    }
}
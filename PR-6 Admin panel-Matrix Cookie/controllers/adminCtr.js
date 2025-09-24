const adminModel = require("../models/adminModel");
const bcrypt = require('bcrypt');
const moment = require('moment');
const path = require('path');
const fs = require('fs');

module.exports.adminRoute = async (req, res) => {
    try {
        if (req.cookies.admin_matrix && req.cookies.admin_matrix._id) {
            let adminData = req.cookies.admin_matrix;
            return res.render("dashboard", {
                adminData
            });
        }
        else {
            return res.redirect("/");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("/admin");
    }
}

module.exports.addAdmin = async (req, res) => {
    try {
        if (req.cookies.admin_matrix && req.cookies.admin_matrix._id) {
            let adminData = req.cookies.admin_matrix;
            return res.render("addAdmin", {
                adminData
            });
        }
        else {
            return res.redirect("/");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("/admin");
    }
}

module.exports.viewAdmin = async (req, res) => {
    try {
        let adminData = req.cookies.admin_matrix;
        let search = "";
        if (req.query.search) {
            search = req.query.search;
        }
        let showAdmin = await adminModel.find({
            $or: [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { city: { $regex: search, $options: "i" } },
                { gender: { $regex: search, $options: "i" } }
            ]
        });
        if (req.cookies.admin_matrix && req.cookies.admin_matrix._id) {
            return res.render("viewAdmin", {
                showAdmin, adminData
            });
        }
        else {
            return res.redirect("/");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("/admin");
    }
}

module.exports.addAdminData = async (req, res) => {
    try {
        if (req.file) {
            req.body.profile = adminModel.AdminPath + req.file.filename;
        }
        req.body.name = req.body.fname + " " + req.body.lname;
        req.body.password = await bcrypt.hash(req.body.password, 10);
        req.body.created_date = moment().format('DD-MM-YYYY, h:mm:ss a');
        req.body.updated_date = moment().format('DD-MM-YYYY, h:mm:ss a');
        const adminData = await adminModel.create(req.body);
        if (adminData) {
            console.log("Admin Added Successfully");
            return res.redirect("/admin/viewAdmin");
        }
        else {
            console.log("Admin Not Added");
            return res.redirect("/admin/viewAdmin");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("/admin");
    }
}

module.exports.deleteAdmin = async (req, res) => {
    try {
        try {
            let singleImage = await adminModel.findById(req.params.id);
            if (singleImage.profile) {
                let fullPath = path.join(__dirname, "..", singleImage.profile);
                fs.unlinkSync(fullPath);
            }
            else {
                console.log("Image Not Found");
                return res.redirect("/admin/viewAdmin");
            }
        } catch (err) {
            console.log(err);
            return res.redirect("/admin/viewAdmin");
        }

        let deleteAdmin = await adminModel.findByIdAndDelete(req.params.id);
        if (deleteAdmin) {
            console.log("Admin Deleted Successfully");
            return res.redirect("/admin/viewAdmin");
        }
        else {
            console.log("Admin Not Deleted");
            return res.redirect("/admin/viewAdmin");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("/admin");
    }
}

module.exports.editAdmin = async (req, res) => {
    try {
        let adminData = req.cookies.admin_matrix;
        let singleAdmin = await adminModel.findById(req.params.id);
        return res.render("editAdmin", {
            singleAdmin, adminData
        })
    } catch (err) {
        console.log(err);
        return res.redirect("/admin");

    }
}

module.exports.updateAdminData = async (req, res) => {
    try {
        let adminData = await adminModel.findById(req.params.id);
        if (adminData) {
            if (req.file) {
                try {
                    let singleImage = await adminModel.findById(req.params.id);
                    if (singleImage.profile) {
                        let fullPath = path.join(__dirname, "..", singleImage.profile);
                        await fs.unlinkSync(fullPath);
                    }
                    else {
                        console.log("Image Not Found");
                        return res.redirect("/admin/viewAdmin");
                    }
                    req.body.profile = adminModel.AdminPath + req.file.filename;
                }
                catch (err) {
                    console.log(err);
                    return res.redirect("/admin/viewAdmin");
                }
            }
            req.body.name = req.body.fname + " " + req.body.lname;
            req.body.updated_date = moment().format('DD-MM-YYYY, h:mm:ss a');
            let updateAdmin = await adminModel.findByIdAndUpdate(req.params.id, req.body);
            if (updateAdmin) {
                console.log("Admin Updated Successfully");
                return res.redirect("/admin/viewAdmin");
            }
            else {
                console.log("Something Went Wrong");
                return res.redirect("/admin/viewAdmin");
            }
        }
        else {
            console.log("Admin Not Found..");
            return res.redirect("/admin/viewAdmin");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("/admin");
    }
}

module.exports.showAdminDetails = async (req, res) => {
    try {
        let singleAdmin = await adminModel.findById(req.params.id);
        if (singleAdmin) {
            return res.status(200).json({ status: "success", data: singleAdmin });
        }
        else {
            console.log("Admin Not Found");
            return res.redirect("/admin/viewAdmin");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("/admin");
    }
}
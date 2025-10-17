const { sendEmail } = require("../config/mailMessage");
const adminModel = require("../models/adminModel");
const bcrypt = require("bcrypt");

module.exports.loginPage = (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            return res.render("auth/loginPage");
        }
        else {
            return res.redirect("/admin");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("/");
    }
}

module.exports.loginAdmin = async (req, res) => {
    try {
        req.flash("success", "Admin login successfully...");
        return res.redirect("/admin");
    } catch (err) {
        console.log(err);
        return res.redirect("/");
    }
}

module.exports.logoutAdmin = (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            }
            else {
                return res.redirect("/");
            }
        })
    } catch (err) {
        console.log(err);
        return res.redirect("/");
    }
}

module.exports.forgotPassword = (req, res) => {
    try { 
        return res.render("auth/forgotPassword");
    } catch (err) {
        console.log(err);
        return res.redirect("/");
    }
}

module.exports.sendEmailWithOtp = async (req, res) => {
    try {
        let otp = Math.floor(Math.random() * 10000);
        let admin = await adminModel.findOne({ email: req.body.email });
        if (!admin) {
            return res.redirect("/");
        }
        const mailMessage = {
            from: "gresitimbadiya@gmail.com",
            to: "timbadiyaprafull@gmail.com",
            subject: "Hello ✔",
            html: `<b>Hello Admin</b>
                    <p>Your OTP is :- ${otp}. Please do not share with anyone.</p>
                    <p> OTP will expire in 5 minutes</p>
            `
        }
        sendEmail(mailMessage); // connect to mailmessage.js - call sendEmail function
        res.cookie("otp", otp);
        res.cookie("email", req.body.email);
        return res.render("auth/verifyOtp");
    } catch (err) {
        console.log(err);
        return res.redirect("/");
    }
}

module.exports.verifyOtpPage = (req, res) => {
    try {
        return res.render("auth/verifyOtp");
    } catch (err) {
        console.log(err);
        return res.redirect("/");
    }
}

module.exports.verifyOtp = (req, res) => {
    try {
        let verifyOtp = req.cookies.otp;
        if (verifyOtp == req.body.otp) {
            res.clearCookie("otp");
            return res.render("auth/resetPassword");
        }
        else {
            return res.redirect("/verifyOtp");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("/");
    }
}

module.exports.resetPasswordPage = (req, res) => {
    try {
        return res.render("auth/resetPassword");
    } catch (err) {
        console.log(err);
        return res.redirect("/");
    }
}

module.exports.resetPassword = async (req, res) => {
    try {
        let email = req.cookies.email;
        let admin = await adminModel.findOne({ email: email });
        if (!admin) {
            return res.redirect("/");
        }
        if (req.body.password == req.body.cpassword) {
            let hashPass = await bcrypt.hash(req.body.password, 10);
            await adminModel.findByIdAndUpdate(admin._id, { password: hashPass });
            res.clearCookie("email");
            return res.redirect("/");
        } else {
            return res.redirect("/resetPassword");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("/");
    }
}

module.exports.changePasswordPage = (req, res) => {
    try {
        let adminData = req.user;
        return res.render("auth/changePassword", {
            adminData
        });
    } catch (err) {
        console.log(err);
        return res.redirect("/");
    }
}

module.exports.changePassword = async (req, res) => {
    try { 
        let adminData = req.user;
        const { oldPassword, newPassword, confirmPass } = req.body;
        let matchPassword = await bcrypt.compare(oldPassword, adminData.password);
        if (matchPassword) {
            if (newPassword == confirmPass) {
                let hashPass = await bcrypt.hash(newPassword, 10);
                await adminModel.findByIdAndUpdate(adminData._id, { password: hashPass });
                return res.redirect("/admin");
            } else {   
                console.log("NewPassword and ConfirmPassword is not matched...");
                return res.redirect("/changePassword");
            }
        } else {
            console.log("OldPassword is not matched...");
            return res.redirect("/changePassword");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("/");
    }
}

module.exports.viewAdminProfile = (req, res) => {
    try {
        return res.render("auth/viewAdminProfile");
    } catch (err) {
        console.log(err);
        return res.redirect("/");
    }
}
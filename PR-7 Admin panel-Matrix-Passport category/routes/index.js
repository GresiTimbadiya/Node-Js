const express = require('express');
const { loginPage, loginAdmin, forgotPassword, logoutAdmin, sendEmailWithOtp, verifyOtp, verifyOtpPage, resetPassword, resetPasswordPage, changePasswordPage, changePassword, viewAdminProfile } = require('../controllers/authController');
const passport = require("../config/localStrategies");

const Routes = express.Router();

Routes.get("/", loginPage);

Routes.post("/loginAdmin", passport.authenticate('local', { failureRedirect: "/" }), loginAdmin);

Routes.get("/logoutAdmin", logoutAdmin);

Routes.get("/forgotPassword", forgotPassword);

Routes.post("/sendEmailWithOtp", sendEmailWithOtp);

Routes.post("/verifyOtp", verifyOtp);

Routes.get("/verifyOtp", verifyOtpPage);

Routes.post("/resetPassword", resetPassword);

Routes.get("/resetPassword", resetPasswordPage);

Routes.get("/changePassword", changePasswordPage);

Routes.post("/change_password", changePassword);

Routes.get("/viewAdminProfile", viewAdminProfile);

Routes.use("/admin", passport.checkAdminAuth, require("../routes/adminRoute"));

Routes.use("/category", passport.checkAdminAuth, require("../routes/categoryRoute"));

Routes.use("/subCategory", passport.checkAdminAuth, require("../routes/subCategoryRoute"));

Routes.use("/extraCategory", passport.checkAdminAuth, require("../routes/extraCategoryRoute"));

module.exports = Routes;
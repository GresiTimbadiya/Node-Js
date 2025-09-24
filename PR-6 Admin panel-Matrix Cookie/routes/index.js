const express = require('express');
const { loginPage, loginAdmin, forgotPassword, logoutAdmin, sendEmailWithOtp, verifyOtp, verifyOtpPage, resetPassword, resetPasswordPage, changePasswordPage, changePassword, viewAdminProfile } = require('../controllers/authController');

const Routes = express.Router();

Routes.get("/", loginPage);

Routes.post("/loginAdmin", loginAdmin);

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

Routes.use("/admin", require("../routes/adminRoute"));

module.exports = Routes;
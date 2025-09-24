const express = require('express');

const Routes = express.Router();

const AdminCtr = require("../controllers/adminCtr");

const adminModel = require("../models/adminModel");

Routes.get("/", AdminCtr.adminRoute);

Routes.get("/addAdmin", AdminCtr.addAdmin);

Routes.get("/viewAdmin", AdminCtr.viewAdmin);

Routes.post("/addAdminData", adminModel.uploadAdminProfile, AdminCtr.addAdminData);

Routes.get("/deleteAdmin/:id", AdminCtr.deleteAdmin);

Routes.get("/editAdmin/:id", AdminCtr.editAdmin);

Routes.post("/updateAdminData/:id", adminModel.uploadAdminProfile, AdminCtr.updateAdminData);

Routes.post("/showAdminDetails/:id", AdminCtr.showAdminDetails);

Routes.use("/blog", require("../routes/blogRoute"));

module.exports = Routes;  
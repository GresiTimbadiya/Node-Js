const passport = require('passport');
const localStrategies = require('passport-local').Strategy;
const adminModel = require("../models/adminModel");
const bcrypt = require('bcrypt');

passport.use(new localStrategies({
    usernameField: "email"   // convert username to email
}, async (email, password, cb) => {  // user ka email aur password deta hai jab login request aati hai
    let adminRecord = await adminModel.findOne({ email: email });
    if (adminRecord) {
        let matchPassword = await bcrypt.compare(password, adminRecord.password);
        if (matchPassword) {
            cb(null, adminRecord); // cb batata he authentication success hua ya fail.
        } else {
            cb(null, false)
        }
    } else {
        cb(null, false);
    }
}))

passport.serializeUser((user, cb) => { // ID session me save hoga
    cb(null, user.id);
})

passport.deserializeUser(async (id, cb) => { // session se user ki id nikalti hai
    let admin = await adminModel.findById(id); // id ke base par DB se user find karta hai
    if (admin) {
        cb(null, admin); // agar user mil gaya to req.user me set kar deta hai
    }
    else{
        cb(null, false);
    }
})

passport.checkAdminAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.redirect("/");
    }
}

passport.setAuthenticateUser = (req, res, next) => {
    if (req.user) {
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;
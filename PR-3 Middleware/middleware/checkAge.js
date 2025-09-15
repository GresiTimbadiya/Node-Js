const checkAge = (req, res, next) => {
    let age = req.query.age;
    if (age >= 18) {
        return next();
    }
    return res.redirect("/");
}

module.exports = checkAge;
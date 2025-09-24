const express = require('express');

const port = 8000;
const app = express();
app.set("view engine", "ejs");
const path = require('path');
const cookieParser = require("cookie-parser");
const db = require("./config/db");
// const flash = require("connect-flash");
// const flashMSG = require("./config/flashMessage");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'assets')));
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser());
app.use("/", require("./routes/index"));
// app.use(flash());
// app.use(flashMSG.flashMessage);

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`Server is start on port :- https://localhost:${port}`);

})
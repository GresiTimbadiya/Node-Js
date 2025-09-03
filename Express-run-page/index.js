const express = require('express');

const port = 8000;

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    return res.render('index')
})

app.get('/about', (req, res) => {
    return res.render('about')
})

app.get('/product', (req, res) => {
    return res.render('product')
})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`Server is start on port :- ${port}`);
})   
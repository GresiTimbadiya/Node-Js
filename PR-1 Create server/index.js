const http = require('http');

const port = 8000;

const fs = require('fs');

const requestHandler = (req, res) => {

    let fileName = "";
    switch (req.url) {
        case '/':
            fileName = './home.html'
            break;

        case '/about':
            fileName = './about.html';
            break;

        case '/product':
            fileName = './product.html';
            break;

        case '/blog':
            fileName = './blog.html';
            break;

        case '/shop':
            fileName = './shop.html';
            break;

        case '/service':
            fileName = './services.html';
            break;

        case '/contact':
            fileName = './contact.html';
            break;

        default:
            fileName = './404.html'
            break;
    }

    fs.readFile(fileName, (err, data) => {
        if (err) {
            console.log(err);
            return false;
        }
        res.end(data);
    })
}

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`Server is start on port :- ${port}`);
})
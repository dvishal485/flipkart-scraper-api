import * as index from './src/index.js';
import search from './API/search.js';
import express from 'express'
import product from './API/product.js';

const app = express();

app.get('/', function(req, res) {
    res.json(index.default.metadata(req.headers.host));
});

app.get('/search/:product', function(req, res) {
    search(req.params.product, 'flipkart.com').then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })
});

app.get('/product/compact/*', function(req, res) {
    product(req.params[0], 'compact').then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

app.get('/product/min/*', function(req, res) {
    product(req.params[0], 'minimum').then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

app.get('/product/*', function(req, res) {
    product(req.params[0], 'general').then((data) => {
        res.json(data)
    }).catch((err) => {
        res.json(err);
    });
});

app.all('*', function(req, res) {
    res.json(index.default.metadata(req.headers.host));
});

app.listen(3000).on('listening', () => {
    console.log('Server started at port 3000');
});


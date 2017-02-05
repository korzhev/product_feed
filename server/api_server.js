'use strict';

const express = require('express');
const FP = require('./feed_parser');

const feedsList = require('./feeds_list.json');
// create Parsers
const fpList = feedsList.map(feed => new FP(feed));

const app = express();

/**
 * Custom Http error
 */
class HttpErr extends Error {
    constructor(status = 400, msg = 'Bad request!') {
        super();
        this.status = status;
        this.message = msg;
    }
}

/**
 * Custom error handler
 * @param err
 * @param req
 * @param res
 * @param next
 */
function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
    res.status(err.status || 500);
    console.error(err);
    res.json({ status: err.status || 500, message: err.message });
}

/**
 * run server after parsing
 * @param {*} storage - storage with feeds data
 */
function runExpress(storage) {
    // use cached feed
    // let storage = storage | require('./cached_feed.json');

    // middleware for saving storage
    app.use((req, res, next) => {
        res.storage = storage; // eslint-disable-line no-param-reassign
        next();
    });

    // main handler
    app.get('/', (req, res, next) => {
        const shop = req.query.shop;
        const id = req.query.product_id;
        if (shop) {
            const products = res.storage[shop];
            if (!products) return next(new HttpErr(404, 'Not found!'));
            if (id) {
                const product = products[id];
                if (product) return res.json(product);
                return next(new HttpErr(404, 'Not found!'));
            }
            return res.json(Object.keys(products));
        }
        return next(new HttpErr());
    });

    // custom error middleware
    app.use(errorHandler);

    app.listen(3000, () => {
        console.info('Server listening on port 3000!');
    });
}

// parse all feeds
Promise.all(fpList.map(fp => fp.parse()))
    .then((result) => {
        // concat data from all feeds in one storage
        const storage = Object.assign({}, ...result);
        // run server
        runExpress(storage);
    })
    .catch(console.error);

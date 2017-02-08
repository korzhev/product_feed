'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const FP = require('./feed_parser');

// const feedsList = require('./feeds_list.json');
// // create Parsers
// const fpList = feedsList.map(feed => new FP(feed));

const app = express();

app.use(bodyParser.json());

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
    // console.error(err);
    res.json({ status: err.status || 500, message: err.message });
}

/**
 * run server after parsing
 * @param {*} storage - storage with feeds data
 */
function runExpress(store) {
    // use cached feed
    // let storage = store || require('./cached_feed.json'); // eslint-disable-line global-require
    const storage = store;

    // main handler
    app.get('/', (req, res, next) => {
        const shop = req.query.shop;
        const id = req.query.product_id;
        if (shop) {
            const products = storage[shop];
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

    // get from client feed params
    app.post('/', (req, res, next) => { // eslint-disable-line consistent-return
        const name = req.body.name;
        const url = req.body.url;
        const delimiter = req.body.url;
        if (!(name && url && delimiter)) return next(new HttpErr(400, 'All params are required!'));
        if (storage[name]) return next(new HttpErr(400, 'Storage with this name is already existed!'));
        // if params OK, starting to parse
        const feedParser = new FP({ name, url, delimiter });
        feedParser.parse()
            .then((result) => {
                // merge parsed data to global store
                Object.assign(storage, ...result);
                return Object.keys(result[name]);
            })
            .then(idList => res.json(idList))
            .catch(next);
    });

    // custom error middleware
    app.use(errorHandler);

    app.listen(3000, () => {
        console.info('Server listening on port 3000!');
    });
}

// // parse all feeds
// Promise.all(fpList.map(fp => fp.parse()))
//     .then((result) => {
//         // concat data from all feeds in one storage
//         const storage = Object.assign({}, ...result);
//         // run server
//         runExpress(storage);
//     })
//     .catch(console.error);

runExpress({});

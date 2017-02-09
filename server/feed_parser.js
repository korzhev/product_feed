const csv = require('fast-csv');
const request = require('request');
/**
 * Class for parsing csv feed
 * @type {FeedParser}
 */
module.exports = class FeedParser {
    /**
     * @param {name: string, url: string, delimiter: string} feed
     */
    constructor(feed) {
        this.name = feed.name;
        this.url = feed.url;
        this.delimiter = feed.delimiter;
        this.storage = {};
    }

    /**
     * Create stream & parse data from input stream
     * @param {function} res - resolving Promise
     * @param {function} rej - rejecting Promise
     * @returns {stream}
     * @private
     */
    _createCsvStream(res, rej) {
        console.info(`Feed "${this.name}" parsing started!`);
        return csv
            .parse({ delimiter: this.delimiter, headers: true, quote: null })
            .on('error', (e) => {
                console.error(`Error in feed "${this.name}"`, e.message);
                rej(e);
            })
            // save in storage only needed data
            .on('data', (data) => {
                if (data.PZN && data.Preis) {
                    const tmp = {};
                    tmp[data.PZN] = data.Preis;
                    this.storage[data.PZN] = tmp;
                }
            })
            .on('end', () => {
                console.info(`Feed "${this.name}" parsing is done!`);
                if (!Object.keys(this.storage).length) return rej(new Error('Result is empty, check delimiter'))
                const result = {};
                // prepare result for easy
                result[this.name] = this.storage;
                res(result);
            });
    }

    /**
     * Wrap streams into Promise
     * @returns {Promise}
     * @private
     */
    _promisifyParser() {
        return new Promise((res, rej) => {
            // GET request stream
            request
                .get(this.url)
                .on('error', rej)
                .pipe(this._createCsvStream(res, rej));
        });
    }

    /**
     * run parsing and return data
     * @returns {Promise}
     */
    parse() {
        return this._promisifyParser();
            // .catch((e) => {
            //     console.error(e);
            //     const res = {};
            //     res[this.name] = {};
            //     return res;
            // });
    }
};

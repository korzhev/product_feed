/* global alert */
import { SUCCESS, FAIL, LOAD_PRICE, LOAD_PRODUCTS } from '../constants';

const defaultProducts = {shop: null, idList: []};

export default (products = defaultProducts, action) => {
    const { type, payload } = action;

    switch (type) {
    case LOAD_PRODUCTS + SUCCESS:
        return payload;

    case LOAD_PRODUCTS + FAIL:
        alert(JSON.stringify(payload, null, 2));
        return {shop: null, idList: []};
    case LOAD_PRICE + SUCCESS:
        alert(JSON.stringify(payload, null, 2));
        return products;

    case LOAD_PRICE + FAIL:
        alert(JSON.stringify(payload, null, 2));
        return products;
    }

    return products;
};

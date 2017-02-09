/* global fetch, alert */
import { SUCCESS, FAIL, ADD_FEED, LOAD_PRODUCTS } from '../constants';

export function addFeed(feed) {
    return (dispatch) => {
        alert('Please wait until result');
        fetch('/api', {
            redirect: 'error',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(feed),
        }).then((response) => {
            return Promise.all([
                response.json(),
                response.ok,
            ]);
        }).then((result) => {
            if (!result[1]) {
                return dispatch({
                    type: ADD_FEED + FAIL,
                    payload: result[0],
                });
            }
            dispatch({
                type: LOAD_PRODUCTS + SUCCESS,
                payload: { shop: feed.name, idList: result[0] },
            });
            return dispatch({
                type: ADD_FEED + SUCCESS,
                payload: feed,
            });
        }).catch((e) => {
            return dispatch({
                type: ADD_FEED + FAIL,
                payload: { status: 500, message: e.message },
            });
        });
    };
}

export function loadProducts(shop) {
    return (dispatch) => {
        alert('Please wait until result');
        fetch(`/api?shop=${shop}`, {
            method: 'GET',
        }).then((response) => {
            return Promise.all([
                response.json(),
                response.ok,
            ]);
        }).then((result) => {
            if (!result[1]) {
                return dispatch({
                    type: LOAD_PRODUCTS + FAIL,
                    payload: result[0],
                });
            }
            return dispatch({
                type: LOAD_PRODUCTS + SUCCESS,
                payload: { shop, idList: result[0] },
            });

        }).catch((e) => {
            return dispatch({
                type: LOAD_PRODUCTS + FAIL,
                payload: { status: 500, message: e.message },
            });
        });
    };
}

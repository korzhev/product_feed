/* global fetch, alert */
import { SUCCESS, FAIL, LOAD_PRICE } from '../constants';

export function loadPrice(shop, id) {
    return (dispatch) => {
        fetch(`/api?shop=${shop}&product_id=${id}`, {
            method: 'GET',
        }).then((response) => {
            return Promise.all([
                response.json(),
                response.ok,
            ]);
        }).then((result) => {
            if (!result[1]) {
                return dispatch({
                    type: LOAD_PRICE + FAIL,
                    payload: result[0],
                });
            }
            return dispatch({
                type: LOAD_PRICE + SUCCESS,
                payload: result[0],
            });
        }).catch((e) => {
            return dispatch({
                type: LOAD_PRICE + FAIL,
                payload: { status: 500, message: e.message },
            });
        });
    };
}

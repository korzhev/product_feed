import { combineReducers } from 'redux';
import feeds from './feeds';
import shops from './shops';
import products from './products';

export default combineReducers({
    feeds,
    shops,
    products,
});

import { combineReducers } from 'redux';
import feeds from './feeds';
import products from './products';

export default combineReducers({
    feeds,
    products,
});

/* global window */
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = applyMiddleware(thunk);
const store = createStore(reducer, {}, composeEnhancers(enhancer));

window.store = store;

export default store;

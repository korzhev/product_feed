import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';

render(
    <Provider store={{}}>
        <App />
    </Provider>,
    document.getElementById('root'), // eslint-disable-line no-undef
);

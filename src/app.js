import './styles.scss';
import React from 'react';
import ReactDom from 'react-dom'
import configureStore from './store.js';
import AppRouter from './components/AppRouter.jsx';

const preloadedState = window.__PRELOADED_STATE__
delete window.__PRELOADED_STATE__

const store = configureStore(preloadedState);

ReactDom.hydrate(<AppRouter store={store} />, document.getElementById('root'));


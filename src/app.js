import './styles.scss';
import configureStore from './store.js';
import AppRouter from './components/AppRouter.jsx';

const preloadedState = window.__PRELOADED_STATE__
delete window.__PRELOADED_STATE__

const store = configureStore(preloadedState);

console.log('hydrate');
ReactDOM.hydrate(<AppRouter store={store} />, document.getElementById('root'));


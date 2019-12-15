import './styles.scss';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store.js';
import Home from './components/Home.jsx';

const store = configureStore();

class Wrapper extends React.Component{
	render() {
		return (
		  <div>
		    <Provider store={store}>
		      <BrowserRouter>
		        <Route path="/" component={Home} /> 
		      </BrowserRouter>
		    </Provider>
		  </div>
		);
	}
}

render(<Wrapper />, document.getElementById('root'));

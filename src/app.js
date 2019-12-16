import './styles.scss';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store.js';
import Home from './components/Home.jsx';
import SampleHome from './components/design/SampleHome.jsx';

const store = configureStore();

class Wrapper extends React.Component{
	render() {
		return (
		  <div>
		    <Provider store={store}>
		      <BrowserRouter>
		      	<Switch>
			        <Route exact path="/" component={Home} /> 
			        <Route path='/design' component={SampleHome} />
			    </Switch>
		      </BrowserRouter>
		    </Provider>
		  </div>
		);
	}
}

render(<Wrapper />, document.getElementById('root'));

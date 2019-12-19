import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, StaticRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Home from './Home.jsx';
import SampleHome from './design/SampleHome.jsx';

export default class AppRouter extends React.Component {
	constructor(props) {
	    super(props);
	    this.store = props.store;
	}

	render() {
		var Router = typeof document !== 'undefined' ? BrowserRouter : StaticRouter;
		return (
		    <Provider store={this.store}>
		      <Router>
		      	<Switch>
			        <Route exact path="/" component={Home} /> 
			        <Route path='/design' component={SampleHome} />
			    </Switch>
		      </Router>
		    </Provider>
		);
	}
}
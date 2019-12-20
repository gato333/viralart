import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, StaticRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setArtists } from '../actions/artists';
import { setArtworks } from '../actions/artworks';
import Home from './Home.jsx';
import SampleHome from './design/SampleHome.jsx';

export default class AppRouter extends React.Component {
	constructor(props) {
	    super(props);
	    this.store = props.store;
	    console.log('app router constructor')
	    // circular ref of data
	    if( typeof document !== 'undefined' ){
	    	var state = props.store.getState();
	    	var linkedArtists = state.artists;
			var linkedArtworks = state.artworks;

			state.aaRelationships.forEach( aa => {
				if( !linkedArtists[aa.artistid].hasOwnProperty('artworks') )
					 linkedArtists[aa.artistid].artworks = {};
				linkedArtists[aa.artistid].artworks[aa.artworkid] = linkedArtworks[aa.artworkid];
			
				if( !linkedArtworks[aa.artworkid].hasOwnProperty('artists') )
					 linkedArtworks[aa.artworkid].artists = {};
				linkedArtworks[aa.artworkid].artists[aa.artistid] = linkedArtists[aa.artistid];
			});
			props.store.dispatch(setArtworks(linkedArtworks));
	      	props.store.dispatch(setArtists(linkedArtists));
	    }
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
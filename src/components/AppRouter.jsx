import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, StaticRouter, Route, Switch  } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setArtists } from '../actions/artists';
import { setArtworks } from '../actions/artworks';
import Home from './Home.jsx';
import SampleHome from './design/SampleHome.jsx';

const Routes = () => (
	<Switch>
  		<Route path="/design" component={SampleHome} />
  		<Route path="/step" component={Home} /> 
  		<Route path="*" component={Home} />
    </Switch>
);

export default class AppRouter extends React.Component {
	constructor(props) {
	    super(props);
	    this.serverSideRendering = ( typeof document === 'undefined' );
	    // circular ref of data
	    if( !this.serverSideRendering ){
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
		return (
		    <Provider store={this.props.store}>
		    	{ !this.serverSideRendering ? 
		    		<BrowserRouter>
				      	<Routes />
				     </BrowserRouter>
				:
					<StaticRouter location={this.props.url} context={{}}>
				      	<Routes />
				    </StaticRouter>
		    	}
		    </Provider>
		);
	}
}

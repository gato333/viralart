import React from 'react';
import { connect } from 'react-redux';
import WorldExplorer from './WorldExplorer.jsx';
import DetailViewer from './DetailViewer.jsx';
import Navigation from './Navigation.jsx';

export default class SampleHome extends React.Component { 
	render(){
		return(
			<div className="sampleHome">
				<WorldExplorer />
				<DetailViewer />
				<Navigation />
		 	</div>
		);
	}
}


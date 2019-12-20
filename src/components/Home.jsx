import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from "react-router-dom";
import Navigation from './design/Navigation.jsx';
import DetailViewer from './DetailViewer.jsx';

class Home extends React.Component { 
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div>
				<Navigation />
				<DetailViewer />

		 	</div>
		);
	}
}

function mapStateToProps(state) {
  return {
    artworks: state.artworks
  }
}

export default connect(mapStateToProps)(Home);
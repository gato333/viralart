import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DetailViewer from './DetailViewer.jsx';

class Home extends React.Component { 
	render(){
		return (
			<div>
				<DetailViewer />
		 	</div>
		);
	}
}


function mapStateToProps(state) {
  return {
    //artworks: state.artworks
  }
}

export default connect(mapStateToProps)(Home);
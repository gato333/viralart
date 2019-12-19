import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function Artwork(props) {
  return (
    <li>{props.title}</li>
  );
}

class ArtworksTest extends React.Component { 
	render(){
		var artworks = Object.keys(this.props.artworks)
			.map( id => <Artwork title={this.props.artworks[id].title} /> );
		return (
			<div>
				<ul>
					{artworks}
				</ul>
		 	</div>
		);
	}
}


function mapStateToProps(state) {
  return {
    artworks: state.artworks
  }
}

export default connect(mapStateToProps)(ArtworksTest);
import React from 'react';
import { connect } from 'react-redux';

function Artwork(props) {
  return (
    <li>{props.title}</li>
  );
}

class ListArtworksTest extends React.Component { 
	render(){
		var artworks = Object.keys(this.props.artworks)
			.map( id => <Artwork title={this.props.artworks[id].title} /> );
		return (
			<div className="detailViewer">
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

export default connect(mapStateToProps)(ListArtworksTest);
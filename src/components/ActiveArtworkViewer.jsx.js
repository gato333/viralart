import React from 'react';
import { connect } from 'react-redux';

class ActiveArtworkViewer extends React.Component { 
	render(){
		if(!this.props.activeArtwork)
			return (
				<div className="detailViewer">
					activeArtwork not set
				</div>
			);
		var {activeArtwork} = this.props
		return (
			<div className="detailViewer" >
				<img src={activeArtwork.imageurl} />
				<p>{activeArtwork.title}</p>
				<p>{activeArtwork.artistname}</p>
				<p>{activeArtwork.medium}</p>
				<p style={{ background: activeArtwork.color }} >Color: {activeArtwork.color}</p>
		 	</div>
		);
	}
}

function mapStateToProps(state) {
  return {
    activeArtwork: state.activeArtwork ? state.artworks[state.activeArtwork] : null 
  }
}

export default connect(mapStateToProps)(ActiveArtworkViewer);
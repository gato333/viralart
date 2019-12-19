import React, { Component } from 'react'
import { connect } from 'react-redux';
import ArtworksTest from './ArtworksTest.jsx';

class DetailViewer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="detailViewer">
      		<ArtworksTest />
      </div>
    )
  }
}

export default connect()(DetailViewer);
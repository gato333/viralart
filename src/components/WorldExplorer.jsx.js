import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import { bindActionCreators } from 'redux';

class WorldExplorer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
  	console.log('WorldExplorer')
    return (
      <div className="worldExplorer">
      	<div className="world" />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    focusPoint: state.focusPoint
  }
}

export default connect(mapStateToProps)(WorldExplorer);
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import { bindActionCreators } from 'redux';

class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="navigation">
      		Navigation
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    focusPoint: state.focusPoint
  }
}

export default connect(mapStateToProps)(Navigation);
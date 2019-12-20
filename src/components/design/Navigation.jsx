import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { bindActionCreators } from 'redux';

class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="navigation">
          <Link to="/">Home</Link>
          <br />
          <Link to="/design">Design</Link>
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
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="navigation">
          <Link to="/">Newest</Link>
          <br />
          <Link to="/step/3">Step 3</Link>
          <br />
          <Link to="/step/2">Step 2</Link>
          <br />
          <Link to="/step/1">Step 1</Link>
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
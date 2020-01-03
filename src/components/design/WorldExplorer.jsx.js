import React, { Component } from 'react'
import { Link, withRouter } from 'react-router';

export default class WorldExplorer extends Component {
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
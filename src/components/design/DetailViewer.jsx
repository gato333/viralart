import React, { Component } from 'react'
import { Link, withRouter } from 'react-router';

export default class DetailViewer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('DetailViewer')
    return (
      <div className="detailViewer">
      		<img className='main' src="http://files.artsy.net/images/earlystudiesofnature.png" />
          <p> Work Title </p>
          <p className="small"> Artist Name </p>
          <p className="small"> medium </p>
          Explore other Work
          <div className="otherWork">
            <img src="http://files.artsy.net/images/earlystudiesofnature.png" />
            <img src="http://files.artsy.net/images/earlystudiesofnature.png" />
            <img src="http://files.artsy.net/images/earlystudiesofnature.png" />
            <img src="http://files.artsy.net/images/earlystudiesofnature.png" />
          </div>
      </div>
    )
  }
}
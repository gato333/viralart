import React from 'react';
import * as THREE from 'three';
import { connect } from 'react-redux';

class GeometryTest extends React.Component { 
	constructor(props){
		super(props);
		if( typeof window !== 'undefined' ){
			var scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

			var renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.getElementById('geometry-test').appendChild( renderer.domElement );
		}
	}

	render(){
		return (
			<div id="geometry-test" />
		);
	}
}

function mapStateToProps(state) {
  return {
    artworks: state.artworks
  }
}

export default connect(mapStateToProps)(GeometryTest);
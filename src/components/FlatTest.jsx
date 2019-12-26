import React from 'react';
import {
	Scene,
	PerspectiveCamera,
	WebGLRenderer,
	PointLight,
	SphereGeometry, 
	MeshNormalMaterial,
	SpriteMaterial,
	Sprite,
	Mesh,
	BoxGeometry,
	MeshBasicMaterial,
	ImageUtils } from 'three';
import { connect } from 'react-redux';
var scene, camera, renderer, light, sphere, x, y;

class FlatTest extends React.Component { 
	constructor(props){
		super(props);
		this.state = {
			initialized: false,
			watchCursor: true,
			x: 0,
			y: 0
		}
	}

	render(){

		return (
			<div className="flatTest">
				I AM FLAT TEST
			</div>
		);
	}
}

function mapStateToProps(state){
	return { artworks: state.artworks }
}

export default connect(mapStateToProps)(FlatTest);
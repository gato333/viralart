import React from 'react';
import {
	Scene,
	PerspectiveCamera,
	WebGLRenderer,
	PointLight, 
	Mesh,
	BoxGeometry,
	MeshBasicMaterial,
	MeshPhysicalMaterial,
	SphereGeometry } from 'three';
import { connect } from 'react-redux';
import ListArtworksTest from './ListArtworksTest.jsx';

const colorList = [ 0xff0000, 0xff7c00, 0xffff00, 0x7cff00, 0x00ff00, 0x00ff7c, 0x00ffff, 0x007cff, 0x0000ff, 0x7c00ff, 0xff00ff, 0xff007c ];
var scene, camera, renderer, light, boxes = [], spheres = [];

class FlatTest extends React.Component { 
	constructor(props){
		super(props);
	}

	componentDidMount(){
		scene = new Scene();
		camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
		renderer = new WebGLRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );
		this.mount.appendChild( renderer.domElement );

		// Light
		light = new PointLight( 0xffffff);
		light.position.set( -2, 10, 20 );
		light.castShadow = true;
		scene.add( light );
		//Color Spectrum
		for( var i = 0; i < colorList.length; i++){
			var boxGeo = new BoxGeometry( 15, 100, 0 );	
			var boxMaterial =  new MeshBasicMaterial( { color: colorList[i] } );
			var box = new Mesh( boxGeo, boxMaterial );
			box.position.set( -85 + (15 * i) , 0, -120);
			boxes.push(box);
			scene.add( box );
		}

		var artworkMini = Object.keys(this.props.artworks).slice(0, 10);

		for( var i = 0; i< artworkMini.length; i++ ){
			var color = this.props.artworks[artworkMini[i]].color.replace(/^#/, '');
			var r = parseInt(color.slice(0, 2), 16),
				g = parseInt(color.slice(2, 4), 16),
				b = parseInt(color.slice(4, 6), 16);
			var geometry = new SphereGeometry( 5, 32, 16 );
			//geometry.computeFlatVertexNormals();
			var material =   new MeshPhysicalMaterial( {
				color: parseInt(color, 16),
				roughness: 0.7,
				transparency: 0.15,
				transparent: true
			});

			new MeshBasicMaterial( { color: parseInt(color, 16) } );
			var sphere = new Mesh( geometry, material );
			sphere.castShadow = true;
			sphere.receiveShadow = true;
			var max = Math.max(r, g, b);
			// blue default
			var xVal = xVal = ((r/255) * 60 ) + 120 - 85;
			if(max == r) xVal = (g/255) * 60 - 85;
			else if(max == g) xVal = ((b/255) * 60) + 60 - 85;
			var yVal = -50; 
			var collisions = spheres.filter( x => x.position.x >= xVal - 10 && x.position.x <= xVal + 10 );
			if( collisions.length > 0 ) yVal = Math.max( ...collisions.map( x => x.position.y )) + 10;
			sphere.position.set(xVal, yVal, -120)
			spheres.push(sphere);
			scene.add( sphere );
		}

		renderer.render( scene, camera );
	}

	onClick(){
		console.log(boxes);
		renderer.render( scene, camera );
	}


	componentWillUnmount() {
		this.mount.removeChild(this.mount.children[0]);
  	}

	render(){

		return (
			<div>
				<ListArtworksTest /> 
				<div className="flatTest">
					<div
					onClick={this.onClick.bind(this)}
					ref={ref => (this.mount = ref)} />
				</div>
			</div>
		);
	}
}

function mapStateToProps(state){
	return { artworks: state.artworks }
}

export default connect(mapStateToProps)(FlatTest);
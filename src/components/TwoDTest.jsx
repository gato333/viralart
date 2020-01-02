import React from 'react';
import {
	Scene,
	PerspectiveCamera,
	WebGLRenderer,
	PointLight, 
	FlatShading,
	Mesh,
	BoxGeometry,
	MeshBasicMaterial,
	MeshPhysicalMaterial,
	SphereGeometry, 
	PlaneGeometry,
	DoubleSide,
	Vector3,
	Texture } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { connect } from 'react-redux';

const colorList = [ 0xff0000, 0xff7c00, 0xffff00, 0x7cff00, 0x00ff00, 0x00ff7c, 0x00ffff, 0x007cff, 0x0000ff, 0x7c00ff, 0xff00ff, 0xff007c ];
var scene, camera, renderer, light, controls, boxes = [], spheres = [];

class TwoDTest extends React.Component { 
	constructor(props){
		super(props);
		this.generateTexture = this.generateTexture.bind(this);
		this.animate = this.animate.bind(this);
	}

	componentDidMount(){
		scene = new Scene();
		camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
		renderer = new WebGLRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );
		this.mount.appendChild( renderer.domElement );
		controls = new OrbitControls( camera, renderer.domElement );
		controls.update();

		// Light
		light = new PointLight( 0xffffff);
		light.position.set( -2, 10, 20 );
		light.castShadow = true;
		scene.add( light );
		// floor
		var floorGeo = new PlaneGeometry(300, 1000);
		var floorMaterial = new MeshPhysicalMaterial({ color: 0xffffff, flatShading: true });
		var floor = new Mesh( floorGeo, floorMaterial );
		floor.receiveShadow = true; 
		floor.castShadow = true;
		floor.position.set(0,-50,-200);
		floor.rotation.set(-3* Math.PI / 7, 0,0);
		scene.add(floor);
		
		//Color Spectrum
		for( var i = 0; i < colorList.length; i++){
			var boxGeo = new BoxGeometry( 15, 100, 0 );	

			// material texture
			var texture = new Texture( this.generateTexture(colorList[i]) );
			texture.needsUpdate = true; // important!
			// material
			var boxMaterial = new MeshBasicMaterial({ map: texture });

			var box = new Mesh( boxGeo, boxMaterial );
			box.receiveShadow = true;
			box.castShadow = true;
			box.position.set( -85 + (15 * i) , 0, -120);
			boxes.push(box);
			scene.add( box );
		}

		var artworkMini = Object.keys(this.props.artworks).slice(0, 100);

		for( var i = 0; i< artworkMini.length; i++ ){
			var color = this.props.artworks[artworkMini[i]].color.replace(/^#/, '');
			var r = parseInt(color.slice(0, 2), 16),
				g = parseInt(color.slice(2, 4), 16),
				b = parseInt(color.slice(4, 6), 16);
			var geometry = new SphereGeometry( 3, 32, 16 );
			var material = new MeshPhysicalMaterial( {
				color: parseInt(color, 16),
				roughness: 0.7,
				transparency: 0.15,
				flatShading: true,
				transparent: true
			});
			var sphere = new Mesh( geometry, material );
			sphere.castShadow = true;
			sphere.receiveShadow = true;
			var max = Math.max(r, g, b);
			// blue default
			var xVal = xVal = ((r/255) * 60 ) + 120;
			if(max == r) xVal = (g/255) * 60;
			else if(max == g) xVal = ((b/255) * 60) + 60;
			xVal -= 85; // offest for enviornment
			//var yVal = -50; min val, max val = 50

			var hsl, {h, s, l } = material.color.getHSL(hsl);
			var yVal = l * 100 - 50; 
			var initXVal = xVal; 
			console.log( i, xVal, yVal, spheres.map( x => [x.position.x, x.position.y] ));
			for( var collisions = spheres.filter( x => x.position.x >= xVal - 6 && x.position.x <= xVal + 6 && x.position.y <= yVal + 6 && x.position.y >= yVal - 6);
				collisions.length > 0;
			){
				console.log(xVal, yVal, collisions);
				xVal = (((Math.max( ...collisions.map( x => x.position.x )) + 7) + 85) % 165) - 85
				collisions = spheres.filter( x => x.position.x >= xVal - 6 && x.position.x <= xVal + 6 && x.position.y <= yVal + 6 && x.position.y >= yVal - 6);
				if(xVal < initXVal && xVal >= initXVal - 6 ) yVal -= 6, xVal = initXVal; 
			}
			if(xVal > 80) xVal -= 165
			sphere.position.set(xVal, yVal, -117);
			sphere.castShadow = true;
			spheres.push(sphere);
			scene.add( sphere );
		}
	
		renderer.render( scene, camera );
		this.animate();
	}


	animate() {
		requestAnimationFrame( this.animate );
		controls.update();
		renderer.render( scene, camera );
	}

	generateTexture(hex) {
		var width = 15;
		var height = 100;
		hex = hex.toString(16);
		var color = "#" + ("000000".substr(0, 6 - hex.length) + hex);

		// create canvas
		var canvas = document.createElement( 'canvas' );
		canvas.width = width;
		canvas.height = height;

		// get context
		var context = canvas.getContext( '2d' );

		// draw gradient
		context.rect( 0, 0, width, height );
		var gradient = context.createLinearGradient( 0, 0, width, height );
		gradient.addColorStop(0, '#ffffff'); // white
		gradient.addColorStop(.3, color);
		gradient.addColorStop(.7, color);
		gradient.addColorStop(1, '#000000'); // black
		context.fillStyle = gradient;
		context.fill();

		return canvas;
	}

	onClick(){
		console.log(boxes);
		//renderer.render( scene, camera );
	}


	componentWillUnmount() {
		this.mount.removeChild(this.mount.children[0]);
  	}

	render(){

		return (
			<div className="twoDTest">
				<div
				onClick={this.onClick.bind(this)}
				ref={ref => (this.mount = ref)} />
			</div>
		);
	}
}

function mapStateToProps(state){
	return { artworks: state.artworks }
}

export default connect(mapStateToProps)(TwoDTest);
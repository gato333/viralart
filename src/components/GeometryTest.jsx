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
import ListArtworksTest from './ListArtworksTest.jsx';
var scene, camera, renderer, light, sphere, x, y;

class GeometryTest extends React.Component { 
	constructor(props){
		super(props);
		this.state = {
			watchCursor: true,
			x: 0,
			y: 0
		}
		this.animate = this.animate.bind(this);
		this.keyUpDetection = this.keyUpDetection.bind(this);
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
		// SHPERE
		var geometry = new SphereGeometry( 10, 32, 16 );
		geometry.computeFlatVertexNormals();
		var material = new MeshNormalMaterial();
		sphere = new Mesh( geometry, material );
		sphere.castShadow = true;
		sphere.receiveShadow = true;
		sphere.position.set(0, 0, -20)
		scene.add( sphere );

		// SUPER SIMPLE GLOW EFFECT
		var spriteMaterial = new SpriteMaterial({
			map: new ImageUtils.loadTexture( 'images/glow.png' ),
			color: 0x1c1b71
		});
		var sprite = new Sprite( spriteMaterial );
		sprite.scale.set(70, 70, 1.0);
		sphere.add(sprite); // this centers the glow at the mesh

		// SKYBOX
		var skyGeometry = new BoxGeometry( 1000, 1000, -300 );	
		var skyMaterial =  new MeshBasicMaterial( { color: 0x110144 } );
		var skyBox = new Mesh( skyGeometry, skyMaterial );
		skyBox.position.set(0, 0, 0);
		scene.add( skyBox );

		document.body.onkeyup = this.keyUpDetection;

	    this.animate();
	}

	componentWillUnmount() {
		scene = null, camera = null, renderer = null, light = null, sphere = null;
		cancelAnimationFrame(this.lastRequest);
		this.mount.removeChild(this.mount.children[0]);
  	}

	animate(){
		this.lastRequest = requestAnimationFrame( this.animate );
		if(this.state.watchCursor) this.triggerRotation();
		renderer.render( scene, camera );
	}

	onMouseMove(e){
		this.setState({ x: e.screenX, y: e.screenY });
	}

	triggerRotation(){
		var MID_HEIGHT = window.innerHeight/2, MID_WIDTH = window.innerWidth/2;
		if(this.state.x > MID_WIDTH + 50 ) sphere.rotation.y -= 0.005;
		else if( this.state.x < MID_WIDTH - 50 ) sphere.rotation.y += 0.005;
		if(this.state.y > MID_HEIGHT + 50) sphere.rotation.x -= 0.005;
		else if (this.state.y < MID_HEIGHT - 50 )  sphere.rotation.x += 0.005;
	}

	keyUpDetection(event){
		if(event.keyCode == 32)
			this.setState( prev => new Object({ watchCursor: !prev.watchCursor }) )
	}

	render(){

		return (
			<div>
				<ListArtworksTest />
				<div className="geometryTest">
					<div 
					onMouseMove={this.onMouseMove.bind(this)}
					ref={ref => (this.mount = ref)} />
				</div>
			</div>
		);
	}
}

function mapStateToProps(state){
	return { artworks: state.artworks }
}

export default connect(mapStateToProps)(GeometryTest);
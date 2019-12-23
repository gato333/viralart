import React from 'react';
import Navigation from './design/Navigation.jsx';
import DetailViewer from './DetailViewer.jsx';
import GeometryTest from './GeometryTest.jsx';

export default class Home extends React.Component { 
	render(){
		return (
			<div>
				<Navigation />
				<DetailViewer />
				<GeometryTest />
		 	</div>
		);
	}
}
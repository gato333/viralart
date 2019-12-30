import React from 'react';
import { Route } from 'react-router-dom';
import Navigation from './design/Navigation.jsx';
import DetailViewer from './DetailViewer.jsx';
import GeometryTest from './GeometryTest.jsx';
import FlatTest from './FlatTest.jsx';
import TwoDTest from './TwoDTest.jsx';

export default ({ match }) => (
	<div>
		<Navigation />
		<DetailViewer />
		
		<Route path={`${match.path}/1`} component={GeometryTest} />
		<Route path={`${match.path}/2`} component={FlatTest} />
		<Route path={[`${match.path}/3`, `${match.path}`]} component={TwoDTest} />
 	</div>
);
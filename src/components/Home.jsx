import React from 'react';
import { Route } from 'react-router-dom';
import Navigation from './design/Navigation.jsx';
import DetailViewer from './DetailViewer.jsx';
import GeometryTest from './GeometryTest.jsx';
import FlatTest from './FlatTest.jsx';

export default ({ match }) => (
	<div>
		<Navigation />
		<DetailViewer />
		
		<Route path={`${match.path}/1`} component={GeometryTest} />
		<Route path={[`${match.path}/2`, `${match.path}`]} component={FlatTest} />
 	</div>
);
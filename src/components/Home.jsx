import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navigation from './design/Navigation.jsx';
import DetailViewer from './DetailViewer.jsx';
import GeometryTest from './GeometryTest.jsx';
import FlatTest from './FlatTest.jsx';
import TwoDTest from './TwoDTest.jsx';
import TwoDTestPart1 from './TwoDTestPart1.jsx';

export default ({ match }) => (
	<div>
		<Navigation />
		<DetailViewer />
		<Switch>
			<Route path={`${match.path}/1`} component={GeometryTest} />
			<Route path={`${match.path}/2`} component={FlatTest} />
			<Route path={`${match.path}/3`} component={TwoDTestPart1} />
			<Route path={[`${match.path}/4`, `${match.path}`]} component={TwoDTest} />
 		</Switch>
 	</div>
);
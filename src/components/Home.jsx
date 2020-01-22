import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navigation from './design/Navigation.jsx';
import GeometryTest from './GeometryTest.jsx';
import FlatTest from './FlatTest.jsx';
import TwoDTest from './TwoDTest.jsx';
import TwoDTestPart1 from './TwoDTestPart1.jsx';
import LoadingAnimation from './LoadingAnimation.jsx';

export default ({ match }) => (
	<div className="home">
		<Navigation />
		<Switch>
			<Route exact path={`${match.path}/1`} component={GeometryTest} />
			<Route exact path={`${match.path}/2`} component={FlatTest} />
			<Route exact path={`${match.path}/3`} component={TwoDTestPart1} />
			<Route exact path={`${match.path}/4`} component={TwoDTest} />
			<Route component={TwoDTest} />
 		</Switch>
 		<LoadingAnimation />
 	</div>
);
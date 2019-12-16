import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import WorldExplorer from './WorldExplorer.jsx';
import DetailViewer from './DetailViewer.jsx';
import Navigation from './Navigation.jsx';

const SampleHome = () => (
	<div>
		<WorldExplorer />
		<DetailViewer />
		<Navigation />
 	</div>
);

export default withRouter(SampleHome);

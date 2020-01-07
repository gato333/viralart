import React from 'react';
import Navigation from './Navigation.jsx';

export default () => (
	<div className="sampleHome">
		<div className="worldExplorer">
	      	<div className="world" />
	     </div>
		<Navigation />
		<div className="detailViewer">
	  		<img className='main' src="http://files.artsy.net/images/earlystudiesofnature.png" />
			<p> Work Title </p>
			<p className="small"> Artist Name </p>
			<p className="small"> medium </p>
			Explore other Work
			<div className="otherWork">
				<img src="http://files.artsy.net/images/earlystudiesofnature.png" />
				<img src="http://files.artsy.net/images/earlystudiesofnature.png" />
				<img src="http://files.artsy.net/images/earlystudiesofnature.png" />
				<img src="http://files.artsy.net/images/earlystudiesofnature.png" />
			</div>
	    </div>
 	</div>
);
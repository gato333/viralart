import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import path from 'path'
import { getArtistArtworkRels,
	getArtworks,
	getArtists } from '../data/db.js';

import { renderToString } from 'react-dom/server';
import React from 'react';
import configureStore from './store.js';
import renderHTMLwithInject from './html.js';
import AppRouter from './components/AppRouter.jsx';


const app = express();
const hostname = 'localhost';
const port = process.env.PORT || 6660;

app.use(rawBody);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())

var server = app.listen(port, function () {
    console.log(`Server running at http://${hostname}:${port}/`);
});

function rawBody(req, res, next) {
	if(req.headers['content-type'] != 'application/json'){
	  req.setEncoding('utf8');
	  req.rawBody = '';
	  req.on('data', function(chunk) {
	    req.rawBody += chunk;
	  });
	  req.on('end', function(){
	    next();
	  });
	} else next();
}

const validFiles = [ '/favicon.ico', '/main.js', '/main.js.map', '/styles.css',
	'/styles.css.map', '/server.bundle.js.map', '/server.bundle.js'];

app.get( "/*", async (req, res) => {
	if( validFiles.includes(req.url) || /.(jpg|png)$/.test(req.url) )
		return res.status(200).sendFile(path.join(__dirname + req.url))
	else {
		let artists = {}, artworks = {}, aaRelationships = [], artistsArr = [], artworksArr = [];
		try {
			[ artistsArr, artworksArr, aaRelationships ] = await Promise.all([
				getArtists(),
				getArtworks(),
				getArtistArtworkRels()
			]);
			artists = artistsArr.reduce( (map, obj) => {
				var id = obj.id;
				delete obj['id'];
				map[id] = obj;
			    return map;
			}, {});

			artworks = artworksArr.reduce( (map, obj) => {
				var id = obj.id;
				delete obj['id'];
				map[id] = obj;
			    return map;
			}, {});
		} catch (e){
			console.log('date hydrate failure: ', e)
		}
		let preloadedState = { artists, artworks, aaRelationships };
		const store = configureStore(preloadedState);
		const finalState = store.getState();
		const app = renderToString(<AppRouter store={store} />); 
		return res.status(200).send(renderHTMLwithInject(app, finalState))

	}
});
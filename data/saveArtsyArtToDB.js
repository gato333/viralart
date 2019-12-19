//   #################################################
//   #################################################
// 		takes Artsy JSON obj and saved artwork info to db
//
//   #################################################

import {
	getArtworks,
	addArtworks,
	getArtists,
	addArtists
} from './db.js';

import { stringOrNull } from './util.js';
var dataFile = require('./artsy/graphQLdata.json');
var dataFile1 = require('./artsy/graphQLdata1.json');

import abstract_art from './artsy/onlyArtwork/abstract-art.json';
import abstract_calligraphy from './artsy/onlyArtwork/abstract-calligraphy.json';
import americana_photography from './artsy/onlyArtwork/americana-photography.json';
import collect_by_color_black_and_white from './artsy/onlyArtwork/collect-by-color-black-and-white.json';
import collect_by_color_orange from './artsy/onlyArtwork/collect-by-color-orange.json';
import minimalist_painting from './artsy/onlyArtwork/minimalist-painting.json';
import minimalist_prints from './artsy/onlyArtwork/minimalist-prints.json';
import pop_and_street_art from './artsy/onlyArtwork/pop-and-street-art.json';

var artworkFiles = [ abstract_art, abstract_calligraphy, americana_photography,
	collect_by_color_black_and_white, collect_by_color_orange, minimalist_prints,
	minimalist_painting, pop_and_street_art ];

async function main(){

	var existingArtists = (await getArtists()).map( elm => elm.name );
	var existingArtworks = (await getArtworks()).map( elm => elm.title );
	var originalArtistCount = existingArtists.length,
			originalArtworkCount = existingArtworks.length;

	var artworks = dataFile.data.artworks;
	var artists = dataFile1.data.popular_artists.artists;
	var artistToSave = [],
			artworkToSave = [],
			artworkToSave2 = [];

	artworks.forEach( function (elm, i) {
			var x = [
				stringOrNull(elm.artists[0].name),
				stringOrNull(elm.artists[0].bio),
				stringOrNull(elm.artists[0].birthday),
				stringOrNull(elm.artists[0].deathday)
			];
			var alreadyInTable = existingArtists.find( elm2 => elm2 == x[0] );
			if(!alreadyInTable){
				artistToSave.push('( ' + x.join(', ') + ' )');
				existingArtists.push(x[0]);
			}

			var xx = [
				stringOrNull(elm.title),
				stringOrNull(elm.price),
				stringOrNull(elm.medium),
				stringOrNull(elm.category),
				stringOrNull(elm.description),
				stringOrNull(elm.imageUrl),
				stringOrNull(elm.artists[0].name),
				stringOrNull(elm.date)
			];
			var alreadyInTable2 = existingArtworks.find( elm2 => elm2 == xx[0] );
			if(!alreadyInTable2){
				artworkToSave.push('( ' + xx.join(', ') + ' )');
				existingArtworks.push(elm.title);
			}
		})

	artists.forEach( function (elm, i) {
			elm.artworks.forEach( function (elm4, i) {
				var x = [
					stringOrNull(elm.name),
					stringOrNull(elm.bio),
					stringOrNull(elm.birthday),
					stringOrNull(elm.deathday)
				];
				var alreadyInTable2 = existingArtists.find( elm2 => elm2 == x[0]);
				if(!alreadyInTable2){
					artistToSave.push('( ' + x.join(', ') + ' )');
					existingArtists.push(x[0]);
				}

				var xx = [
					stringOrNull(elm4.title),
					stringOrNull(elm4.price),
					stringOrNull(elm4.medium),
					stringOrNull(elm4.category),
					stringOrNull(elm4.description),
					stringOrNull(elm4.imageUrl),
					stringOrNull(elm.name),
					stringOrNull(elm4.date)
				];
				var alreadyInTable2 = existingArtworks.find( elm2 => elm2 == xx[0]);
				if(!alreadyInTable2){
					artworkToSave.push('( ' + xx.join(', ') + ' )');
					existingArtworks.push(xx[0]);
				}
			});

		})

	artworkFiles.forEach( file => {
		file.forEach( (elm, i) => {
				var x = [
					stringOrNull(elm[0]),
					stringOrNull(elm[1]),
					stringOrNull(elm[2]),
					stringOrNull(elm[3]),
					stringOrNull(elm[4]),
					stringOrNull(elm[5])
				];
				var alreadyInTable = existingArtworks.find( elm2 => elm2 == x[0] );
				if(!alreadyInTable){
					artworkToSave2.push('( ' + x.join(', ') + ' )');
					existingArtworks.push(elm.title);
				}
			})
	});

	console.log('new artwork ids: ', await addArtworks(artworkToSave2.join(', '), true));
	console.log('new artwork ids: ', await addArtworks(artworkToSave.join(', ')));
	console.log('new artist ids: ', await addArtists(artistToSave.join(', ')));

	var allArtist = await getArtists();
	var allArtwork = await getArtworks();

	if(allArtwork.length != originalArtworkCount + artworkToSave.length + artworkToSave2.length)
		console.log('insert discrepency', 'db originally had: ' + originalArtworkCount,
			'insert was supposed to save: ' + (artworkToSave.length + artworkToSave2.length),
			'current artwork total: ' +allArtwork.length);

	if(allArtist.length != originalArtistCount + artistToSave.length )
		console.log('insert discrepency', 'db originally had: ' + originalArtistCount,
			'insert was supposed to save: ' + artistToSave.length,
			'current artwork total: ' +allArtist.length);

}

main();


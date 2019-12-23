//   #################################################
//   #################################################
// 		takes Artsy JSON obj and saved artwork info to db
//
//   #################################################

import {
	getArtworks,
	addArtworks,
	getArtists,
	addArtists,
	addArtist,
	addArtistArtworkRels,
	getArtistArtworkRels
} from './db.js';

import { stringOrNull, DB_NULL } from './util.js';
var dataFile = require('./artsy/graphQLdata.json');
var dataFile1 = require('./artsy/graphQLdata1.json');
import getImageAnalysis from './getImageAnalysis';

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

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

async function main(){
	var existingArtists = (await getArtists()).map( elm => elm.name );
	var existingArtworks = await getArtworks();
	var originalArtistCount = existingArtists.length,
		originalArtworkCount = existingArtworks.length,
		artworks = dataFile.data.artworks,
		artists = dataFile1.data.popular_artists.artists,
		artistToSave = [],
		artworkToSave = [],
		artworkToSave2 = [];

	// parsing the graphQLdata files
	await asyncForEach( artworks, async function (elm, i) {
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
			var alreadyInTable2 = existingArtworks.find( elm2 => elm2[0] == xx[0] && elm2[6] == xx[6]);
			if(!alreadyInTable2){
				var [color, people, tags] = [DB_NULL, DB_NULL, DB_NULL];
				if(xx[5] != DB_NULL){
					var clariaiObj = await getImageAnalysis( elm.imageUrl);
					color = stringOrNull(clariaiObj.primaryColor.hex),
					people = stringOrNull(clariaiObj.people),
					tags = stringOrNull(clariaiObj.tags)
				}
				xx = xx.concat([ color, people, tags ]);
				artworkToSave.push('( ' + xx.join(', ') + ' )');
				existingArtworks.push(xx);
			}
		})
	await asyncForEach( artists, async function (elm, i) {
			asyncForEach( elm.artworks, async function (elm4, i) {
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
				var alreadyInTable2 = existingArtworks.find( elm2 => elm2[0] == xx[0] && elm2[6] == xx[6]); 
				if(!alreadyInTable2){
					var [color, people, tags] = [DB_NULL, DB_NULL, DB_NULL];
					if(xx[5] != DB_NULL){
						var clariaiObj = await getImageAnalysis(xx[5]);
						color = stringOrNull(clariaiObj.primaryColor.hex),
						people = stringOrNull(clariaiObj.people),
						tags = stringOrNull(clariaiObj.tags)
					}
					xx = xx.concat([ color, people, tags ]);
					artworkToSave.push('( ' + xx.join(', ') + ' )');
					existingArtworks.push(xx);
				}
			});

		})
	// parsing /onlyArtwork files ( sparse  on artist info )
	await asyncForEach( artworkFiles, async file => {
		await asyncForEach( file,  async (elm, i) => {
				var x = [
					stringOrNull(elm[0]),
					stringOrNull(elm[1]),
					stringOrNull(elm[2]),
					stringOrNull(elm[3]),
					stringOrNull(elm[4]),
					stringOrNull(elm[5])
				];
				var alreadyInTable = existingArtworks.find( elm2 => elm2[0] == x[0] && (elm2[5] == x[5] || elm2[6] == x[5])) ;
				if(!alreadyInTable){
					var [color, people, tags] = [DB_NULL, DB_NULL, DB_NULL];
					if(elm[4] != DB_NULL){
						var clariaiObj = await getImageAnalysis(elm[4]);
						color = stringOrNull(clariaiObj.primaryColor.hex),
						people = stringOrNull(clariaiObj.people),
						tags = stringOrNull(clariaiObj.tags)
		
					}
					x = x.concat([ color, people, tags ]);
					artworkToSave2.push('( ' + x.join(', ') + ' )');
					existingArtworks.push(x);
				}
			})
	});

	if(artworkToSave2.length > 0)
		console.log('new artwork ids1: ', await addArtworks(artworkToSave2.join(', '), true))
	if(artworkToSave.length > 0)
		console.log('new artwork ids2: ', await addArtworks(artworkToSave.join(', ')))

	console.log('new artist ids: ', await addArtists(artistToSave.join(', ')))

	var allArtist = await getArtists(),
		allArtwork = await getArtworks(),
		aaRelToSave = [],
		aaWaitingToSave = {};

	// first we need to find missing artists if any
	for(var i = 0; i < allArtwork.length; i++){
		var artwork = allArtwork[i];
		var artist = allArtist.find( x => x.name == artwork.artistname);
		if(!artist) aaWaitingToSave[artwork.artistname] = true;
	}

	// adding missing artist
	if( Object.keys(aaWaitingToSave).length > 0 ){
		var artistToSave2 = Object.keys(aaWaitingToSave)
			.map( x => [ stringOrNull(x), DB_NULL, DB_NULL, DB_NULL ])
			.map( x => '( ' + x.join(', ') + ' )' )
		console.log('new artist ids2: ', await addArtists(artistToSave2.join(', ')) )
		allArtist = await getArtists();
	}
	// adding all the rels finally
	for(var i = 0; i < allArtwork.length; i++){
		var artwork = allArtwork[i];
		var artist = allArtist.find( x => x.name == artwork.artistname);
		aaRelToSave.push('(' + artist.id + ', ' + artwork.id  + ' )');
	}

	console.log('Total Relationships added: ', await addArtistArtworkRels(aaRelToSave.join(', ')));
	return;

}

main();


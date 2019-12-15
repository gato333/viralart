//   #################################################
//   #################################################
// 		adds connection to artist_artwork between existing
//		art and artists
//   #################################################

import {
	getArtworks,
	getArtists,
	addArtistArtworkRel,
	addArtist,
	getArtistArtworkRels
} from './dbUtils.js';

async function main(){
	var artists = (await getArtists());
	var artworks = (await getArtworks());

	console.log('artwork count: ', artworks.length);
	console.log('artist count: ', artists.length);

	for(var i = 0; i < artworks.length; i++){
		var artwork = artworks[i];
		var artist = artists.find( x => x.name == artwork.artistname);
		if(!artist) artist = { id: (await addArtist([ artwork.artistname, null, null, null])) };
		await addArtistArtworkRel(artist.id, artwork.id);
	}

	console.log('connection count: ', (await getArtistArtworkRels()).length);
	return;
}

main();


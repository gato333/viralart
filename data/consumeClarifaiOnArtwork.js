//   #################################################
//   #################################################
// 		anaylzes the image associated with the imageurl
//		saved in the artwork db,
// 		passes it threw our consumption of the clairifai
//		api and saves the result to the db
//
//   #################################################

import {
	getArtworks,
	updateArtwork
} from './dbUtils.js';
import {stringOrNull} from './util.js';
import getImageAnalysis from './getImageAnalysis';

async function main(){
	var artworks = (await getArtworks());
	console.log('artwork before: ', artworks.map(x => x.id));

	for(var i = 0; i < artworks.length; i++){
		var artwork = artworks[i];
		var updateObj = await getImageAnalysis(artwork.imageurl)
		updateObj = 'color= ' + stringOrNull(updateObj.primaryColor.hex) +
			' , people= ' + stringOrNull(updateObj.people) +
			' , tags= ' + stringOrNull(updateObj.concepts)
		var res = await updateArtwork(artwork.id, updateObj);
		console.log(res ? 'successfully added image info of artwork: ': 'failed to update: ', artwork.id);
	}

	console.log('artwork after: ', (await getArtworks()))
	return;
}

main();


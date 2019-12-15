
import fs from 'fs';


async function main(){

	var files = await ( new Promise ( (resolve, reject) => {
		fs.readdir('./data/artsy/onlyArtwork', (err, files) => {
		  if (err) reject("Could not list the directory."), process.exit(1);
		  resolve(files);
		});
	}))
	console.log('files', files)

}

main();
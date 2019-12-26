//   #################################################
//   #################################################
//        DB functions
//
//        getArtworks()
//				getArtists()
//        addArtwork()
//				addArtist()
//        addArtworks()
//				addArtists()
//   #################################################


import pg from 'pg';
var Pool = pg.Pool;
var creds = require('../creds.json');
if(process.env.DATABASE_URL)
	creds = { connectionString: process.env.DATABASE_URL };
else
	creds = creds.postgres
const pool = new Pool(creds);



export async function getArtworks() {
	try {
	  const results = await pool.query('SELECT * FROM artwork;');
	  return results.rows;
	  await pool.end();
  } catch (e) {
  	console.log('getArtworks err:', e)
  }
}

export async function getArtists() {
	try {
	  const results = await pool.query('SELECT * FROM artist;');
	  return results.rows;
	  await pool.end();
  } catch (e) {
  	console.log('getArtworks err:', e)
  }
}


export async function addArtwork(arr){
	try {
		var results = await pool.query(
			'INSERT INTO artwork ' +
			'("title", "price", "medium", "category", "description", "imageurl", "artistname", "date") ' +
			'VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id;', arr );;
		 if(results.rows.length != 1) throw 'Failed to add row to artwork db';
		 return results.rows[0].id;
		 await pool.end();
	} catch (e) {
  	console.log('addArtwork err:', e)
  }
}
// DB INIT ONLY
export async function addArtworks(arr, less=false){
	try {
		var results = await pool.query(
			'INSERT INTO artwork ' +
			'("title", "price", "medium", ' +
			(less ? '' : '"category", ') +
			'"description", "imageurl", "artistname", ' +
			(less ? '' : '"date" ,' ) +
			'"color", "people", "tags") VALUES ' +  arr + ' RETURNING id;');
		if(results.rows.length < 1 ) throw 'Failed to add rows to artworks db';
		return results.rows.map( x => x.id );
		await pool.end();
	} catch (e) {
  	console.log('addArtworks err:', e)
  }
}

//updateStr must be in format 'key=value, key=value'
export async function updateArtwork(artwork_id, updateStr){
	try {
		var results = await pool.query(
			'UPDATE artwork SET ' + updateStr +
			' WHERE id = $1 ;', [artwork_id]);
		if(results.rowCount != 1) throw 'Failed to update row to artwork db';
		return true;
		await pool.end();
	} catch (e) {
  	console.log('addArtwork err:', e)
  }
}

export async function addArtist(arr){
	try {
		var results = await pool.query(
			'INSERT INTO artist ' +
			'("name", "bio", "birthday", "deathday") ' +
			'VALUES ($1, $2, $3, $4) RETURNING id;', arr );
		 if(results.rows.length != 1) throw 'Failed to add row to artist db';
		 return results.rows[0].id;
		 await pool.end();
	} catch (e) {
  	console.log('addArtist err:', e)
  }
}

// DB INIT ONLY 
export async function addArtists(arr){
	try {
		var results = await pool.query(
			'INSERT INTO artist ' +
			'("name", "bio", "birthday", "deathday") ' +
			'VALUES ' +  arr + ' RETURNING id;');
		if(results.rows.length < 1) throw 'Failed to add rows to artists db';
		return results.rows.map( x => x.id);
		await pool.end();
	} catch (e) {
  	console.log('addArtists err:', e)
  }
}

export async function addArtistArtworkRel(artist_id, artwork_id){
	try {
		var results = await pool.query(
			'INSERT INTO artist_artwork ' +
			'("artistid", "artworkid") ' +
			'VALUES ( $1, $2 ); ' , [artist_id, artwork_id]);
		if(results.rows.length == 1) throw 'Failed to add row to artist_artwrork db';
		return true;
		await pool.end();
	} catch (e) {
  	console.log('addArtistArtworkRelationship err:', artist_id, artwork_id,  e)
  	return false;
  }
}
// DB INIT ONLY 
export async function addArtistArtworkRels(arr){
	try {
		var results = await pool.query(
			'INSERT INTO artist_artwork ' +
			'("artistid", "artworkid") ' +
			'VALUES ' +  arr + ';');
		if(results.rowCount < 1) throw 'Failed to add rows to artist_artwork db';
		return results.rowCount;
		await pool.end();
	} catch (e) {
  	console.log('addArtistArtworkRels err:', e)
  }
}


export async function getArtistArtworkRels(){
	try {
		var results = await pool.query('SELECT * FROM artist_artwork;');
		return results.rows;
		await pool.end();
	} catch (e) {
  	console.log('getArtistArtworkRels err:', e)
  }
}





async function test(){
  var artists = await getArtists()
  console.log('artists', artists);
  var artworks = await getArtworks()
  console.log('artworks', artworks);

  var artist1 = ["Lemon Grab", "The most lemoney bitch to ever exist", "12/3/2019", null];
  //console.log(await addArtist(artist1));

  var artist2 = ["Finn the Human", "a hero", "10/01/2009", 'NULL'];
  var artist3 = ["Jake the Dog", "a sidekick", "10/01/1950", 'NULL'];
  var artistMulti = [artist2, artist3].map( x => '( ' + x.map( y => "\'" + y + "\'").join(', ') + " )" ).join(', ')
  //console.log(await addArtists(artistMulti));

  var artistwork1 = ['the first lemon child', 666.66, "painting" , "abstract", "a good painting",
  	"https://vignette.wikia.nocookie.net/adventuretimewithfinnandjake/images/f/f5/Earl.png/revision/latest/scale-to-width-down/190?cb=20120723061821",
  	"Lemon Grab", "12/01/2019"
  ];
  //console.log(await addArtwork(artistwork1));


  var artword2 = ['my favoirte sword', 20033, "drawing" , "realism", "charcole on paper",
  	"https://image.shutterstock.com/image-vector/sword-doodle-260nw-266152331.jpg",
  	"Finn the Human", "11/10/2019"
  ];
  var artword3 = ['violin', 200, "sculpture" , "realisim", "clay sculpture of violin",
  	"https://i.ytimg.com/vi/4r0gJLkTX8o/maxresdefault.jpg",
  	"Jake the Dog", "11/30/2019"
  ];
  var artworkMulti = [artword2, artword3].map( x => '( ' + x.map( y => "\'" + y + "\'").join(', ') + " )" ).join(', ')
  //console.log(await addArtworks(artworkMulti));

  artists = await getArtists()
  console.log('artists', artists);
  artworks = await getArtworks()
  console.log('artworks', artworks);

}

//test();


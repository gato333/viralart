//   #################################################
//   #################################################
//
//        This script data scraps Artsy.net HTML
//        requries a parameter string
//        this will allow us to scrap a specific page
//        i.e. 'abstract-art' is default
//        saves a json file with artwork information to /data/{#pagescrapped}
//        this file then can be easily saved to the db
//
//        in terminal: node data/fetchArtsyData.js 'abstract-art'
//
//   #################################################

const fs = require('fs');
const phantom = require('phantom');


var stringOrNull = function (x){
  if( !x || x == "")
    return 'NULL';
  else
    return x;
    //return "'" + x.replace(/\(/g, '//(').replace(/\)/g, '//)').replace(/'/g, "''") + "'";
}

var collectionToExtract = process.argv[2] || 'abstract-art';
// 'abstract-art', 'minimalist-paintings', 'artists-posters'

(async function() {
	const instance = await phantom.create();
  const page = await instance.createPage();
  await page.on('onResourceRequested', function(requestData) {
    //console.info('Requesting', requestData.url);
  });

  await page.on('onConsoleMessage', function(msg) {
   console.log('CONSOLE: ' + msg);
  });

  await page.setting('userAgent', 'SpecialAgent');
  var urlDestination = 'https://www.artsy.net/collection/' + collectionToExtract
  const status = await page.open(urlDestination);

  var ua = await page.evaluate( function () { return __RELAY_BOOTSTRAP__ } );
  await instance.exit();

  if( !ua )
    throw 'invalid url to parse: ' + urlDestination;

  var uap = JSON.parse(ua)

  //console.log(uap[0][1].data.collection.artworks.merchandisable_artists);
  var art = uap[0][1].data.collection.artworks.artworks_connection.edges || [];

  var exportDataObj = [];

  //save data into array format for saving to postgres
  for( var i =0; i < art.length; i++ )
    exportDataObj.push([
        stringOrNull(art[i].node.title),
        stringOrNull(art[i].node.price),
        stringOrNull(art[i].node.category),
        stringOrNull(art[i].node.meta.description),
        stringOrNull(art[i].node.image.url),
        stringOrNull(art[i].node.artists[0].name),
        stringOrNull(art[i].node.date),
        stringOrNull(art[i].node.href)
    ]);

  //save to file
  try {
    fs.writeFile( "/data/artsy/onlyArtwork/" + collectionToExtract + ".json", JSON.stringify(exportDataObj), function(err) {
    if (err)
      throw "saving file: " + JSON.stringify(err);
    else
      console.log(collectionToExtract + ".json successfully saved")
  })
  } catch(ex2){
    throw ex2;
  }

})().catch(function (ex){
  console.log('ERROR: ' + ex );
});

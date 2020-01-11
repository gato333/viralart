//   #################################################
//   #################################################
//        This funtion takes in the url of any image
//        and returns an object containting an analysis
//        of the image.
//        To call:
//        import getImageAnalysis from './getImageAnalysis.js'
//        var response = await getImageAnalysis(image_url);
//
//        Returns:
//        {
//          primaryColor : {
//              name: 'name of color',
//              hex: '#hexhex'
//          },
//          secondaryColors: 'string of hexs (comma seperated)',
//          people: 'string of celeberty names (common seperated)',
//          concepts: 'related words (comma seperated)'
//        }
//   #################################################

const Clarifai = require('clarifai');
var key = require('../creds.json');
if(process.env.CLARIFAI_KEY) key = process.env.CLARIFAI_KEY;
else key = key.clarifai;
const app = new Clarifai.App({ apiKey: key });

const empty = {
  primaryColor : {
    name: null,
    hex: null
  },
  secondaryColors: null,
  people: null,
  concepts: null
}

function extractRGBDecimal(hex){
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16)
  }
}

function rgbSum (obj){ return obj.r + obj.b + obj.g };

async function getImageAnalysis(image_url){
    if(!image_url) return empty;
    try {
      var response = await app.workflow.predict( 'first-flow', image_url );
      if(response.results){
      	var res = response.results[0].outputs;
      	var analysisObj = {};

  			for(var i = 0; i < res.length; i++){
  				var display_res = res[i];
      		if(display_res.model.name == 'color'){
      			display_res = display_res.data.colors;

      			analysisObj.secondaryColors = display_res.sort( (a, b) => b.value - a.value );
            analysisObj.primaryColor = analysisObj.secondaryColors.shift();
            analysisObj.secondaryColors = analysisObj.secondaryColors
              .filter( (x) =>  x.value > 0.09 )
              .map( (x) => x.raw_hex ).join(',');

            var possibleColors = [ analysisObj.primaryColor.raw_hex, ...analysisObj.secondaryColors.split(',') ];
            analysisObj.betterColor = null; 

            for(var i = 0; i < possibleColors.length && analysisObj.betterColor === null; i++){
              var sum = rgbSum(extractRGBDecimal(possibleColors[i]));
              if(sum >= 120 && sum <= 680) analysisObj.betterColor = possibleColors[i];
            }
            if(analysisObj.betterColor === null)
              analysisObj.betterColor = analysisObj.primaryColor.raw_hex;
            
          } else if(res[i].model.name.includes('celeb')){
      			display_res = display_res.data.regions;
      			if(display_res) {
      				display_res = display_res[0].data.concepts;
      				var celebs = display_res.filter(function(x) { return x.value > 0.1 });
      				if( celebs.length )
      					analysisObj.people = celebs.map(function(x){ return x.name }).join(', ');
      				else analysisObj.people = null;
      			} else analysisObj.people = null;
      		} else if(display_res.data.concepts){
     				var releventConcepts;
      			display_res = display_res.data.concepts;
      			if(res[i].model.name == 'general'){
      				var invalidConcepts = ['art', 'creativity', 'artistic'];
      				releventConcepts = display_res.filter(function(x){ return x.value > 0.94 && !invalidConcepts.includes(x.name)})
        		} else
      				releventConcepts = display_res.filter(function(x){ return x.value > 0.15 })
      			releventConcepts = releventConcepts.length ? releventConcepts.map(function (x){ return x.name }).join(', ') : null;
      			if(analysisObj.concepts && releventConcepts)
      				analysisObj.concepts = analysisObj.concepts + ', ' + releventConcepts;
      			else if( !analysisObj.concepts )
      				analysisObj.concepts = releventConcepts;
      		}
      	}
        return analysisObj
      }
    } catch (error) {
      if(error && error.response) console.log('Clarifai API error:', error.response.status, error.response.statusText );
      else console.log('Local error', error);
      console.log(image_url);
      return empty;
    }
}

export default getImageAnalysis;

async function test(){
  var x = await getImageAnalysis("http://files.artsy.net/images/earlystudiesofnature.png");
  console.log('final', x);
}
//test();


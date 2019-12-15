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
const app = new Clarifai.App({
 apiKey: 'fead81ba20fe4dc9a67acabe1438e731'
});

const empty = {
  primaryColor : {
    name: null,
    hex: null
  },
  secondaryColors: null,
  people: null,
  concepts: null
}

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
      			var primarycolor = display_res.reduce(function(prev, current) {
    					return (prev.value > current.value) ? prev : current
      			});
      			analysisObj.primaryColor = { name: primarycolor.w3c.name, hex: primarycolor.raw_hex };
      			analysisObj.secondaryColors = display_res.filter(function(x) {
    					return x.value > 0.15 && x.raw_hex != primarycolor.raw_hex;
      			}).map( function(x){ return x.w3c.hex }).join(', ');
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
      console.log('Clarifai API error:', error)
      return empty;
    }
}

export default getImageAnalysis;


async function test(){
  var x = await getImageAnalysis("http://files.artsy.net/images/earlystudiesofnature.png");
  console.log('final', x);
}
//test();


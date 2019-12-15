/*
 src/reducers/planet.js

 {
  viewStyle: 'medium' (or content or period),
	elms: [
		{
			id: 1,
			generalMedium: 'painting',
			subMedium: "watercolor painting",
			author: 'Ai Weiwei',
			content: ['sunflower', 'collective','unity', 'eternity'],
			generalColor: 'black',
			allColor: ['black','white'],
			similarArt: [
				{id: 23, strength: 2},
				{id: 14, strength: 3}
			]
		}
	]
 }
*/



export default (state = null, action) => {
 switch (action.type) {
  case 'SET_PLANET':
  	return action.payload
  default:
  	return state
 }
}
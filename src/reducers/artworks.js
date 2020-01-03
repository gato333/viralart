/*
 src/reducers/artworks.js
*/

import {
	SET_ARTWORKS,
	CLEAR_ARTWORKS,
	SET_ARTWORK_OBJ_REF
} from '../actions/artworks.js';

export default (state = {}, action) => {
 switch (action.type) {
  case SET_ARTWORKS:
  	return action.payload
  case SET_ARTWORK_OBJ_REF: 
  	return {
  		...state,
  		[action.payload.artworkId]: {
  			...state[action.payload.artworkId],
  			objRef: action.payload.objRef 
  		}
  	}
  case CLEAR_ARTWORKS:
   	return {};
  default:
  	return state;
 }
}
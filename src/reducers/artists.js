/*
 src/reducers/artists.js
*/

import {
	SET_ARTISTS,
	CLEAR_ARTISTS
} from '../actions/artists.js';

export default (state = {}, action) => {
 switch (action.type) {
  case SET_ARTISTS:
  	return action.payload
  case CLEAR_ARTISTS:
   	return {}
  default:
  	return state;
 }
}
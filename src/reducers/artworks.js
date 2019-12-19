/*
 src/reducers/artworks.js
*/

import {
	SET_ARTWORKS,
	CLEAR_ARTWORKS
} from '../actions/artworks.js';

export default (state = {}, action) => {
 switch (action.type) {
  case SET_ARTWORKS:
  	return action.payload
  case CLEAR_ARTWORKS:
   	return {};
  default:
  	return state;
 }
}
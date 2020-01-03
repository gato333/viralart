/*
 src/reducers/activeArtwork.js
*/

import {
	SET_ACTIVE_ARTWORK,
	CLEAR_ACTIVE_ARTWORK
} from '../actions/activeArtwork.js';

export default (state = null, action) => {
 switch (action.type) {
  case SET_ACTIVE_ARTWORK:
  	return action.payload
  case CLEAR_ACTIVE_ARTWORK:
   	return null;
  default:
  	return state;
 }
}
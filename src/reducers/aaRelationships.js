/*
 src/reducers/aaRelationships.js
*/

import {
	SET_AA_RELATIONSHIPS,
	CLEAR_AA_RELATIONSHIPS
} from '../actions/aaRelationships.js';

export default (state = [], action) => {
 switch (action.type) {
  case SET_AA_RELATIONSHIPS:
  	return action.payload
  case CLEAR_AA_RELATIONSHIPS:
   	return [];
  default:
  	return state;
 }
}
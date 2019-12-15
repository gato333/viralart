/*
 src/reducers/focusPoint.js
*/

import {
	SET_FOCUS_POINT,
	CLEAR_FOCUS_POINT
} from '../actions/focusPoint.js';

export default (state = null, action) => {
 switch (action.type) {
  case SET_FOCUS_POINT:
  	return action.payload
  case CLEAR_FOCUS_POINT:
   	return null
  default:
  	return state;
 }
}
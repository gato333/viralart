/*
 src/actions/focusPoint.js
*/

export const SET_FOCUS_POINT = 'SET_FOCUS_POINT';
export const CLEAR_FOCUS_POINT = 'CLEAR_FOCUS_POINT';


export const setFocusPoint = (pointObj) => dispatch => {
 dispatch({
  type: SET_FOCUS_POINT,
  payload: pointObj
 });
}

export const clearFocusPoint = () => dispatch => {
 dispatch({ type: CLEAR_FOCUS_POINT });
}
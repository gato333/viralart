/*
 src/actions/aaRelationships.js
*/

export const SET_AA_RELATIONSHIPS = 'SET_AA_RELATIONSHIPS';
export const CLEAR_AA_RELATIONSHIPS = 'CLEAR_AA_RELATIONSHIPS';


export const setAaRelationships = (pointObj) => dispatch => {
 dispatch({
  type: SET_AA_RELATIONSHIPS,
  payload: pointObj
 });
}

export const clearAaRelationships = () => dispatch => {
 dispatch({ type: CLEAR_AA_RELATIONSHIPS });
}
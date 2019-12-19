/*
 src/actions/artists.js
*/

export const SET_ARTISTS = 'SET_ARTISTS';
export const CLEAR_ARTISTS = 'CLEAR_ARTISTS';


export const setArtists = (pointObj) => dispatch => {
 dispatch({
  type: SET_ARTISTS,
  payload: pointObj
 });
}

export const clearArtists = () => dispatch => {
 dispatch({ type: CLEAR_ARTISTS });
}
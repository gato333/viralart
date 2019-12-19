/*
 src/actions/artworks.js
*/

export const SET_ARTWORKS = 'SET_ARTWORKS';
export const CLEAR_ARTWORKS = 'CLEAR_ARTWORKS';


export const setArtworks = (pointObj) => dispatch => {
 dispatch({
  type: SET_ARTWORKS,
  payload: pointObj
 });
}

export const clearArtworks = () => dispatch => {
 dispatch({ type: CLEAR_ARTWORKS });
}
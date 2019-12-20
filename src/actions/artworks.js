/*
 src/actions/artworks.js
*/

export const SET_ARTWORKS = 'SET_ARTWORKS';
export const CLEAR_ARTWORKS = 'CLEAR_ARTWORKS';

export const setArtworks = (pointObj) => {
	return {
		type: SET_ARTWORKS,
		payload: pointObj
	};
}

export const clearArtworks = () => {
 return { type: CLEAR_ARTWORKS };
}
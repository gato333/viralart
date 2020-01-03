/*
 src/actions/artworks.js
*/

export const SET_ARTWORKS = 'SET_ARTWORKS';
export const CLEAR_ARTWORKS = 'CLEAR_ARTWORKS';
export const SET_ARTWORK_OBJ_REF = 'SET_ARTWORK_OBJ_REF';

export const setArtworks = (pointObj) => {
	return {
		type: SET_ARTWORKS,
		payload: pointObj
	};
}

export const addObjRefToArtwork = (artworkId, objRef) => {
	return {
		type: SET_ARTWORK_OBJ_REF,
		payload: {artworkId, objRef}
	};
}

export const clearArtworks = () => {
 return { type: CLEAR_ARTWORKS };
}
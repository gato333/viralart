/*
 src/actions/artists.js
*/

export const SET_ARTISTS = 'SET_ARTISTS';
export const CLEAR_ARTISTS = 'CLEAR_ARTISTS';


export const setArtists = (pointObj) => {
	return {
 		type: SET_ARTISTS,
		payload: pointObj
 	};
}

export const clearArtists = () => {
	return { type: CLEAR_ARTISTS };
}
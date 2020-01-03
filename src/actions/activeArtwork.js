/*
 src/actions/activeArtwork.js
*/

export const SET_ACTIVE_ARTWORK = 'SET_ACTIVE_ARTWORK';
export const CLEAR_ACTIVE_ARTWORK = 'CLEAR_ACTIVE_ARTWORK';

export const setActiveArtwork = (artworkID) => {
	return {
		type: SET_ACTIVE_ARTWORK,
		payload: artworkID
	};
}

export const clearActiveArtwork = () => {
 return { type: CLEAR_ACTIVE_ARTWORK };
}
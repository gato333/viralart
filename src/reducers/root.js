import { combineReducers } from 'redux';

import artworks from './artworks';
import aaRelationships from './aaRelationships';
import artists from './artists'
import activeArtwork from './activeArtwork';

export default combineReducers({
	artists,
	artworks,
	aaRelationships,
	activeArtwork
});
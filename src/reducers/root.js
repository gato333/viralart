import { combineReducers } from 'redux';

import artworks from './artworks';
import aaRelationships from './aaRelationships';
import artists from './artists'

export default combineReducers({
	artists,
	artworks,
	aaRelationships
});
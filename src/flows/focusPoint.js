/*
 src/flows/focusPoint.js
*/
import fetch from 'isomorphic-fetch';
import * as actions from './actions';


export const setFocusPoint = id => async dispatch => {
	//dispatch(requestBlogPost(id));
  const focusObj = await blog.get(id);
  const response = await fetch(`/api/single/${id}`);
  if (!response.ok) throw new Error(await response.text());
  const focusObj = await response.json();
	setFocusPoint(focusObj);
}

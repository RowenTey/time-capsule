import {
	FETCH_ALL,
	CREATE,
	UPDATE,
	DELETE,
	LIKE,
	FETCH_BY_SEARCH,
	START_LOADING,
	END_LOADING,
	FETCH_POST,
	COMMENT,
} from "../constants/actionTypes";
import * as api from "../api";

export const getPost = (id) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.fetchPost(id);
		console.log("getPosts", data);
		dispatch({ type: FETCH_POST, payload: data });
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
	}
};

export const getPosts = (page) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.fetchPosts(page);
		console.log("getPosts", data);
		dispatch({ type: FETCH_ALL, payload: data });
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
	}
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
	console.log("searchQuery", searchQuery);
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.fetchPostsBySearch(searchQuery);
		console.log("getPostsBySearch", data);
		dispatch({ type: FETCH_BY_SEARCH, payload: data });
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
	}
};

export const createPost = (post) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.createPost(post);
		console.log("createPost", data);
		dispatch({ type: CREATE, payload: data });
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
	}
};

export const updatePost = (id, post) => async (dispatch) => {
	try {
		const { data } = await api.updatePost(id, post);
		dispatch({ type: UPDATE, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const deletePost = (id) => async (dispatch) => {
	try {
		await api.deletePost(id);
		dispatch({ type: DELETE, payload: id });
	} catch (error) {
		console.log(error);
	}
};

export const likePost = (id) => async (dispatch) => {
	try {
		const { data } = await api.likePost(id);
		dispatch({ type: LIKE, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const commentPost = (value, id) => async (dispatch) => {
	try {
		const { data } = await api.commentPost(value, id);
		console.log("Comments", data);
		dispatch({ type: COMMENT, payload: data });
		return data.comments;
	} catch (error) {
		console.log(error);
	}
};

import axios from "axios";

const API = axios.create({
	baseURL: "https://time-capsule-mern.herokuapp.com/",
});

API.interceptors.request.use((req) => {
	const user = JSON.parse(localStorage.getItem("profile"));
	const token = user?.token;
	console.log("Token for request headers " + token);
	if (token) {
		req.headers.Authorization = `Bearer ${token}`;
	}

	return req;
});

// post APIs
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) =>
	API.get(
		`/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
			searchQuery.tags
		}`
	);
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
	API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const commentPost = (value, id) =>
	API.post(`/posts/${id}/commentPost`, { value });

// auth APIs
export const signin = (formData) => API.post("/user/signin", formData);
export const signup = (formData) => API.post("/user/signup", formData);

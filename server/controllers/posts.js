import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPost = async (req, res) => {
	const { id } = req.params;

	try {
		const post = await PostMessage.findById(id);

		res.status(200).json(post);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getPosts = async (req, res) => {
	const { page } = req.query;

	try {
		const LIMIT = 8;

		// logic for getting starting index
		const startIndex = (Number(page) - 1) * LIMIT;

		// get total number of docs
		const total = await PostMessage.countDocuments({});

		// sorting to get newest first and only fetch from startIndex
		const posts = await PostMessage.find()
			.sort({ _id: -1 })
			.limit(LIMIT)
			.skip(startIndex);

		res.status(200).json({
			data: posts,
			currentPage: Number(page),
			numberOfPages: Math.ceil(total / LIMIT),
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

/* 
	query -> /posts?page=1 ->  page = 1
	params -> /posts/123 -> id = 123 
*/
export const getPostsBySearch = async (req, res) => {
	const { searchQuery, tags } = req.query;

	try {
		/* "i" makes it case insensitive */
		const title = new RegExp(searchQuery, "i"); 

		const posts = await PostMessage.find({
			$or: [{ title }, { tags: { $in: tags.split(",") } }],
		});

		console.log("getPostsBySearch", posts);
		res.status(200).json(posts);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const createPost = async (req, res) => {
	const post = req.body;

	const newPost = new PostMessage({
		...post,
		creator: req.userId,
		createdAt: new Date().toISOString(),
	});

	try {
		await newPost.save();
		const total = await PostMessage.countDocuments({});
		res.status(201).json({ data: newPost, totalPosts: total });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const updatePost = async (req, res) => {
	const { id: _id } = req.params;
	const post = req.body;

	if (!mongoose.Types.ObjectId.isValid(_id))
		return res.status(404).json({ message: `No post with id ${_id}` });

	const updatedPost = await PostMessage.findByIdAndUpdate(
		_id,
		{ ...post, _id },
		{ new: true }
	);

	res.status(200).json(updatedPost);
};

export const deletePost = async (req, res) => {
	const { id: _id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(_id))
		return res.status(404).send("No post with that id");

	await PostMessage.findByIdAndRemove(_id);

	res.status(200).json({ message: "Post deleted successfully" });
};

export const likePost = async (req, res) => {
	const { id: _id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(_id))
		return res.status(404).send("No post with that id");

	const post = await PostMessage.findById(_id);

	// check if user already like that post
	const index = post.likes.findIndex((id) => id === String(req.userId));
	if (index == -1) {
		// like the post
		post.likes.push(String(req.userId));
		console.log(post.likes);
	} else {
		// dislike the post
		post.likes = post.likes.filter((id) => id != String(req.userId));
		console.log(post.likes);
	}

	const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
		new: true,
	});

	res.status(200).json(updatedPost);
};

export const commentPost = async (req, res) => {
	const { id } = req.params;
	const { value } = req.body;

	const post = await PostMessage.findById(id);

	post.comments.push(value);

	const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
		new: true,
	});

	res.status(200).json(updatedPost);
};

/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import FileBase from "react-file-base64";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
	const [postData, setPostData] = useState({
		title: "",
		message: "",
		tags: [""],
		selectedFile: "",
	});
	const user = JSON.parse(localStorage.getItem("profile"));

	/* finding the old post (not updated yet) stored in Redux's store */
	const post = useSelector((state) => {
		const { posts } = state.posts;

		return currentId ? posts.find((p) => p._id === currentId) : null;
	});
	const classes = useStyles();
	const dispatch = useDispatch();

	useEffect(() => {
		if (post) setPostData(() => post);
	}, [post]);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (currentId) {
			dispatch(
				updatePost(currentId, { ...postData, name: user?.result?.name })
			);
		} else {
			dispatch(createPost({ ...postData, name: user?.result?.name }));
		}
		clear();
	};

	const clear = () => {
		setCurrentId(null);
		setPostData(() => ({
			title: "",
			message: "",
			tags: [""],
			selectedFile: "",
		}));
	};

	if (!user?.result?.name) {
		return (
			<Paper className={classes.paper}>
				<Typography variant="h6" align="center">
					Please sign in to create your own memories and like other's memories
				</Typography>
			</Paper>
		);
	}

	return (
		<Paper className={classes.paper} elevation={6}>
			<form
				autoComplete="off"
				noValidate
				className={`${classes.root} ${classes.form}`}
				onSubmit={handleSubmit}
			>
				<Typography variant="h6">
					{currentId ? "Editing" : "Creating"} a Memory
				</Typography>
				<TextField
					name="title"
					variant="outlined"
					label="Title"
					fullWidth
					value={postData.title}
					/* how to update only 1 property in a state that is an object */
					onChange={(e) => setPostData(oldPostData => ({ ...oldPostData , title: e.target.value }))}
				/>
				<TextField
					name="message"
					variant="outlined"
					label="Message"
					fullWidth
					multiline
					minRows={3}
					value={postData.message}
					/* how to update only 1 property in a state that is an object */
					onChange={(e) =>
						setPostData(oldPostData => ({ ...oldPostData, message: e.target.value }))
					}
				/>
				<TextField
					name="tags"
					variant="outlined"
					label="Tags"
					fullWidth
					value={postData.tags.join(", ")}
					/* how to update only 1 property in a state that is an object */
					onChange={(e) =>
						setPostData(oldPostData => ({ ...oldPostData, tags: e.target.value.split(", ") }))
					}
				/>
				<div className={classes.fileInput}>
					<FileBase
						type="file"
						multiple={false}
						onDone={({ base64 }) =>
							/* how to update only 1 property in a state that is an object */
							setPostData(oldPostData => ({ ...oldPostData, selectedFile: base64 }))
						}
					/>
				</div>
				<Button
					className={classes.buttonSubmit}
					variant="contained"
					color="primary"
					size="large"
					type="submit"
					fullWidth
				>
					Submit
				</Button>
				<Button
					variant="contained"
					color="secondary"
					size="small"
					onClick={clear}
					fullWidth
				>
					Clear
				</Button>
			</form>
		</Paper>
	);
};

export default Form;

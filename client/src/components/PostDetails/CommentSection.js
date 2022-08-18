import React, { useRef, useState } from "react";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
	Paper,
	Typography,
	Divider,
	CircularProgress,
	TextField,
	Button,
} from "@material-ui/core";
import { commentPost } from "../../actions/posts";

const CommentSection = ({ post }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [comments, setComments] = useState(post?.comments);
	const [comment, setComment] = useState("");
	const commentRef = useRef();
	const user = JSON.parse(localStorage.getItem("profile"));

	const handleClick = async () => {
		const finalComment = `${user.result.name}: ${comment}`;
		const newComments = await dispatch(commentPost(finalComment, post._id));
		setComments(newComments);
		setComment("");

		commentRef.current.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<div>
			<div className={classes.commentsOuterContainer}>
				<div className={classes.commentsInnerContainer}>
					<Typography gutterBottom variant="h6">
						Comments
					</Typography>
					{comments.map((c, i) => (
						<Typography variant="subtitle1" gutterBottom key={i}>
							<strong>{c.split(": ")[0]}</strong> {c.split(":")[1]}
						</Typography>
					))}
					<div ref={commentRef} />
				</div>
				{user?.result?.name && (
					<div style={{ width: "40%" }}>
						<Typography gutterBottom variant="h6">
							Write a Comment
						</Typography>
						<TextField
							fullWidth
							minRows={4}
							variant="outlined"
							label="Comment"
							multiline
							value={comment}
							onChange={(e) => setComment(e.target.value)}
						/>
						<Button
							style={{ marginTop: "10px" }}
							fullWidth
							variant="contained"
							disabled={!comment}
							color="primary"
							onClick={handleClick}
						>
							Comment
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

export default CommentSection;

import React, { useState } from "react";
import {
	Container,
	Grow,
	Grid,
	Paper,
	AppBar,
	TextField,
	Button,
} from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import { useHistory, useLocation } from "react-router-dom";
import Paginate from "../Pagination";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { useDispatch } from "react-redux";
import { getPostsBySearch } from "../../actions/posts";
import useStyles from "./styles";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const Home = () => {
	const [currentId, setCurrentId] = useState(null);
	const dispatch = useDispatch();
	const classes = useStyles();
	const query = useQuery();
	const history = useHistory();
	const page = query.get("page") || 1;
	const searchQuery = query.get("searchQuery");
	const tagsQuery = query.get("tags");
	const [search, setSearch] = useState("");
	const [tags, setTags] = useState([]);

	const handleKeyPress = (event) => {
		// if user presses enter
		if (event.charCode === 13) {
			// search post
			searchPost();
		}
	};

	// to update state if array
	const handleAdd = (tag) => setTags([...tags, tag]);

	// to update state if array
	const handleDelete = (tagToDelete) =>
		setTags(tags.filter((t) => t !== tagToDelete));

	const searchPost = () => {
		if (search.trim() || tags.length) {
			console.log(search.trim(), tags);
			dispatch(getPostsBySearch({ search, tags: tags.join(",") })); // cannot pass array so join to form string
			history.push(
				`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
			);
			setTags([]);
		} else {
			history.push("/");
		}
	};

	return (
		<Grow in>
			<Container maxWidth="xl">
				<Grid
					className={classes.gridContainer}
					container
					justifyContent="space-between"
					alignItems="stretch"
					spacing={3}
				>
					<Grid item xs={12} md={9} sm={6}>
						<Posts setCurrentId={setCurrentId} />
					</Grid>
					<Grid item xs={12} md={3} sm={6}>
						<AppBar
							className={classes.appBarSearch}
							position="static"
							color="inherit"
						>
							<TextField
								name="search"
								variant="outlined"
								label="Search Memories"
								fullWidth
								value={search}
								onChange={(e) => {
									setSearch(e.target.value);
								}}
								onKeyPress={handleKeyPress}
							/>
							<ChipInput
								style={{ margin: "10px 0" }}
								value={tags}
								onAdd={handleAdd}
								onDelete={handleDelete}
								label="Search Tags"
								variant="outlined"
							/>
							<Button
								onClick={searchPost}
								className={classes.searchButton}
								color="primary"
								variant="contained"
							>
								Search
							</Button>
						</AppBar>
						<Form currentId={currentId} setCurrentId={setCurrentId} />
						{!searchQuery && !tagsQuery && (
							<Paper className={classes.pagination} elevation={6}>
								<Paginate page={page} />
							</Paper>
						)}
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
};

export default Home;

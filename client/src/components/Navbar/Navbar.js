import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import TimeCapsuleLogo from "../../images/TimeCapsuleLogo.png";
import TimeCapsule from "../../images/TimeCapsule.png";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../constants/actionTypes";
import decode from "jwt-decode";

const Navbar = () => {
	const classes = useStyles();
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();

	const logout = () => {
		dispatch({ type: LOGOUT });
		history.push("/");
		setUser(null);
	};

	useEffect(() => {
		const token = user?.token;

		// if token expired
		if (token) {
			const decodedToken = decode(token);

			if (decodedToken.exp * 1000 < new Date().getTime()) logout();
		}

		setUser(JSON.parse(localStorage.getItem("profile")));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location]);

	return (
		<AppBar className={classes.appBar} position="static" color="inherit">
			<Link to="/" className={classes.brandContainer}>
				<img src={TimeCapsule} alt="icon" height="45px" />
				<img
					className={classes.image}
					src={TimeCapsuleLogo}
					alt="icon"
					height="50px"
				/>
			</Link>
			<Toolbar className={classes.toolbar}>
				{user ? (
					<div className={classes.profile}>
						<Avatar
							className={classes.purple}
							alt={user.result.name}
							src={user.result.picture}
						>
							{user.result.name.charAt(0)}
						</Avatar>
						<Typography className={classes.userName} variant="h6">
							{user.result.name}
						</Typography>
						<Button
							variant="contained"
							className={classes.logout}
							color="secondary"
							onClick={logout}
						>
							Logout
						</Button>
					</div>
				) : (
					<Button
						variant="contained"
						component={Link}
						to="/auth"
						color="primary"
					>
						Sign In
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;

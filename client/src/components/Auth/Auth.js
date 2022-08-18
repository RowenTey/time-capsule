import React, { useState } from "react";
import useStyles from "./styles";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { AUTH } from "../../constants/actionTypes";
import {
	Avatar,
	Container,
	Grid,
	Paper,
	Button,
	Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import { fetchGoogleResponse } from "../../utils/fetchGoogleResponse";
import { useHistory } from "react-router-dom";
import { signin, signup } from "../../actions/auth";

const initialState = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const Auth = () => {
	const classes = useStyles();
	const [showPassword, setShowPassword] = useState(false);
	const [isSignUp, setIsSignUp] = useState(false);
	const [formData, setFormData] = useState(initialState);
	const dispatch = useDispatch(false);
	const history = useHistory();

	const handleSubmit = (e) => {
		// prevent default refresh on submit
		e.preventDefault();

		if (isSignUp) {
			dispatch(signup(formData, history));
		} else {
			dispatch(signin(formData, history));
		}
	};

	// how to update specific form data
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleShowPassword = () =>
		setShowPassword((prevShowPassword) => !prevShowPassword);

	const switchMode = () => {
		setIsSignUp((prevIsSignUp) => !prevIsSignUp);
		setShowPassword(false);
	};

	const googleSuccess = async (res) => {
		const result = await fetchGoogleResponse(res);
		const token = res.credential;
		console.log("Google success result", result);

		try {
			dispatch({ type: AUTH, data: { result, token } });
			history.push("/");
		} catch (error) {
			console.log(error);
		}
	};

	const googleError = (error) => {
		console.log(error);
		console.log("Google Sign In was unsuccessful. Try again later.");
	};

	return (
		<Container component="main" maxWidth="xs">
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						{isSignUp && (
							<>
								<Input
									name="firstName"
									label="First Name"
									handleChange={handleChange}
									half
								/>
								<Input
									name="lastName"
									label="Last Name"
									handleChange={handleChange}
									half
								/>
							</>
						)}
						<Input
							name="email"
							label="Email"
							handleChange={handleChange}
							type="email"
						/>
						<Input
							name="password"
							label="Password"
							handleChange={handleChange}
							type={showPassword ? "text" : "password"}
							handleShowPassword={handleShowPassword}
						/>
						{isSignUp && (
							<Input
								name="confirmPassword"
								label="Repeat Password"
								handleChange={handleChange}
								type="password"
							/>
						)}
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							{isSignUp ? "Sign Up" : "Sign In"}
						</Button>
						{!isSignUp && (
							<Grid
								container
								justifyContent="center"
								className={classes.googleButton}
							>
								<Grid item>
									<GoogleLogin
										clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
										onSuccess={googleSuccess}
										onError={googleError}
										width="300"
										size="large"
									/>
								</Grid>
							</Grid>
						)}
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Button onClick={switchMode}>
									{isSignUp
										? "Already have an account? Sign In"
										: "Don't have an account? Sign Up"}
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
};

export default Auth;

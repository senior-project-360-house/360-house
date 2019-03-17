import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {Button, Form, FormGroup, Label, Input} from "reactstrap";

import SignInPage from "../SignIn";
import {withFirebase} from "../../server/Firebase";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";

import "../../style/signup.css";

const ERROR_CODE_ACCOUNT_EXISTS = "auth/email-already-in-use";

const ERROR_MSG_ACCOUNT_EXISTS = `
An account with this E-Mail address already exists.
Try to login with this account instead. If you think the
account is already used from one of the social logins, try
to sign-in with one of them. Afterward, associate your accounts
on your personal account page.
`;

const SignUpPage = () => (
	<div>
		<h1>Sign Up</h1>
		<SignUpFormBase />
	</div>
);

// Use to reset sign up form
const INITIAL_STATE = {
	email: "",
	firstName: "",
	lastName: "",
	passwordOne: "",
	passwordTwo: "",
	securityQuestion: "",
	answerSercurityQuestion: "",
	officeLocation: "",
	licenseNumber: "",
	gender: "",
	phonenumber: "",
	isAdmin: false,
	isClient: false,
	isAgent: false,
	error: null
};

class SignUpFormBase extends Component {
	constructor(props) {
		super(props);

		this.state = {
			...INITIAL_STATE
		};
	}

	onSubmit = event => {
		const {
			email,
			firstName,
			lastName,
			passwordOne,
			passwordTwo,
			securityQuestion,
			answerSercurityQuestion,
			officeLocation,
			licenseNumber,
			gender,
			phonenumber,
			isAdmin,
			isClient,
			isAgent,
			error
		} = this.state;

		const roles = [];

		if (isAdmin) {
			roles.push(ROLES.ADMIN);
		} else if (isAgent) {
			roles.push(ROLES.AGENT);
		} else if (isClient) {
			roles.push(ROLES.CLIENT);
		}

		this.props.firebase
			.doCreateUserWithEmailAndPassword(
				email,
				firstName,
				lastName,
				passwordOne,
				securityQuestion,
				answerSercurityQuestion
			)
			.then(authUser => {
				// Create a user in Firebase realtime database
				return this.props.firebase.user(authUser.user.uid).set({
					//Set user properties
					//username,
					email,
					firstName,
					lastName,
					passwordOne,
					securityQuestion,
					answerSercurityQuestion,
					roles
				});
			})
			.then(() => {
				//send email verification
				return this.props.firebase.doSendEmailVerification();
			})
			.then(() => {
				//Reset INITIAL_STATE and rerout to home after completed register
				this.setState({
					...INITIAL_STATE
				});
				this.props.history.push(ROUTES.HOME);
			})
			.catch(error => {
				//Check if the new Sign Up email had been use for google social Sign In
				if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
					error.message = ERROR_MSG_ACCOUNT_EXISTS;
				}

				this.setState({
					error
				});
			});

		event.preventDefault();
	};

	//Get input from user
	onChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
		console.log(this.state.firstName);
	};

	onAgentSubmit = event => {
		this.setState({
			isAgent: "true",
			isClient: "false"
		});
	};
	onClientSubmit = event => {
		this.setState({
			isAgent: "false",
			isClient: "true"
		});
	};
	oncChangeCheckbox = event => {
		this.setState({
			[event.target.name]: event.target.checked
		});
	};

	onClick = () => {
		this.props.history.push(ROUTES.SIGN_IN);
	};

	render() {
		const {
			email,
			firstName,
			lastName,
			passwordOne,
			passwordTwo,
			securityQuestion,
			answerSercurityQuestion,
			officeLocation,
			licenseNumber,
			gender,
			phonenumber,
			isAdmin,
			isClient,
			isAgent,
			error
		} = this.state;

		// Verify input from client
		const isInvalidClient =
			passwordOne !== passwordTwo ||
			passwordOne === "" ||
			email === "" ||
			firstName === "" ||
			lastName === "" ||
			securityQuestion === "" ||
			answerSercurityQuestion === "" ||
			phonenumber === "" ||
			gender === "";

		// Verify input from agent
		const isInvalidAgent =
			passwordOne !== passwordTwo ||
			passwordOne === "" ||
			email === "" ||
			firstName === "" ||
			lastName === "" ||
			securityQuestion === "" ||
			answerSercurityQuestion === "" ||
			phonenumber === "" ||
			gender === "" ||
			officeLocation === "" ||
			licenseNumber === "";

		return (
			<div className="container register">
				<div className="row">
					{/* Left Side of SignUp */}
					<div className="col-md-3 register-left">
						{/* TODO: change to group logo */}
						<img
							src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/SJSU_Seal.svg/1200px-SJSU_Seal.svg.png"
							alt=""
						/>
						<h3>Don't Have An Account!!</h3>
						<p>Quickly Sign Up and get a lot of free house of Mr. Minh</p>
						<Link to={ROUTES.SIGN_IN}>
							<input type="submit" name="" value="Login" />
						</Link>

						<br />
					</div>

					{/* Sign Up Form Here */}
					<div className="col-md-9 register-right">
						<form className="form" onSubmit={this.onSubmit}>
							<ul
								className="nav nav-tabs nav-justified"
								id="myTab"
								role="tablist"
							>
								<li className="nav-item">
									<a
										className="nav-link active"
										id="client-tab"
										data-toggle="tab"
										href="#home"
										role="tab"
										aria-controls="home"
										aria-selected="true"
										onClick={this.onClientSubmit}
									>
										Client
									</a>
								</li>
								<li className="nav-item">
									<a
										className="nav-link"
										id="agent-tab"
										data-toggle="tab"
										href="#profile"
										role="tab"
										aria-controls="profile"
										aria-selected="false"
										onClick={this.onAgentSubmit}
									>
										Agent
									</a>
								</li>
							</ul>

							<div className="tab-content" id="myTabContent">
								<div
									className="tab-pane fade show active"
									id="home"
									role="tabpanel"
									aria-labelledby="home-tab"
								>
									<h3 className="register-heading">Client Sign Up Form</h3>

									<div className="row register-form">
										<div className="col-md-6">
											<div className="form-group">
												<input
													name="firstName"
													type="text"
													className="form-control"
													placeholder="First Name *"
													value={firstName}
													onChange={this.onChange}
												/>
											</div>
											<div className="form-group">
												<input
													name="lastName"
													type="text"
													className="form-control"
													placeholder="Last Name *"
													value={lastName}
													onChange={this.onChange}
												/>
											</div>
											<div className="form-group">
												<input
													name="passwordOne"
													type="password"
													className="form-control"
													placeholder="Password *"
													value={passwordOne}
													onChange={this.onChange}
												/>
											</div>
											<div className="form-group">
												<input
													type="password"
													name="passwordTwo"
													className="form-control"
													placeholder="Confirm Password *"
													value={passwordTwo}
													onChange={this.onChange}
												/>
											</div>
											{/* TODO: set gender */}
											<div className="form-group">
												<div className="maxl">
													<Label className="radio-inline">
														<Input
															type="radio"
															name="gender"
															value="Male"
															checked={this.state.gender === "Male"}
															onChange={this.onChange}
														/>
														Male
													</Label>
													<br />
													<Label className="radio-inline">
														<Input
															type="radio"
															name="gender"
															value="Female"
															checked={this.state.gender === "Female"}
															onChange={this.onChange}
														/>
														<span>Female</span>
													</Label>
												</div>
											</div>
										</div>
										<div className="col-md-6">
											<div className="form-group">
												<input
													type="email"
													name="email"
													className="form-control"
													placeholder="Your Email *"
													value={email}
													onChange={this.onChange}
												/>
											</div>
											<div className="form-group">
												<input
													type="tel"
													name="phonenumber"
													className="form-control"
													placeholder="Your Phone *"
													value={phonenumber}
													onChange={this.onChange}
												/>
											</div>
											<div className="form-group">
												<select
													name="securityQuestion"
													className="form-control"
													value={this.state.securityQuestion}
													onChange={this.onChange}
												>
													{/* TODO: How to write selected into option */}
													<option
														value="Please select your Sequrity Question"
														className="hidden"
													>
														Please select your Sequrity Question
													</option>
													<option value="What is your Birthdate?">
														What is your Birthdate?
													</option>
													<option value="What is Your old Phone Number">
														What is Your old Phone Number?
													</option>
													<option value="What is your Pet Name?">
														What is your Pet Name?
													</option>
												</select>
											</div>
											<div className="form-group">
												<input
													name="answerSercurityQuestion"
													type="text"
													className="form-control"
													placeholder="Enter Your Answer *"
													value={answerSercurityQuestion}
													onChange={this.onChange}
												/>
											</div>
											<input
												type="submit"
												className="btnRegister"
												value="Register"
											/>
										</div>
									</div>
								</div>
								{/* Agent form start from here */}
								<div
									className="tab-pane fade show"
									id="profile"
									role="tabpanel"
									aria-labelledby="profile-tab"
								>
									<h3 className="register-heading">Agent Sign Up Form</h3>
									<div className="row register-form">
										<div className="col-md-6">
											<div className="form-group">
												<input
													type="text"
													name="firstName"
													className="form-control"
													placeholder="First Name *"
													value={firstName}
													onChange={this.onChange}
												/>
											</div>
											<div className="form-group">
												<input
													type="text"
													name="lastName"
													className="form-control"
													placeholder="Last Name *"
													value={lastName}
													onChange={this.onChange}
												/>
											</div>
											<div className="form-group">
												<input
													type="email"
													name="email"
													className="form-control"
													placeholder="Email *"
													value={email}
													onChange={this.onChange}
												/>
											</div>
											<div className="form-group">
												<input
													type="text"
													name="phonenumber"
													className="form-control"
													placeholder="Phone *"
													value={phonenumber}
													onChange={this.onChange}
												/>
											</div>
											<div className="form-group">
												<input
													type="text"
													name="officeLocation"
													className="form-control"
													placeholder="Office Location *"
													value={officeLocation}
													onChange={this.onChange}
												/>
											</div>
											<div className="form-group">
												<div className="maxl">
													<Label className="radio-inline">
														<Input
															type="radio"
															name="gender"
															value="Male"
															checked={this.state.gender === "Male"}
															onChange={this.onChange}
														/>
														Male
													</Label>
													<br />
													<Label className="radio-inline">
														<Input
															type="radio"
															name="gender"
															value="Female"
															checked={this.state.gender === "Female"}
															onChange={this.onChange}
														/>
														<span>Female</span>
													</Label>
												</div>
											</div>
										</div>
										<div className="col-md-6">
											<div className="form-group">
												<input
													type="text"
													name="licenseNumber"
													className="form-control"
													placeholder="License Number *"
													value={licenseNumber}
													onChange={this.onChange}
												/>
											</div>
											<div className="form-group">
												<input
													type="password"
													name="passwordOne"
													className="form-control"
													placeholder="Password *"
													value={passwordOne}
													onChange={this.onChange}
												/>
											</div>
											<div className="form-group">
												<input
													type="password"
													name="passwordTwo"
													className="form-control"
													placeholder="Confirm Password *"
													value={passwordTwo}
													onChange={this.onChange}
												/>
											</div>
											<div className="form-group">
												<select
													name="securityQuestion"
													className="form-control"
													value={this.state.securityQuestion}
													onChange={this.onChange}
												>
													<option className="hidden" disabled>
														Please select your Sequrity Question
													</option>
													<option value="What is your Birthdate?">
														What is your Birthdate?
													</option>
													<option value="What is Your old Phone Number">
														What is Your old Phone Number?
													</option>
													<option value="What is your Pet Name?">
														What is your Pet Name?
													</option>
												</select>
											</div>
											<div className="form-group">
												<input
													name="answerSercurityQuestion"
													type="text"
													className="form-control"
													placeholder="Enter Your Answer *"
													value={answerSercurityQuestion}
													onChange={this.onChange}
												/>
											</div>
											<input
												type="submit"
												className="btnRegister"
												value="Register"
												onClick={this.onChange}
											/>
										</div>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

const SignUpLink = () => (
	<p>
		Don 't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>{" "}
	</p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export {SignUpForm, SignUpLink};

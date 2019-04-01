import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {compose} from "recompose";
import faker from "faker";
import {withFirebase} from "../../server/Firebase";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import "../../style/signup.css";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const ERROR_CODE_ACCOUNT_EXISTS = "auth/email-already-in-use";
const ERROR_MSG_ACCOUNT_EXISTS = `
An account with this E-Mail address already exists.
Try to login with this account instead. If you think the
account is already used from one of the social logins, try
to sign-in with one of them. Afterward, associate your accounts
on your personal account page.
`;

// Use to reset sign up form
const INITIAL_STATE = {
	email: "",
	firstName: "",
	lastName: "",
	passwordOne: "",
	passwordTwo: "",
	officeLocation: "",
	licenseNumber: "",
	phonenumber: "",
	favHouses: [],
	listingHouse: [],
	avatar: faker.image.avatar(),
	isAdmin: false,
	isClient: "true",
	isAgent: "false",
	error: null
};

class SignUpFormBase extends Component {
	constructor(props) {
		super(props);
		console.log(this.props.firebase);

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
			officeLocation,
			licenseNumber,
			phonenumber,
			isAdmin,
			isClient,
			isAgent,
			favHouses,
			avatar,
			listingHouse
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
				this.state.email,
				this.state.passwordOne
			)
			.then(authUser => {
				// Create a user in Firebase realtime database

				if (isClient === "true") {
					return this.props.firebase.user(authUser.user.uid).set({
						//Set user properties

						email,
						firstName,
						lastName,
						passwordOne,
						phonenumber,
						isClient,
						avatar,
						favHouses: ["null"]

						// roles
					});
				}
				if (isAgent === "true") {
					return this.props.firebase.user(authUser.user.uid).set({
						//Set user properties
						email,
						firstName,
						lastName,
						passwordOne,
						phonenumber,
						officeLocation,
						licenseNumber,
						listingHouse: ["null"],
						avatar,
						isAgent
						// roles
					});
				}
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

	onRandomAvater = event => {
		this.setState({
			avatar: faker.image.avatar()
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
			officeLocation,
			licenseNumber,
			phonenumber
			// isAdmin,
			// isClient,
			// isAgent,
		} = this.state;

		// Verify input from client
		const isInvalidClient =
			passwordOne !== passwordTwo ||
			passwordOne === "" ||
			email === "" ||
			firstName === "" ||
			lastName === "" ||
			phonenumber === "";

		// Verify input from agent
		const isInvalidAgent =
			passwordOne !== passwordTwo ||
			passwordOne === "" ||
			email === "" ||
			firstName === "" ||
			lastName === "" ||
			phonenumber === "" ||
			officeLocation === "" ||
			licenseNumber === "";

		return (
			<div className="container register">
				<div className="row justify-content-center">
					<div className="col-md-3 register-left">
						<Image
							src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/SJSU_Seal.svg/1200px-SJSU_Seal.svg.png"
							alt=""
						/>
						<h3>Don't Have An Account!!</h3>
						<p>Quickly Sign Up and get a lot of great deal!</p>
						<p>OR Login To Your Account</p>
						<Link to={ROUTES.SIGN_IN}>
							<input type="submit" name="" value="Login" />
						</Link>
					</div>

					<div className="col-md-9 register-right">
						<Form onSubmit={this.onSubmit}>
							<div>
								<h3 className="register-heading">Sign Up Form</h3>
							</div>

							<div className="row register-form">
								<div className="col-md-12">
									<Image
										name="avatar"
										src={this.state.avatar}
										onChange={this.onChange}
										roundedCircle
									/>
									<div className="form-group role">
										<Button
											className="justify-content-center"
											as="input"
											type="button"
											value="Client"
											onClick={this.onClientSubmit}
										/>
										<Button
											className="justify-content-center"
											as="input"
											type="submit"
											value="Agent"
											onClick={this.onAgentSubmit}
										/>
									</div>
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
											name="email"
											type="email"
											className="form-control"
											value={email}
											onChange={this.onChange}
											placeholder="Email Address"
										/>
									</div>
									<div className="form-group">
										<input
											name="passwordOne"
											className="form-control"
											value={passwordOne}
											onChange={this.onChange}
											type="password"
											placeholder="Password"
										/>
									</div>
									<div className="form-group">
										<input
											name="passwordTwo"
											className="form-control"
											value={passwordTwo}
											onChange={this.onChange}
											type="password"
											placeholder="Confirm Password"
										/>
									</div>
									<div className="form-group ">
										<input
											name="phonenumber"
											type="tel"
											className="form-control"
											value={phonenumber}
											onChange={this.onChange}
											placeholder="Phone Number"
										/>
									</div>
									<div
										className={
											this.state.isAgent === "true"
												? "form-group visible"
												: "form-group invisible"
										}
									>
										<input
											type="text"
											name="officeLocation"
											className="form-control"
											placeholder="Office Location *"
											value={officeLocation}
											onChange={this.onChange}
										/>
									</div>
									<div
										className={
											this.state.isAgent === "true"
												? "form-group visible"
												: "form-group invisible"
										}
									>
										<input
											type="text"
											name="licenseNumber"
											className="form-control"
											placeholder="License Number *"
											value={licenseNumber}
											onChange={this.onChange}
										/>
									</div>
								</div>
							</div>
							<div className="form-group">
								<button
									disabled={
										this.state.isAgent === "true"
											? isInvalidAgent
											: isInvalidClient
									}
									className="btnRegister"
									type="submit"
								>
									Sign Up
								</button>

								{/* {error && <p>{error.message}</p>} */}
							</div>
						</Form>
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

const SignUpForm = compose(
	withRouter,
	withFirebase
)(SignUpFormBase);

export {SignUpForm, SignUpLink};

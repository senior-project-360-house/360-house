import React, {Component} from "react";

import {withFirebase} from '../../../server/Firebase/index';
import {DefaultLoginToggle, SocialLoginToggle} from './LoginToggle';

const SIGN_IN_METHODS = [
	{
		id: "password",
		provider: null
	},
	//If add new provider add new field
	{
		id: "google.com",
		provider: "googleProvider"
	}
];

class LoginManagementBase extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeSignInMethods: [],
			error: null
		};
	}

	componentDidMount() {
		this.fetchSignInMethods();
	}

	fetchSignInMethods = () => {
		this.props.firebase.auth
			.fetchSignInMethodsForEmail(this.props.authUser.email)
			.then(activeSignInMethods =>
				this.setState({activeSignInMethods, error: null})
			)
			.catch(error => this.setState({error}));
	};

	onSocialLoginLink = provider => {
		this.props.firebase.auth.currentUser
			.linkWithPopup(this.props.firebase[provider])
			.then(this.fetchSignInMethods)
			.catch(error => this.setState({error}));
	};

	onDefaultLoginLink = password => {
		const credential = this.props.firebase.emailAuthProvider.credential(
			this.props.authUser.email,
			password
		);
		this.props.firebase.auth.currentUser
			.linkAndRetrieveDataWithCredential(credential)
			.then(this.fetchSignInMethods)
			.catch(error => this.setState({error}));
	};

	onUnlink = providerId => {
		this.props.firebase.auth.currentUser
			.unlink(providerId)
			.then(this.fetchSignInMethods)
			.catch(error => this.setState({error}));
	};

	render() {
		const {activeSignInMethods, error} = this.state;

		return (
			<div>
				Sign In Methods:
				<ul>
					{SIGN_IN_METHODS.map(signInMethod => {
						const onlyOneLeft = activeSignInMethods.length === 1;
						const isEnabled = activeSignInMethods.includes(signInMethod.id);

						return (
							<li key={signInMethod.id}>
								{signInMethod.id === "password" ? (
									<DefaultLoginToggle
										onlyOneLeft={onlyOneLeft}
										isEnabled={isEnabled}
										signInMethod={signInMethod}
										onLink={this.onDefaultLoginLink}
										onUnlink={this.onUnlink}
									/>
								) : (
									<SocialLoginToggle
										onlyOneLeft={onlyOneLeft}
										isEnabled={isEnabled}
										signInMethod={signInMethod}
										onLink={this.onSocialLoginLink}
										onUnlink={this.onUnlink}
									/>
								)}
							</li>
						);
					})}
				</ul>
				{error && error.message}
			</div>
		);
	}
}

const LoginManagement = withFirebase(LoginManagementBase);

export default LoginManagement;

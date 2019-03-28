import React from "react";
import {SignUpForm, SignUpLink} from "./SignUpForm";
import "../../style/signup.css";

const SignUpPage = () => (
	<div
		className="signup"
		style={{padding: "50px", margin: "50px", textAlign: "center"}}
	>
		<SignUpForm />
	</div>
);
export {SignUpForm, SignUpLink};
export default SignUpPage;

import React, {Component} from "react";
// import Footer from '../Footer';
import {SignUpLink} from "../SignUp";
import {PasswordForgotLink} from "../PasswordForget";

import * as ROUTES from "../../constants/routes";

import {SignInForm, SignInGoogleForm} from "./SignInForm";

const SignInPage = () => (
	<div>
		<SignInForm />
		<SignInGoogleForm />
		<SignUpLink />
		<PasswordForgotLink />
	</div>
);
//TODO: Merge this signInformBase to SignIn/SignInForm.js
// const INITIAL_STATE = {
//   email: '',
//   password: '',
//   error: null,
// };
//
// class SignInFormBase extends Component {
//   constructor(props) {
//     super(props);
//
//     this.state = { ...INITIAL_STATE };
//   }
//
//   onSubmit = event => {
//     const { email, password } = this.state;
//
//     this.props.firebase
//       .doSignInWithEmailAndPassword(email, password)
//       .then(() => {
//         this.setState({ ...INITIAL_STATE });
//         this.props.history.push(ROUTES.HOME);
//       })
//       .catch(error => {
//         this.setState({ error });
//       });
//
//     event.preventDefault();
//   };
//
//   onChange = event => {
//     this.setState({ [event.target.name]: event.target.value });
//   };
//
//   render() {
//     const { email, password, error } = this.state;
//
//     const isInvalid = password === '' || email === '';
//
//     return (
//       <div>
// <Container className="SignIn">
//         <h2>Sign In</h2>
//         <Form className="form" onSubmit={this.onSubmit}>
//           <Col>
//             <FormGroup>
//               <Label>Email</Label>
//               <Input
//                 name="email"
//           value={email}
//           onChange={this.onChange}
//           type="text"
//           placeholder="Email Address"
//               />
//             </FormGroup>
//           </Col>
//           <Col>
//             <FormGroup>
//               <Label for="examplePassword">Password</Label>
//               <Input
//                 name="password"
//           value={password}
//           onChange={this.onChange}
//           type="password"
//           placeholder="Password"
//               />
//             </FormGroup>
//           </Col>
//           <Button variant="outline-primary" disabled={isInvalid} type="submit">
//           Sign In
//         </Button>
//         </Form>
//         <div>
//         <SignUpLink />
//       <PasswordForgotLink/>
//         </div>
//         {error && <p>{error.message}</p>}
//       </Container>
//       {/* <Footer /> */}
//       </div>
//     );
//   }
//
// }
//
// const SignInForm = compose(
//   withRouter,
//   withFirebase,
// )(SignInFormBase);

export default SignInPage;

// export { SignInForm };

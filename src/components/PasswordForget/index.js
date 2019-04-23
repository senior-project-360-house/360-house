import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Form } from "react-bootstrap";
import { withFirebase } from "../../server/Firebase/index";
import * as ROUTES from "../../constants/routes";
import './style.css';


const PasswordForgetPage = () => (
  <div className="pwfg">
    <PasswordForgetForm />
  </div >
);

const INITIAL_STATE = {
  email: "",
  error: null
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;
    const isInvalid = email === "";

    return (
      <Container className="forms">
      <Form className="target forms" style={{"width": "50%"}}onSubmit={this.onSubmit}>
        <label><p1 className="forget-header">Type in your email to reset password</p1></label>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <Button variant="primary" disabled={isInvalid} type="submit">
          Reset Password
        </Button>

        {error && <p>{error.message}</p>}
      </Form>
      </Container>
    );
  }
}

const PasswordForgotLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>
      <p>Forgot Password?</p>
    </Link>
  </p>
);

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export default PasswordForgetPage;

export { PasswordForgetForm, PasswordForgotLink };

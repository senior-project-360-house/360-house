import React, {Component} from 'react';
import {Link, withRouter } from 'react-router-dom';
import { Container, Button, Form } from "react-bootstrap";
import './style.css';
import {withFirebase} from '../../server/Firebase/index';
import * as ROUTES from '../../constants/routes';

const PasswordChangePage = () => (
  <div className="pwfg">
    <PasswordChangeForm/>
  </div>
);

const INITIAL_STATE = {
  newPassword: '',
  retypePassword: '',
  error: null
}

class PasswordChangeFormBase extends Component {
  constructor(props){
    super(props);

    this.state = {...INITIAL_STATE}
  }

  onSubmit = event => {
    const {newPassword} = this.state;

    this.props.firebase
    .doPasswordUpdate(newPassword)
    .then(() => {
      this.setState({ ...INITIAL_STATE});
      this.props.history.push(ROUTES.HOME);
    })
    .catch(error => {
      this.setState({error});
    });

    event.preventDefault();
  }

  onChange = event =>{
    this.setState({ [event.target.name]: event.target.value});
  };

  render(){
    const { newPassword, retypePassword, error} = this.state;
    const isInvalid = newPassword !== retypePassword || newPassword === '';

    return(
      <Container className="changepasswordForm">
      <h1>Update Password</h1>
      <Form className="changed-target" style={{"width": "50%"}} onSubmit={this.onSubmit}>
      <label><p1 className="forget-header">Type in your password in these two boxes below to reset password</p1></label>
      <input
      name="newPassword"
      value={newPassword}
      onChange={this.onChange}
      type="text"
      placeholder= "New Password"
      />
      <input
      name="retypePassword"
      value={retypePassword}
      onChange={this.onChange}
      type="text"
      placeholder= "Retype New Password"
      />
      <Button disabled={isInvalid} type="submit">
        Update Password
      </Button>

      {error && <p>{error.message}</p>}
      </Form>
      </Container>
    );
  }
}

const PasswordChangeLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_CHANGE}>Change Password</Link>
  </p>
);

const PasswordChangeForm = withFirebase(PasswordChangeFormBase);

export default PasswordChangePage;

export {PasswordChangeForm, PasswordChangeLink}

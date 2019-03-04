import React, {Component} from 'react';
import {Link, withRouter } from 'react-router-dom';

import {withFirebase} from '../../server/Firebase/index';
import * as ROUTES from '../../constants/routes';

const PasswordChangePage = () => (
  <div>
    <h1>Update Password</h1>
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
      <form onSubmit={this.onSubmit}>
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
      <button disabled={isInvalid} type="submit">
        Update Password
      </button>

      {error && <p>{error.message}</p>}
      </form>
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

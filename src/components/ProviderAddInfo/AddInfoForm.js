import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import {compose} from 'recompose';

import {withFirebase} from '../Firebase';
import {withAuthentication} from '../Session';

import * as SCHEMA from '../../constants/schema';
import * as ROUTES from '../../constants/routes';


const INITIAL_STATE = {
  authUser: {},
  error: null,
  isLoading: false,
}


class AddInfoFormBase extends Component{

  constructor(props) {
    super(props);

    this.state = {
      authUser: {...SCHEMA.user},
      ...INITIAL_STATE,
    }

  }

  onSubmit = event => {

    var user = this.props.firebase.auth.currentUser;
    console.log(this.state.authUser);

    user.updateProfile({
      ...this.state.authUser,

    })
    .then(() => {
      alert("Update Success");
    })
    .catch(error =>{
      alert(error);
    })
    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount() {
    this.setState({
      authUser: {
      displayName: this.props.authUser},
    })

    console.log(this.state);
  }

  render() {
    const {
      authUser,
      error,
    } = this.state;



    const isInvalid =   authUser.displayName === '' ||
    authUser.email === '' ||
    authUser.gender === '' ||
    authUser.phoneNumber === '';


    return (
      <form onSubmit={this.onSubmit}>
      <input
      name="displayName"
      onChange={this.onChange}
      value={this.props.authUser.displayName || authUser.displayName}
      type="text"
      placeholder="Full Name"
      />
      <input
      name="email"
      onChange={this.onChange}
      value={this.props.authUser.email || authUser.email}
      type="text"
      placeholder="email"
      />
      <input
      name="gender"
      onChange={this.onChange}
      type="text"
      value={authUser.gender}
      placeholder="gender"
      />
      <input
      name="phoneNumber"
      onChange={this.onChange}
      value={this.props.authUser.phoneNumber || authUser.phoneNumber}
      type="text"
      placeholder="phoneNumber"
      />
      {
        //TODO: Add component to choose Agent or Client
      }
      {
        //TODO: Add Real Avatar input
      }
      <input
      name="photoURL"
      onChange={this.onChange}
      value={this.props.authUser.photoURL || authUser.photoURL}
      type="text"
      placeholder="photoURL"
      />

      <button disabled={isInvalid} type="submit">
      Add new Information
      </button>

      {error && <p>{error.message}</p>}
      </form>
    )}
  }

  const AddInfoForm = compose(
    withAuthentication,
    withFirebase,
  )(AddInfoFormBase)

  export default AddInfoForm;

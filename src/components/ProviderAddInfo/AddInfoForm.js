import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import {compose} from 'recompose';

import {withFirebase} from '../Firebase';

import * as SCHEMA from '../../constants/schema';
import * as ROUTES from '../../constants/routes';

let socialAuthUser = null;

const INITIAL_STATE = {
  ...SCHEMA,
  error: null,
}


class AddInfoFormBase extends Component{

  constructor(props) {
    super(props);

    console.log(this.props.location.state);
    socialAuthUser = {...this.props.location.state};

    this.state = {
      ...INITIAL_STATE,
    }
  }

  onSubmit = event => {
    this.props.firebase
    .doSignInWithGoogle()
    .then(socialAuthUser => {
      return this.props.firebase
      .user(socialAuthUser.uid)
      .set({
        /*
        TODO: When finished with all the user field, change to general function [event.target.name]: event.target.value
         */
        name: this.state.name,
        email: this.state.email,
        gender: this.state.gender,
        isAgent: false,
        phoneNumber: this.state.phoneNumber,
        photoURL: this.state.photoURL,
      });
    })
    .then(() => {
      this.setState({error: null});
      this.props.history.push(ROUTES.HOME);
    })
    .catch(error => {
      this.setState({error});
    })
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount() {
    if(this.props.location.state === null){
      this.props.history.push(ROUTES.HOME);
    }
    console.log(this.props.location.state);
    socialAuthUser = {...this.props.location.state};
  }

  render() {
    const {
      displayName,
      email,
      gender,
      phoneNumber,
      photoURL,
      error,
    } = this.state;

    const isInvalid =   displayName === '' ||
      email === '' ||
      gender === '' ||
      phoneNumber === '';


    return (
      <form onSubmit={this.onSubmit}>
      <input
      name="displayName"
      value={displayName}
      onChange={this.onChange}
      defaultValue={socialAuthUser.displayName}
      type="text"
      placeholder="Full Name"
      />
      <input
      name="email"
      value={email}
      onChange={this.onChange}
      defaultValue={socialAuthUser.email}
      type="text"
      placeholder="email"
      />
      <input
      name="gender"
      value={gender}
      onChange={this.onChange}
      type="text"
      placeholder="gender"
      />
      <input
      name="phoneNumber"
      value={phoneNumber}
      onChange={this.onChange}
      defaultValue={socialAuthUser.phoneNumber}
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
      value={photoURL}
      onChange={this.onChange}
      defaultValue={socialAuthUser.photoURL}
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
    withFirebase,
    withRouter,
  )(AddInfoFormBase)

export default withRouter(AddInfoForm);

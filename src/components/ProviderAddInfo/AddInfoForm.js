import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import {compose} from 'recompose';

import {withFirebase} from '../../server/Firebase/index';
import {withAuthentication} from '../../server/Session/index';

import * as SCHEMA from '../../constants/schema';
import * as ROUTES from '../../constants/routes';


const INITIAL_STATE = {
  error: null,
  isLoading: false,
}


class AddInfoFormBase extends Component{

  constructor(props) {
    super(props);

    this.state = {
      authUser: {
        ...SCHEMA.user,
      },
      ...INITIAL_STATE,
    }

  }

  onSubmit = event => {

    this.props.firebase.doUpdateProfile({
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

  componentWillMount() {
    this.setState({

        authUser: {
      displayName: this.props.authUser.displayName ,
      email: this.props.authUser.email ,
      phoneNumber: this.props.authUser.phoneNumber ,
      gender: this.props.authUser.gender ,
      photoURL: this.props.authUser.photoURL,
    }
    });

  }
  onChange = (propertyName) => (event) => {
    const {authUser} = this.state;
    const newAuthUser = {
      ...authUser,
      [propertyName]: event.target.value
    }
    this.setState({authUser: newAuthUser});
  }

  render() {
    const {
      error,
    } = this.state;


    const isInvalid =
    this.state.authUser.displayName === '' ||
    this.state.authUser.email === '' ||
    this.state.authUser.gender === '' ||
    this.state.authUser.phoneNumber === '';


    return (
      <form onSubmit={this.onSubmit}>
      <input
      value={this.state.authUser.displayName}
      onChange={this.onChange('displayName')}
      type="text"
      placeholder="Full Name"
      />
      <input
      onChange={this.onChange('email')}
      value={this.state.authUser.email}
      type="text"
      placeholder="email"
      />
      <input
      onChange={this.onChange('gender')}
      type="text"
      value={this.state.authUser.gender}
      placeholder="gender"
      />
      <input
      onChange={this.onChange('phoneNumber')}
      value={this.state.authUser.phoneNumber}
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
      onChange={this.onChange('photoURL')}
      value={this.state.authUser.photoURL}
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

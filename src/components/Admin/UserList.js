import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import {withFirebase} from '../Firebase';

import * as ROUTES from '../../constants/routes';

class UserListBase extends Component {
  constructor(props){
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    // example of get user
    //.on method from .users trigger when users is update to re render the Admin Page
    this.props.firebase.users().on('value', userssnapshot => {
      const usersObject = userssnapshot.val();
      //Restructure object users as list
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading} = this.state;
    return (
      <div>
      <h2>Users</h2>
      {loading && <div>Loading ...</div>}
      <ul>
      {users.map(user => (
        <li key={user.uid}>
        <span>
        <strong>ID:</strong> {user.uid}
        </span>
        <span>
        <strong>E-Mail:</strong> {user.email}
        </span>
        <span>
        <strong>Username:</strong> {user.username}
        </span>
        <span>
        <Link to={`${ROUTES.ADMIN}/${user.uid}`}>
        Details
        </Link>
        </span>
        </li>
      ))}
      </ul>
      </div>
    );
  }
}

const UserItem = ({match}) => (
  <div>
    <h2>User ({match.params.id})</h2>
  </div>
);

const UserList = withFirebase(UserListBase);

export {UserItem};
export default UserList;

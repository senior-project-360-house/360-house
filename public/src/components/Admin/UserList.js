import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import {withFirebase} from '../../server/Firebase/index';

import * as ROUTES from '../../constants/routes';

class UserListBase extends Component {
  constructor(props){
    super(props);

    this.state = {
      isLoading: false,
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
    const { users, isLoading} = this.state;
    return (
      <div>
      <h2>Users</h2>
      {isLoading && <div>Loading ...</div>}
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
        {
          /*
          Link back to Admin/index.js Switch that check
          the route ADMIN_DETAILS: /admin/:id, and decide
          the route /admin or /admin/:id
          */
        }
        <Link
        to = {{

          pathname: `${ROUTES.ADMIN}/${user.uid}`,
          state: {user},

        }}
        >
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

class UserItemBase extends Component {
  constructor(props){
    super(props);

    this.state = {
      user: null,
      isLoading: false,
      ...props.location.state,
    }
  }

  componentDidMount() {
      if (this.state.user) {
      return;
    }
    this.setState({isLoading: true});
    this.props.firebase
    .user(this.props.match.params.id)
    .on('value', snapshot => {
      this.setState({
        user: snapshot.val(),
        isLoading: false,

      });
    })
  }

  componentWillUnmount() {
    this.props.firebase.user(this.props.match.params.id).off();
  }

  render() {
    const {user, isLoading} = this.state;
    return(
      <div>
      <h2>User ({this.props.match.params.id})</h2>
      {isLoading && <div>Loading ...</div>}

      {user && (
        <div>
        <span>
        <strong>ID:</strong> {user.uid}
        </span>
        <span>
        <strong>E-Mail:</strong> {user.email}
        </span>
        <span>
        <strong>Username:</strong> {user.username}
        </span>
        </div>
      )}
      </div>
    );
  }
}


const UserList = withFirebase(UserListBase);
const UserItem = withFirebase(UserItemBase);

export {UserItem,UserList};

import React from 'react';

import GoogleAddInfoForm from './AddInfoForm';
import {AuthUserContext} from '../../server/Session/index';

const GoogleAddInfoPage = () => (
  <div>
    <h1>Hello new User</h1>
    <AuthUserContext.Consumer>
      {
        authUser => (
        <GoogleAddInfoForm authUser={authUser} />
      )
      }
      </AuthUserContext.Consumer>
  </div>
);

export default GoogleAddInfoPage;

import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase/index';

//If true, tell user to verify email, instead of render the Component that passed to this higher-order component
const needsEmailVerification = authUser =>
  authUser && !authUser.emailVerified && authUser.providerData
  .map(provider => provider.providerId)
  .includes('password');


/*
protect routes from user who have not verified email address yet.
*/
const withEmailVerification = Component => {
  class WithEmailVerification extends React.Component {
    constructor(props){
      super(props);

      this.state = { isSent: false};
    }

    onSendEmailVerification = () => {
      this.props.firebase.doSendEmailVerification()
      .then(() => this.setState({isSent: true}));
    };

    render() {
      return (
        <AuthUserContext.Consumer>
        {authUser =>
          needsEmailVerification(authUser) ? (
            <div>
            {
              /*
              check if the users already sent a new email confirmation
              */
              this.state.isSent ? (
                <p>
                E-Mail confirmation sent: Check you E-Mails (Spam
                  folder included) for a confirmation E-Mail.
                  Refresh this page once you confirmed your E-Mail.
                  </p>
                ) :
                /*
                check if the user want to sent a mail confirmation
                */
                (
                  <p>
                  Verify your E-Mail: Check you E-Mails (Spam folder
                    included) for a confirmation E-Mail or send
                    another confirmation E-Mail.
                    </p>
                  )}

                  <button
                  type="button"
                  onClick={this.onSendEmailVerification}
                  disabled={this.state.isSent}>
                  Send Confirm email
                  </button>
                  </div>
                ) : (
                /*
                if no condition meet process to logged in page
                */
                <Component {...this.props} />)
              }
              </AuthUserContext.Consumer>
            );
          }
        }
        return withFirebase(WithEmailVerification);
      };

      export default withEmailVerification;

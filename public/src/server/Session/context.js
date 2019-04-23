import React from 'react';
/*
  Similar to firebase context, however, here we need firebase
  instance to do {authorization, authentication, emailVerified},
  so we return
  a class WithAuthentication that was wrap inside withFirebase.
  next time any component that need {authorization, authentication, emailVerified}
  we can wrap it
  inside {withAuthorization,withEmailVerification,withAuthentication}
  **IMPORTANT** the order of wrap is important.
 */
const AuthUserContext = React.createContext(null);

export default AuthUserContext;

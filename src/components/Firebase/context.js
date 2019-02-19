import React from 'react';
/*
  -FirebaseContext is make up of two component, FirebaseContext.Provider
  and FirebaseContext.Consumer,

  -Provider is used to creata a Firebase instance once at the
  top-level of React component tree, which is
  in the src/index.js and before the App

  -Consumer is used to retrieve firebase instance
 */
const FirebaseContext = React.createContext(null);
/*
  withFirebase(component) allow any component that got wrap by it
  to use the this.props.firebase instance
  use for any component that do not need to know about the firebase
  instance
  Ex: withFirebase(SignUpForm) can be use out side of SignUpPage
  for a PopUp without refer to the firebase consumer inside
  SignUpPage it self
 */
export const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export default FirebaseContext;

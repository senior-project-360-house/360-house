import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


const prodConfig = {
  apiKey: process.env.REACT_APP_PROD_API_KEY,
  authDomain: process.env.REACT_APP_PROD_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_PROD_DATABASE_URL,
  projectId: process.env.REACT_APP_PROD_PROJECT_ID,
  storageBucket: process.env.REACT_APP_PROD_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_PROD_MESSAGING_SENDER_ID,
};

const devConfig = {
  apiKey: process.env.REACT_APP_DEV_API_KEY,
  authDomain: process.env.REACT_APP_DEV_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DEV_DATABASE_URL,
  projectId: process.env.REACT_APP_DEV_PROJECT_ID,
  storageBucket: process.env.REACT_APP_DEV_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_DEV_MESSAGING_SENDER_ID,
};

const config =
process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

class Firebase {
  constructor() {
    app.initializeApp(config);
    //Initialize firebase authentication
    this.auth = app.auth();
    //Initialize firebase database
    this.database = app.database();
  }


  // Auth API

  //Sign Up
  doCreateUserWithEmailAndPassword = (email, password) =>
  this.auth.createUserWithEmailAndPassword(email, password);
  //Sign In
  doSignInWithEmailAndPassword = (email, password) =>
  this.auth.signInWithEmailAndPassword(email, password);
  //Sign Out
  doSignOut = () => this.auth.signOut();
  //Password Forgot
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  //Password Update
  doPasswordUpdate = password =>
  this.auth.currentUser.updatePassword(password);

  // User API
  user = uid => this.database.ref(`users/${uid}`);

  users = () => this.database.ref('users');


  /*
  Merge AUth and DB User API
  */
  onAuthUserListener = (next, fallback) =>
  this.auth.onAuthStateChanged(authUser => {
    if (authUser) {
      this.user(authUser.uid)
      .once('value')
      .then(snapshot => {
        const dbUser = snapshot.val();

        //default empty roles
        if(!dbUser.roles) {
          dbUser.roles = [];
        }

        //merge auth and db user
        authUser = {
          uid: authUser.uid,
          email: authUser.email,
          ...dbUser,
        };
        next(authUser);
      });
    } else {
      fallback();
    }
  });



}

export default Firebase;

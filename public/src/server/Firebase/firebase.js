import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import Config from './config.js';


const config = Config;

class Firebase {
    constructor() {
        app.initializeApp(config);
        //Get the Provider of user email (Google, Facebook, ...)
        this.emailAuthProvider = app.auth.EmailAuthProvider;
        //Initialize firebase authentication
        this.auth = app.auth();
        //Initialize firebase database
        this.database = app.database();
        //Initialize firebase provider
        this.googleProvider = new app.auth.GoogleAuthProvider();

        this.firestore = app.firestore();

        //firebase storage
        this.storage = app.storage();
    }


    // Auth API

    //Sign Up with Email
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);
    //Sign In with Email
    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    //Sign In with Google Account
    //Note that if use another social logins, they must be join together
    //so the account do not conflict
    doSignInWithGoogle = () =>
        this.auth.signInWithPopup(this.googleProvider);

    //Sign Out
    doSignOut = () => this.auth.signOut();
    //Password Forgot
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
    //Password Update
    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    //User's profile updateProfile
    doUpdateProfile = data => this.user(this.auth.currentUser.uid).set(data);


    //adding new house


    // User API
    user = uid => this.database.ref(`users/${uid}`);

    users = () => this.database.ref('users');

    //House API

    house = uid => this.database.ref(`houses/${uid}`);

    houses = () => this.database.ref('houses');

    //image
    imgItems = () => this.database.ref('itemImg');



    // Sign Up Email Verification

    doSendEmailVerification = () =>
        this.auth.currentUser.sendEmailVerification({ url: config.url });


    storageRef = () => this.storage.ref('images');

    /*
    Athorization and Authentication join method
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
                        if (!dbUser.roles) {
                            dbUser.roles = [];
                        }

                        //merge auth and db user
                        authUser = {
                            uid: authUser.uid,
                            email: authUser.email,
                            //Check if the user has a verified email
                            emailVerified: authUser.emailVerified,
                            providerData: authUser.providerData,
                            ...dbUser,
                        };
                        next(authUser);
                    });
            } else {
                fallback();
            }
        });
        request_view = uid => this.firestore.collection("viewRequest").doc(uid);

		request_views = () => this.firestore.collection("viewRequest");

		addRequestView = (request_data, agent_id) => {
			this.request_views()
				.add(request_data)
				.then((snapshot) => {
					this.user(agent_id).once('value').then(usersnapshot => {
						let updates = {};
                        const oldReviewList = usersnapshot.val().reviewList || [];
                        console.log(oldReviewList);
						oldReviewList.push(snapshot.id);
						updates[`users/${agent_id}`+'/reviewList'] = oldReviewList;
						this.database.ref().update(updates);
						console.log("Successfully add request view");
					});
				})
            	.catch(error => error);
		};

		getReviewList = agent_id => {
			return this.user(agent_id).once('value').then(snapshot => {
				let reviewIDList = [];
				if(snapshot.val().reviewList){
					reviewIDList = reviewIDList.concat(snapshot.val().reviewList);
                }
                console.log(reviewIDList);
                let reviewList = [];
                let promise = [];
                reviewIDList.forEach(reviewID => promise.push(this.request_view(reviewID).get()));
                return Promise.all(promise).then(snapshots => {
                    snapshots.forEach( snapshot => {
                        const obj = {
                            id: snapshot.id,
                            ...snapshot.data()
                        }
                        reviewList.push(obj);
                    });
                    return reviewList;
                })


				return reviewList;
			})
		}


}

export default Firebase;

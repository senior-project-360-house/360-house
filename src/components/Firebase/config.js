
const prodConfig = {
    apiKey: process.env.REACT_APP_PROD_API_KEY,
    authDomain: process.env.REACT_APP_PROD_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_PROD_DATABASE_URL,
    projectId: process.env.REACT_APP_PROD_PROJECT_ID,
    storageBucket: process.env.REACT_APP_PROD_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_PROD_MESSAGING_SENDER_ID,
  };
  
  const devConfig = {
    apiKey: "AIzaSyAtV9jzhijXpcVBKxvlEtt_KT9uaIcOlgo",
    authDomain: "senior-project-se-195.firebaseapp.com",
    databaseURL: "https://senior-project-se-195.firebaseio.com",
    projectId: "senior-project-se-195",
    storageBucket: "senior-project-se-195.appspot.com",
    messagingSenderId: "379525132915",
  };


const config =
process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
export default config;
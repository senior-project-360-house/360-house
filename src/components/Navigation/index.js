import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';


import { AuthUserContext } from '../Session';

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

// Navigation for Client
/* const NavigationAuthClient = () => (


  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
  <a class="navbar-brand" href="#">Team LOGO </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarText">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
      
        <a class="nav-link" href="#"> <span class="sr-only">(current)</span> <Link to={ROUTES.ACCOUNT}>Account</Link></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#"><Link to={ROUTES.LANDING}>Profile</Link></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#"><Link to={ROUTES.LANDING}>Listing</Link></a>
      </li>

    </ul>
    <ul class="navbar-nav justify-content-end">
  <li class="nav-item">
    <a class="nav-link" href="#"><SignOutButton/></a>
  </li>
</ul>
  </div>
</nav>

); */


// Navigation for User
const NavigationAuth = () => (

  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
  <a class="navbar-brand" href="#">Team LOGO </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarText">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
      
        <a class="nav-link" href="#"> <span class="sr-only">(current)</span> <Link to={ROUTES.ACCOUNT}>Account</Link></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#"><Link to={ROUTES.LANDING}>Favorite House</Link></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#"><Link to={ROUTES.LANDING}>Message</Link></a>
      </li>

    </ul>
    <ul class="navbar-nav justify-content-end">
  <li class="nav-item">
    <a class="nav-link" href="#"><SignOutButton/></a>
  </li>
</ul>
  </div>
</nav>
const NavigationAuth = ({ authUser }) => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.HOUSE}>House</Link>
    </li>
    {/*
      condition to check user roles
    */}
    {authUser.roles.includes(ROLES.CLIENT) && (
    <li>
      <Link to={ROUTES.CLIENT}>My Profile</Link>
    </li>
    )}
    {authUser.roles.includes(ROLES.AGENT) && (
    <li>
      <Link to={ROUTES.AGENT}>My Profile</Link>
    </li>
    )}
    {authUser.roles.includes(ROLES.ADMIN) && (
    <li>
      <Link to={ROUTES.ADMIN}>ADMIN</Link>
    </li>
    )}
    <li>
      <SignOutButton />
    </li>
  </ul>
// const NavigationAuth = () => (
//
//   <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
//   <a class="navbar-brand" href="#">Team LOGO </a>
//   <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
//     <span class="navbar-toggler-icon"></span>
//   </button>
//   <div class="collapse navbar-collapse" id="navbarText">
//     <ul class="navbar-nav mr-auto">
//       <li class="nav-item active">
//
//         <a class="nav-link" href="#"> <span class="sr-only">(current)</span> <Link to={ROUTES.ACCOUNT}>Account</Link></a>
//       </li>
//       <li class="nav-item">
//         <a class="nav-link" href="#"><Link to={ROUTES.LANDING}>Favorite House</Link></a>
//       </li>
//       <li class="nav-item">
//         <a class="nav-link" href="#"><Link to={ROUTES.LANDING}>Message</Link></a>
//       </li>
//
//     </ul>
//     <ul class="navbar-nav justify-content-end">
//   <li class="nav-item">
//     <a class="nav-link" href="#"> <SignOutButton/></a>
//   </li>
// </ul>
//   </div>
// </nav>


);

 

const NavigationNonAuth = () => (
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
  <a class="navbar-brand" href="#">Team LOGO</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarText">
    <ul class="navbar-nav mr-auto">
      
    </ul>
    <ul class="navbar-nav justify-content-end">
  <li class="nav-item">
    <a class="nav-link" href="#"><Link to={ROUTES.SIGN_IN}>Sign In</Link></a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#"><Link to={ROUTES.SIGN_UP}>Sign Up</Link></a>
  </li>
</ul>
  </div>
</nav>
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.HOUSE}>House</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

export default Navigation;


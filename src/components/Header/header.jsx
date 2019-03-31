import React from 'react';
// import {Link} from 'react-router'
import {Navbar, NavItem} from 'react-materialize';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { AuthUserContext } from '../../server/Session';
import { Button, Card, Row, Col } from 'react-materialize';

class Header extends React.Component{
  render(){
    return (
    <div>

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
    </div>
    )
  }
}
 export default Header;

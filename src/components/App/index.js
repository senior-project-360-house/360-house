import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import PasswordChangePage from "../PasswordChange";
//import HomePage from "../Home";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import AgentPage from "../Agent";
import ClientPage from "../Client";
import House from "../House";
import GoogleAddInfo from "../ProviderAddInfo";
import Render from "../Render";
import RenderRoom from "../Render/RenderRoom";
import Test from "../Test";
import Menu from "../Test/menu";
import Tour from "../Tour";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import Map from "../Map";
import Overview from "../Overview";

import Agent from "../Agent/AgentForm";
import AgentEditAccount from "../Agent/AgentAccount";
import AddHouse from "../Agent/AddHouse";
import Footer from "../Footer/index";
import Client from "../Client";
import SubmitForm from "../Client/ClientEdit";
import Request from "../Agent/MessageRequest";
import { withAuthentication } from "../../server/Session/index";
import ClientEdit from "../Client/ClientEdit";
import checkoutform from "../Agent/checkoutform";
import "./style.css";
import Landing from "../Landing";
const App = () => (
  <Router>
    <div>
      <div className="NavBarTop">
        <Navigation />
      </div>

      <div className="MyApp">
        <Route exact path={ROUTES.HOMEPAGE} component={Landing} />
        <Route exact path={ROUTES.LANDING} component={SignInPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />

        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
        <Route path={ROUTES.HOUSE} component={House} />
        <Route path={ROUTES.PASSWORD_CHANGE} component={PasswordChangePage} />
        <Route path={ROUTES.GOOGLEADDINFO} component={GoogleAddInfo} />
        <Route path={ROUTES.RENDER} component={Render} />
        <Route path={ROUTES.RENDERROOM} component={RenderRoom} />
        <Route path={ROUTES.TEST} component={Test} />
        <Route path={ROUTES.MENU} component={Menu} />
        <Route path={ROUTES.TOUR} component={Tour} />
        <Route path={ROUTES.MAP} component={Map} />
        <Route path={ROUTES.OVERVIEW} component={Overview} />
        <Route path={ROUTES.AGENTPROFILE} component={Agent} />
        <Route path={ROUTES.AGENTEDIT} component={AgentEditAccount} />
        <Route path={ROUTES.ADDHOUSE} component={AddHouse} />
        <Route path={ROUTES.REQUEST} component={Request} />
        <Route path={ROUTES.CLIENT} component={Client} />
        <Route path={ROUTES.CLIENTEDIT} component={ClientEdit} />
        <Route path={ROUTES.PAYMENT} component={checkoutform} />


      </div>
      <div className="MyFooter">
        <Footer />
      </div>
    </div>
  </Router>
);

export default withAuthentication(App);

import React, { Component } from "react";

/* Import Components */
import Input from "./formcomponents/Input";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Form from "react-bootstrap/Form";

// redirect
import { Redirect, Router, Route } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { withRouter } from "react-router";

//for placeholder name and email
import { withFirebase } from "../../server/Firebase/index";
import "./client.css";
import { Link } from "react-router-dom";
//import footer

const authUser = JSON.parse(localStorage.getItem("authUser"));
class SubmitForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      newUser: {
        avatar: authUser.avatar,
        email: authUser.email,
        favHouses: authUser.favHouses,
        firstName: authUser.firstName,
        isClient: authUser.isClient,
        lastName: authUser.lastName,
        passwordOne: authUser.passwordOne,
        phonenumber: authUser.phonenumber,
    }
  };

this.handleFirstName = this.handleFirstName.bind(this);
this.handleLastName = this.handleLastName.bind(this);
this.handleEmail = this.handleEmail.bind(this);
this.handleClearForm = this.handleClearForm.bind(this);
this.handleInput = this.handleInput.bind(this);
 this.handleFormSubmit = this.handleFormSubmit.bind(this);
 this.click = this.click.bind(this);
  }

  handleFirstName(e) {
      let value = e.target.value;
      this.setState( prevState => ({ newUser :
           {...prevState.newUser, firstName: value
           }
     }))
     }

     handleLastName(e) {
      let value = e.target.value;
      this.setState( prevState => ({ newUser :
           {...prevState.newUser, lastName: value
           }
         }))
     }

  handleEmail(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          email: value
        }
      }),
      () => console.log(this.state.newUser)
    );
  }

  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          [name]: value
        }
      })
    );
  }

  handlePassword(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          password: value
        }
      }),
      () => console.log(this.state.newUser)
    );
  }


  handleClearForm(e) {
    e.preventDefault();
    this.setState({
      newUser: {
        avatar: authUser.avatar,
        email: authUser.email,
        favHouses: authUser.favHouses,
        firstName: authUser.firstName,
        isClient: authUser.isClient,
        lastName: authUser.lastName,
        passwordOne: authUser.passwordOne,
        phonenumber: authUser.phonenumber,
      }
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let userData = this.state.newUser;
    this.props.firebase.doUpdateProfile(userData);
    this.click();

  }

  click(){
    alert("Your information will be updated on next time your login!")
    this.props.history.push(ROUTES.CLIENT);
  }

  componentDidMount() {
    this.state.isLoading = true;
      let newState = [];
      newState.push({
        firstName: authUser.firstName,
        lastName: authUser.lastName,
        email: authUser.email,
                });
      this.setState({newUser: newState, isLoading: false});
    }


  render() {
    const {isLoading, authUser} = this.state;
    return (
      <div className= "bg">
      {isLoading?(<h1>Loading...</h1>):(
      <div className="ClientEditProfile">
        <Form onSubmit={this.handleFormSubmit}>
          <h3 className="HeaderEdit"> Edit your account information</h3>
          <div className="EditFormClient">
            <span className="PreEditName">First Name: </span>
            <br />
            <Input inputType={'text'}
                  name= {'firstName'}
                  className="Clientform-control"
                  value={this.state.newUser[0]?this.state.newUser[0].firstName:null}
                  placeholder = {'Enter your first name'}
                  handleChange = {this.handleInput}
                  />

            <span className="PreEditName">Last Name: </span>
            <br />
            <Input
              name="lastName"
              type="text"
              className="Clientform-control"
              value={this.state.newUser[0]?this.state.newUser[0].lastName:null}
              handleChange = {this.handleInput}
            />

            <span className="PreEditName">Your Email: </span>
            <br />
            <Input
              name="email"
              type="email"
              className="Clientform-control"
              placeholder={"Enter your new password"}
              value={this.state.newUser[0]?this.state.newUser[0].email:null}
              handleChange = {this.handleInput}
            />

            <div className="ButtonEditClient">
              <ButtonToolbar className="justify-content-center">
              <Button

                variant="primary"
                onClick={this.handleFormSubmit}

              >
                Save Changes
              </Button>
                <Button
                  variant="secondary"
                  onClick = {this.handleClearForm}>Edit Infor
                </Button>
              </ButtonToolbar>
            </div>
          </div>
        </Form>
      </div>
      )}
      </div>
    );
  }
}

const buttonStyle = {
  margin: "10px 10px 10px 10px"
};

export default withFirebase(SubmitForm);

import { withFirebase } from "../../server/Firebase/index";
import React, { Component } from "react";
import { Button, Card, Image } from "semantic-ui-react";
import "./style.css";
import _ from 'lodash';
class Request extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      requests: [],
      user: {},
    }
  }
  componentDidMount = () => {
    const user = JSON.parse(localStorage.getItem('authUser'));
    this.props.firebase.getReviewList(user.uid).then(result => 
      this.setState({
        requests: result,
        user: user
      })
      );
    };
    
    
    onAllowClick = (event, value) => {
      let allowList = [];
      const request = value.value;
      const getHouseAllowList = new Promise((resolve, reject) => {
      this.props.firebase.house(request.house.id).once('value').then(snapshot => {
        const item = snapshot.val();
          if (item.allowList) {
            item.allowList.forEach(allow => allowList.push(allow));
            console.log(allowList)
          }
          resolve()
      }
      ).catch(err => reject(err))}
      );
      getHouseAllowList.then(() => {
        allowList.push(request.buyer.id);
        let updates = {};
        updates[`houses/${request.house.id}`+'/allowList'] = allowList;
        this.props.firebase.database.ref().update(updates);
        console.log("Successfully add allow view");
      });
    }
    
    
    onDeleteClick = (event, value) => {
      const reviewID = value.value.id;
      console.log(reviewID);
      this.props.firebase.user(this.state.user.uid).once('value').then(snapshot => {
        const reviewList = snapshot.val().reviewList;
        const newreviewList = _.remove(reviewList, reviewID);
        let updates = {};
        console.log(newreviewList);
        updates[`users/${this.state.user.uid}`+'/reviewList'] = newreviewList;
        this.props.firebase.database.ref().update(updates);
        console.log("Successfully delete review list");
        const newreviewstate = _.remove(this.state.requests, {id: reviewID});
        this.setState({
          request: newreviewstate,
        })
      })

    }
    render() {
      return (
        <div className="MessageRequest container">
        <div className="ListMessage">
        <Card.Group>
        {this.state.requests.map( request => { return (
          <Card id={request.id} fluid>
          <Card.Content>
          <div className="TopMessage">
    
          <Image
          className="ImageMessage"
          src="http://davidrhysthomas.co.uk/img/dexter.png"
          />
          <span className="DateMessage">3 days ago</span>
          </div>
          
          <Card.Header>
          <div className="HeaderMessage">
          <span className="NameMessage">{request.buyer.email}</span>
          </div>
          </Card.Header>
          <Card.Meta>Membership User or Non Membership User</Card.Meta>
          <Card.Description className="AMessage">
          <p>
          Hello, I would like to view morw images and 3D render of the
          house.
          <strong>Please let me see it. Thank you</strong>
          </p>
          </Card.Description>
          </Card.Content>
          <Card.Content extra>
          <div className="ListButton">
          <Button basic color="green" value={request} onClick={this.onAllowClick.bind(this)}>
          Approve
          </Button>
          <Button basic color="red" value={request} onClick={this.onDeleteClick.bind(this)}>
          Delete
          </Button>
          </div>
          </Card.Content>
          </Card>
          )})}
          
          
          
          </Card.Group>
          </div>
          </div>
          );
        }
      }
      const condition = authUser =>
      authUser && authUser.isAgent === true;
      export default withFirebase(Request);
      
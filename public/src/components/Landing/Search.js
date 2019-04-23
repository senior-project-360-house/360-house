import { withRouter } from 'react-router';
import {withFirebase} from '../../server/Firebase/index';
import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: []
    };
  }
  componentDidMount(){
    const temp = this.props.firebase.database.ref('houses');
    temp.on('value', (snapshot) => {
      let hs = snapshot.val();
      let value= [];

    for(var h in hs){
        value.push(hs[h].propertyInfor.details.address);
    }
    this.setState({
        addresses: value
      });
    });
  }

  render(){
    console.log(this.state.addresses);
    return(
      <div></div>
    );
  }
}
export default withFirebase(Search);

import {withFirebase} from '../../server/Firebase/index';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';


let saveID
class Tour extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      id: ""
    };
  }

  componentDidMount(){
    const itemsRef = this.props.firebase.database.ref('houses');
    console.log(itemsRef);
    itemsRef.on('value', (snapshot) => {

      let hs = snapshot.val();
      let newState = hs.house1.tour;
      this.setState({
        id: newState
      });
    });
  }

  render() {
    console.log(this.state.id);
    return (
      <div>
      <p>hmdfhjadhjagdajhs</p>
      <iframe style={{maxWidth: '100%'}} width={640} height={480} frameBorder={0} allowFullScreen src={this.state.id} />
      </div>
    );
  }
}

export default withFirebase(Tour);

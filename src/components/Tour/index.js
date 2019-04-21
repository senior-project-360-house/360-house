import { withFirebase } from "../../server/Firebase/index";
import React from "react";
import "./style.css";
import NavBars from "../Overview/NavBar";

class Tour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: ""
    };
  }

  componentDidMount() {
    const itemsRef = this.props.firebase.database.ref("houses");
    console.log(itemsRef);
    document.querySelector("#nav02").classList.add("activeNav");
    document.querySelector("#nav01").classList.remove("activeNav");
    document.querySelector("#nav03").classList.remove("activeNav");
    document.querySelector("#nav04").classList.remove("activeNav");
    itemsRef.on("value", snapshot => {
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
      <div className="Tour" style={{"padding-bottom":"100px"}}>
        <div className="TopBar">
          <NavBars />
        </div>
        <div className="ToolView">
          <iframe
            className="frameView"
            frameBorder={0}
            allowFullScreen
            src={this.state.id}
            title="iframe 360"
          />
          <div className="Introduction">
            Introduction:
            <p>Use your mouse and keyboard to move</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withFirebase(Tour);

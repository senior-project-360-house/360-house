import React from "react";

import FunitureList from "./FunitureList";

class DragDropFuniture extends React.Component {
  state = {
    listFunitures: []
  };
  render() {
    return (
      <div>
        <h1>Hello Drag Drop funiture</h1>
        <FunitureList />
      </div>
    );
  }
}

export default DragDropFuniture;

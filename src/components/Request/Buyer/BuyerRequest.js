import React from "react";
import { withFirebase } from "../../../server/Firebase";
import Button from "react-bootstrap/Button";

const request = {
  buyer: {
    id: "",
    email: "",
    displayName: ""
  },
  agent: {
    id: "",
    email: ""
  },
  house_id: ""
};
const RequestView = props => {
  const onClick = event => {
    const { buyer, agent, house } = props;
    let agentReviewList = []
    
      props.firebase
        .addRequestView({ buyer, agent, house }, agent.id);
  };

  return (
      <Button variant="primary" onClick={onClick}>
        Request
      </Button>
  );
};

export default withFirebase(RequestView);

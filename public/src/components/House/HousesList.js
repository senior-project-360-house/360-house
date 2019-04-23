import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withFirebase } from "../../server/Firebase/index";

import * as ROUTES from "../../constants/routes";

class HousesListBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      houses: [],
      isLoading: false
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.props.firebase.houses().on("value", snapshot => {
      const houseObject = snapshot.val();
      let newState = [];
      for (let h in houseObject) {
        newState.push({
          id: h,
          image: houseObject[h].Image,
          address: houseObject[h].address,
          agent: houseObject[h].agent,
          flyer: houseObject[h].flyer,
          propertyInfor: houseObject[h].propertyInfor
        });
      }
      this.setState({
        houses: newState
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.houses().off();
  }

  render() {
    const { houses, isLoading } = this.state;

    return (
      <div>
        {/*
        TODO: Update Loading and House List Base Visual
      */}
        {isLoading && <div>Loading ... </div>}
        {houses ? (
          <HouseItemList houses={houses} />
        ) : (
          <div>There are no houses ...</div>
        )}
      </div>
    );
  }
}
/*
TODO: Update House Item in a List Visual
 */
const HouseItemList = ({ houses }) => (
  <ul>
    {houses.map(house => (
      <HouseItem key={house.uid} house={house} />
    ))}
  </ul>
);
/*
TODO: Update Single House Item Visual
 */
const HouseItem = ({ house }) => (
  <li>
    <strong>
      {house.address.number} {house.address.street} {house.address.city}{" "}
      {house.address.zipcode}
    </strong>{" "}
    {house.flyer}
    <span>
      {/*
      Link back to House/index.js Switch that check
      the route HOUSE_DETAILS: /house/:id, and decide
      the route /houses or /house/:id
      */}
      <Link
        to={{
          pathname: `${ROUTES.HOUSE}/${house.uid}`,
          state: { house }
        }}
      >
        Details
      </Link>
    </span>
  </li>
);

const HousesList = withFirebase(HousesListBase);

export { HousesList };

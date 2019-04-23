import React, { Component } from "react";

import { withFirebase } from "../../server/Firebase/index";
// import Geocode from "react-geocode";

const INITIAL_STATE = {
  address: {
    city: "",
    lat: "",
    lng: "",
    number: "",
    street: "",
    zipcode: ""
  },
  agent: {
    name: "",
    email: "",
    license: "",
    officeAddress: "",
    phone: "",
    profilePicture: ""
  },
  propertyInfor: {
    flyer: "",
    description: "",
    details: {
      area: "",
      baths: "",
      beds: "",
      firePlace: "",
      garage: "",
      listPrice: "",
      lotSize: "",
      mls: "",
      squareFeet: "",
      schoolDistrict: "",
      year: ""
    }
  },
  reder: [],
  error: null
};

class AddHousePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE
    };
  }

  onChangeText = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onCreateHouse = event => {
    this.setState({ isLoading: true });

    this.props.firebase
      .houses()
      .push({
        name: this.state.name,
        address: this.state.address
      })
      .then(() => {
        //ROUTES to new page here
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { name, address, error } = this.state;

    return (
      <form onSubmit={this.onCreateHouse}>
        <input
          name="name"
          type="text"
          value={name}
          placeholder={"Name"}
          onChange={this.onChangeText}
        />
        <input
          name="address"
          type="text"
          value={address}
          placeholder={"Address"}
          onChange={this.onChangeText}
        />
        <button type="submit"> Send </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default withFirebase(AddHousePage);

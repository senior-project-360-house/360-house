import React, {Component} from "react";

import {withFirebase} from "../../../../server/Firebase";

import * as SCHEMA from "../../../../constants/schema";
class AddHousePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			house: {
				...SCHEMA.house
			},
			isLoading: false
		};
	}

	onSubmit = event => {
		this.props.firebase
			.houses()
			.push({
				...this.state.house
			})
			.then(() => {
				alert("Update Success");
			})
			.catch(error => {
				alert(error);
			});
		event.preventDefault();
	};

	onChange = propertyName => event => {
		const {house} = this.state;
		const newHouse = {
			...house,
			[propertyName]: event.target.value
		};
		this.setState({house: newHouse});
	};

	render() {
		const {isLoading} = this.state;
		return (
			<form onSubmit={this.onSubmit}>
				<input
					value={this.state.house.address}
					onChange={this.onChange("address")}
					type="text"
					placeholder="Address"
				/>
				{
					//TODO: Update image to upload instead of link
				}
				<input
					value={this.state.house.image}
					onChange={this.onChange("image")}
					type="text"
					placeholder="Image"
				/>

				<button type="submit">Add new House</button>
			</form>
		);
	}
}
export default withFirebase(AddHousePage);

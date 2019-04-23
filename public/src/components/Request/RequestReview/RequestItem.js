import React from "react";

const RequestItem = props => {
	const reviewItem = props.location.state.review;
  const onAllowClick = event => {
		let allowList = [];
		const getHouseAllowList = new Promise(
			this.props.firebase.house(event.reviewItem.house_id).get(snapshot => {
				if (!snapshot.data().allowList) {
					allowList.push(snapshot.data().allowList);
				}
			})
		);
		getHouseAllowList.then(() => {
			allowList.push(event.reviewItem.buyer.buyerID);
			this.props.firebase
				.house(event.reviewItem.house_id)
				.update({allowList: allowList})
				.then(() => alert("Successfully allow user to access house"));
		});
	};
	const onDeleteClick = () => {};
	return (
		<div>
			<span>
				<strong>Buyer Name:</strong> {reviewItem.data.buyer.displayName}
			</span>
			<button reviewItem={reviewItem} onClick={onAllowClick}>
				Allow
			</button>
			<button onClick={onDeleteClick}>Delete</button>
		</div>
	);
};

export default RequestItem;

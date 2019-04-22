import React, {useState, useEffect} from "react";
import {withFirebase} from "../../../server/Firebase";
import {Link} from 'react-router-dom';

import * as ROUTES from '../../../constants/routes';

const agent = JSON.parse(localStorage.getItem("authUser"));

const RequestList = props => {
	const [reviewList, setReviewList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setIsError(false);
			setIsLoading(true);
			try {
				const result = await this.props.firebase.getReviewList(agent.uid);
				setReviewList(result);
				setIsLoading(false);
			} catch (error) {
				setIsError(true);
			}
		};
		fetchData();
	}, []);

	return (
		<div>
			{isError && <div>Something went wrong ...</div>}
			{isLoading ? (
				<div>Loading ...</div>
			) : (
				<div>
					{reviewList.map(review => {
						return (
							<li key={review.id}>
								<span>
									<strong>Request ID:</strong> {review.id}
								</span>
								<Link
									to={{
										pathname: `${ROUTES.REQUEST_LIST}/${review.id}`,
										state: {review}
									}}
								>
									Details
								</Link>
							</li>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default withFirebase(RequestList);

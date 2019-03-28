import React, {Component} from "react";
import {Button} from "reactstrap";
import claraService from "./Clara";
let clara;
class Home extends Component {
	constructor(props) {
		super(props);
		this.clara = React.createRef();
		this.canvas = React.createRef();
		this.state = {uuid: "921754c6-d081-4e97-af23-178124591393", clara: clara};
	}
	componentDidUpdate() {
		let claraContainerRef = this.refs.ref1;
		clara = claraService.claraplayer(claraContainerRef);

		clara.on("loaded", function() {
			console.log("Clara player is loaded and ready");
		});
		clara.sceneIO.fetchAndUse(this.state.uuid);
	
		this.api = clara;
	}
	componentDidMount() {}

	render() {
		return (
			<div>
				<h1>Home Page</h1>
				<p> The Home Page is accessible by every user.</p>
				<div
					id="container"
					style={{width: "400px", height: "300px"}}
					ref="ref1"
				/>
				<Button
					variant="outline-light"
					type="button"
					onClick={() => {
						let id = this.api.scene.find({name: "Objects"});
						alert("this is scene id " + id);
					}}
				>
					Scence ID
				</Button>
				<Button
					variant="outline-light"
					type="button"
					onClick={() => {
						this.api.commands.activateCommand('nodeScale');
					}}
				>
					Scale
				</Button>
			</div>
		);
	}
}

export default Home;
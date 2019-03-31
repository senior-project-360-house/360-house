import React from "react";
export class ClaraPlayer extends React.Component {
	componentDidUpdate(prevProps) {
		// recaptcha has loaded via async script
		if (!prevProps.grecaptcha && this.props.grecaptcha) {
			this.props.grecaptcha.render(this._container);
		}
	}
	render() {
		return <div ref={r => (this._container = r)} />;
	}
}

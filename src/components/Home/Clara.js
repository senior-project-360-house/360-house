import makeAsyncScriptLoader from "react-async-script";
import {ClaraPlayer} from "./ClaraPlayer";

const URL = `https://clara.io/js/claraplayer.min.js`;
// the name of the global that recaptcha/api.js sets on window ie: window.grecaptcha
const claraService = {};
const ClaraLoadTimer = setInterval(() => {
	if (window.claraplayer) {
		claraService.claraplayer = window.claraplayer;
		console.log(claraService);
		clearInterval(ClaraLoadTimer);
	}
}, 100);

// Customise the Stripe object here if needed

export default claraService;
// export default makeAsyncScriptLoader(URL)(ClaraPlayer);

import makeAsyncScriptLoader from "react-async-script";
import {ClaraPlayer} from "./ClaraPlayer";
const URL = `https://clara.io/js/claraplayer.min.js`;
const claraService = {};
claraService.claraplayer = window.claraplayer;
export default claraService;

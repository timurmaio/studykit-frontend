import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap-reboot.min.css";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "./index.css";
import routes from "./routes";

ReactDOM.render(routes, document.getElementById("root"));
registerServiceWorker();

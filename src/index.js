import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap-reboot.min.css";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "./index.css";
// import routes from "./routes";
import {
  BrowserRouter,
  Routes,
  Route,
  Redirect,
  Navigate,
} from "react-router-dom";

// Containers
import App from "./containers/App";
import Courses from "./containers/Courses";
import Learning from "./containers/Learning";
import Profile from "./containers/Profile";
import SignIn from "./containers/SignIn";
import SignUp from "./containers/SignUp";

// Components
import Course from "./components/Course";
import NewCourse from "./components/NewCourse";
import ShowContent from "./components/ShowContent";
import NotFound from "./components/NotFound";

function Root() {
  return (
    <BrowserRouter>
      <StrictMode>
        <App />
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="about" element={<About />} /> */}

          <Route index element={<Navigate replace to="/courses" />} />

          {/* <Route component={App}> */}
          {/* <Redirect from="/" to="/courses" /> */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<Course />} />
          <Route
            path="/courses/:id/lectures/:lectureId/contents/:contentId"
            element={<ShowContent />}
          />

          <Route path="/learning" element={<Learning />} />
          <Route path="/teaching" element={<Profile />} />

          <Route path="*" element={<NotFound />} />

          {/*<Route path="/courses/:id/contents/new" component={NewCourse} />*/}
          {/* </Route> */}
        </Routes>
      </StrictMode>
    </BrowserRouter>
  );
}

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(<Root />);
// registerServiceWorker();

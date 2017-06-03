import React from 'react'
import { Router, Route, Redirect, browserHistory } from 'react-router'

// Containers
import App from './containers/App'
import Courses from './containers/Courses'
import Learning from './containers/Learning'
import Profile from './containers/Profile'
import SignIn from './containers/SignIn'
import SignUp from './containers/SignUp'

// Components
import Course from './components/Course'
import NewCourse from './components/NewCourse'
import ShowContent from './components/ShowContent'
import NotFound from './components/NotFound'

const routes = (
  <Router history={browserHistory}>
    <Route component={App}>
      <Redirect from="/" to="/courses" />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/profile" component={Profile} />
      <Route path="/courses" component={Courses} />
      <Route path="/learning" component={Learning} />
      <Route path="/teaching" component={Profile} />

      <Route path="/courses/:id" component={Course} />

      <Route path="*" component={NotFound} />

      <Route path="/courses/:id/contents/new" component={NewCourse} />
      <Route path="/courses/:id/contents/:contentId" component={ShowContent} />
    </Route>
  </Router>
)

export default routes

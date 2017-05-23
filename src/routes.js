import React from 'react'
import { Router, Route, browserHistory } from 'react-router'

import App from './components/App'
import Profile from './components/Profile'
import Courses from './components/Courses'
import Course from './components/Course'
import NewCourse from './components/NewCourse'
import ShowContent from './components/ShowContent'
import Authentication from './components/Authentication'
import MainLayout from './components/MainLayout'
import News from './components/News'
import NotFound from './components/NotFound'

const routes = (
  <Router history={browserHistory}>
    <Route component={MainLayout}>
      <Route component={App}>
        <Route path="/" component={Courses} />
        <Route path="/profile" component={Profile} />
        <Route path="/profile/courses/:id" component={Course} />
        <Route path="/news" component={News} />
        <Route path="/courses/:id" component={Course} />
        <Route path="/courses/:id/contents/new" component={NewCourse} />
        <Route path="/courses/:id/contents/:contentId" component={ShowContent} />
      </Route>
      <Route path="/login" component={Authentication} />
    </Route>
    <Route path="*" component={NotFound} />
  </Router>
)

export default routes

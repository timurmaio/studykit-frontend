import React from 'react';
import {Router, Route, browserHistory} from 'react-router'

import App from './components/App';
import Profile from './components/Profile';
import Courses from './components/Courses';
import Authentication from './components/Authentication';
import MainLayout from './components/MainLayout';

const routes = (
  <Router history={browserHistory}>
    <Route component={MainLayout}>
      <Route component={App}>
        <Route path="/" component={Courses}/>
        <Route path="/profile" component={Profile}/>
      </Route>
      <Route path="/login" component={Authentication}/>
    </Route>
  </Router>
);

export default routes;

import React from 'react';
import { Router, Route, browserHistory } from 'react-router'

import App from './components/App';
import Profile from './components/Profile';
import Courses from './components/Courses';

const routes = (
  <Router history={ browserHistory }>
		<Route component={ App }>
			<Route path="/" component={ Courses } />
			<Route path="/profile" component={ Profile } />
		</Route>
	</Router>
);

export default routes;

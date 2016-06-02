import React, { Component } from 'react';

import {
  Router,
  Route,
  browserHistory
} from 'react-router';

import MainPage from './views/MainPage';
import PlantPage from './views/PlantPage';
import NotFoundPage from './views/NotFoundPage';
import ExplorePage from './views/ExplorePage';
import ProjectDetailsPage from './views/ProjectDetailsPage';

export default class Routes extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={MainPage} />
        <Route path="/plant" component={PlantPage} />
        <Route path="/explore" component={ExplorePage} />
        <Route path="/projects/:projectName" component={ProjectDetailsPage} />
        <Route path="*" component={NotFoundPage} />
      </Router>
    );
  }
};

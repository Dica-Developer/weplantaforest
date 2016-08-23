import React, { Component } from 'react';

import {
  Router,
  Route,
  browserHistory
} from 'react-router';

import MainPage from './views/MainPage';
import PlantPage from './views/PlantPage';
import PlantSuccessPage from './views/PlantSuccessPage';
import NotFoundPage from './views/NotFoundPage';
import ExplorePage from './views/ExplorePage';
import ProjectDetailsPage from './project/ProjectDetailsPage';
import ProfilePage from './views/ProfilePage';
import RankingPage from './views/RankingPage';

export default class Routes extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={MainPage} />
        <Route path="/plant" component={PlantPage} />
        <Route path="/plant/succcess" component={PlantSuccessPage} />
        <Route path="/explore" component={ExplorePage} />
        <Route path="/projects/:projectName" component={ProjectDetailsPage} />
        <Route path="/user/:userName" component={ProfilePage} />
        <Route path="/ranking" component={RankingPage} />
        <Route path="*" component={NotFoundPage} />
      </Router>
    );
  }
};

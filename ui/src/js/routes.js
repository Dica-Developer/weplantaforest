import React, { Component } from 'react';

import {
  Locations,
  Location,
  NotFound
} from 'react-router-component';

import MainPage from './views/MainPage';
import PlantPage from './views/PlantPage';
import NotFoundPage from './views/NotFoundPage';
import ExplorePage from './views/ExplorePage';
import ProjectDetailsPage from './views/ProjectDetailsPage';

export default class Routes extends Component {
    render() {
        return (
            <Locations hash>
                <Location path="/" handler={MainPage} />
                <Location path="/plant" handler={PlantPage} />
                <Location path="/explore" handler={ExplorePage} />
                <Location path="/projects/:projectName" handler={ProjectDetailsPage} />
                <NotFound handler={NotFoundPage} />
            </Locations>
        );
    }
};

import React, { Component } from 'react';

import {
  Locations,
  Location,
  NotFound
} from 'react-router-component';

import MainPage from './views/MainPage';
import PlantPage from './views/PlantPage';
import NotFoundPage from './views/NotFoundPage';

export default class Routes extends Component {
    render() {
        return (
            <Locations hash>
                <Location path="/" handler={MainPage} />
                <Location path="/plant" handler={PlantPage} />
                <NotFound handler={NotFoundPage} />
            </Locations>
        );
    }
};

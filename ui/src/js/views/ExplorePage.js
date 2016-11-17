import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Projects from '../components/Projects';
import Boostrap from 'bootstrap';

export default class ExplorePage extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <Projects />
        </div>
      </div>);
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

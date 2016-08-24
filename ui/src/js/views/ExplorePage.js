import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import NavBar from '../components/NavBar';
import Footer from '../common/Footer';
import Projects from '../components/Projects';
import Boostrap from 'bootstrap';

export default class ExplorePage extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <div className="container">
          <Projects />
        </div>
        <Footer/>
      </div>);
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

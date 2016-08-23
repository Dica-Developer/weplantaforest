import React, {Component} from 'react';
import {render} from 'react-dom';
import NavBar from '../components/NavBar';
import Header from '../common/header/Header';
import Footer from '../components/Footer';
import Project from '../components/Project';
import Boostrap from 'bootstrap';

export default class ProjectDetailsPage extends Component {

  render() {
    return (
      <div>
        <NavBar/>
          <Header />
        <div className="container paddingTopBottom15">
          <Project projectName={this.props.params.projectName}/>
        </div>
        <Footer/>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

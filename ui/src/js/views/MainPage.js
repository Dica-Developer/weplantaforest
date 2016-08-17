import React, {Component} from 'react';

import NavBar from '../components/NavBar';
import Co2Bar from '../components/Co2Bar';
import ButtonBar from '../components/ButtonBar';
import Carousel from '../components/Carousel';
import Teaser from '../components/Teaser';
import Footer from '../components/Footer';

import Boostrap from 'bootstrap';

export default class MainPage extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <img className="header-image" src="/assets/images/header.png" width="100%"></img>
        <div className="container background-transparent">
          <div className="row co2ButtonDiv">
            <div className="col-md-4"><Co2Bar/></div>
            <div className="col-md-4 outline-logo">
              <img src="/assets/images/outline_logo.png" alt="selbst pflanzen" width="200" height="200"/></div>
            <div className="col-md-4"><ButtonBar/></div>
          </div>
        </div>
        <div className="container paddingTopBottom15">
          <Carousel/>
          <Teaser/>
        </div>
        <Footer/>
      </div>
    );
  }
}

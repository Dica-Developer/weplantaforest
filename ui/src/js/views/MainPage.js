import React, { Component } from 'react';

import NavBar from '../components/NavBar';
import Co2Bar from '../components/Co2Bar';
import Carousel from '../components/Carousel';
import Teaser from '../components/Teaser';
import Footer from '../components/Footer';

export default class MainPage extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <img className="header-image" src="/assets/images/header.png" width="100%"></img>
        <div className="container background-transparent">
          <Co2Bar/>
        </div>
        <div className="container paddingTop15">
          <Carousel />
          <Teaser />
        </div>
        <Footer/>
      </div>);
  }
}

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
        <div className="container">
          <Co2Bar/>
          <Carousel />
          <Teaser />
        </div>
        <Footer/>
      </div>);
  }
}

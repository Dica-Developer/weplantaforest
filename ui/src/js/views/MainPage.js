import React, {Component} from 'react';

import NavBar from '../components/NavBar';
import Header from '../common/header/Header';
import Carousel from '../components/Carousel';
import Teaser from '../components/Teaser';
import Footer from '../components/Footer';

import Boostrap from 'bootstrap';

export default class MainPage extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Header />
        <div className="container paddingTopBottom15">
          <Carousel/>
          <Teaser/>
        </div>
        <Footer/>
      </div>
    );
  }
}

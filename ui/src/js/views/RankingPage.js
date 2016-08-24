
import React, {Component} from 'react';
import {render} from 'react-dom';
import NavBar from '../components/NavBar';
import Header from '../common/header/Header';
import Footer from '../common/Footer';
import Ranking from '../components/Ranking';
import Boostrap from 'bootstrap';

export default class RankingPage extends Component {

  render() {
    return (
      <div>
        <NavBar/>
          <Header />
        <div className="container paddingTopBottom15">
          <Ranking/>
        </div>
        <Footer/>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

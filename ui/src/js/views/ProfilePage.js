import React, {Component} from 'react';
import {render} from 'react-dom';
import NavBar from '../components/NavBar';
import Header from '../common/header/Header';
import Footer from '../components/Footer';
import Profile from '../components/Profile';
import Boostrap from 'bootstrap';

export default class ProfilePage extends Component {

  render() {
    return (
      <div>
        <NavBar/>
        <Header />
        <div className="container paddingTopBottom15">
          <Profile userName={this.props.params.userName}/>
        </div>
        <Footer/>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

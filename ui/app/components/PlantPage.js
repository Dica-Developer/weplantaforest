import React, {Component} from 'react'
import NavBar from './NavBar';
import Footer from './Footer';

export default class PlantPage extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <div className="container">
          <b>Kauf was!!!</b>
        </div>
        <Footer/>
      </div>);
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */ 


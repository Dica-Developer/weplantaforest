import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../common/Footer';

export default class NotFoundPage extends Component {
  render() {
    return (<div>
            <NavBar/>
            <div className="container">
              <img width="100%" height="100%" src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Tunguska.png" />
            </div>
            <Footer/>
            </div>);
  }
}

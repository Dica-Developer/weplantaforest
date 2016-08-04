import React, {Component} from 'react';

import NavBar from '../components/NavBar';
import Co2Bar from '../components/Co2Bar';
import ButtonBar from '../components/ButtonBar';
import Carousel from '../components/Carousel';
import Teaser from '../components/Teaser';
import Footer from '../components/Footer';

export default class MainPage extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <img className="header-image" src="/assets/images/header.png" width="100%"></img>
        <div className="container background-transparent co2ButtonDiv">
          <table className="co2ButtonTable">
            <tbody>
              <tr>
                <td><Co2Bar/></td>
                <td>  <img className="outline-logo" src="/assets/images/outline_logo.png" alt="selbst pflanzen" width="200" height="200"/></td>
                <td ><ButtonBar/></td>
              </tr>
            </tbody>
          </table>

        </div>
        <div className="container paddingTop15">
          <Carousel/>
          <Teaser/>
        </div>
        <Footer/>
      </div>
    );
  }
}

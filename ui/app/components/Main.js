import axios from 'axios';
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Locations, Location, NotFound} from 'react-router-component';
import NavBar from './NavBar';

class Co2Bar extends Component {

  constructor() {
    super();
    this.state = {co2: 0, treesCount: 0.0};
  }

  componentDidMount() {
    var that = this;
    axios.get('http://localhost:8081/reports/co2').then(function(co2) {
      that.setState(co2.data);
    });
  }

  render() {
    return (<div className="row"><div className="col-md-6"><h3>{this.state.co2} <small>t CO2 gebunden</small></h3></div><div className="col-md-6"><h3>{this.state.treesCount} <small>Bäume gepflanzt</small></h3></div></div>);
  }
}

class MainPage extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <div className="container">
          <Co2Bar/>
        </div>
        <Footer/>
      </div>);
  }
}

class Footer extends Component {
  render() {
    return (
<footer id="footer" className="footer">
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <button type="button" className="btn btn-default pull-right switch-language" >Sprache ändern</button>
      </div>
    </div>
    <div className="row">
      <div className="col-md-4">
        <ul className="list-unstyled site-map">
          <li>
          <h4>Pflanzungen</h4>
          </li>
          <li>
          <a href="#">Pflanzungen</a>
          </li>
          <li>
          <a href="#">Projektflächen</a>
          </li>
          <li>
          <a href="#">Zertifikat</a>
          </li>
          <li>
          <a href="#">Gutschein</a>
          </li>
        </ul>
      </div>
      <div className="col-md-4">
        <ul className="list-unstyled site-map">
          <li>
          <h4>Bestenliste</h4>
          </li>
          <li>
          <a href="#">Alle</a>
          </li>
          <li>
          <a href="#">Privat</a>
          </li>
          <li>
          <a href="#">Firma</a>
          </li>
          <li>
          <a href="#">Non-Profit Org.</a>
          </li>
          <li>
          <a href="#">Schulen</a>
          </li>
          <li>
          <a href="#">Teams</a>
          </li>
        </ul>
      </div>
      <div className="col-md-4">
        <ul className="list-unstyled site-map">
          <li>
          <h4>Unternehmen</h4>
          </li>
          <li>
          <a href="#">Idee</a>
          </li>
          <li>
          <a href="#">Kodex</a>
          </li>
          <li>
          <a href="#">Team</a>
          </li>
          <li>
          <a href="#">Partner</a>
          </li>
          <li>
          <a href="#">Finanzen</a>
          </li>
          <li>
          <a href="#">Jobs</a>
          </li>
          <li>
          <a href="#">Presse</a>
          </li>
        </ul>
      </div>
    </div>
    <p>Copyright © 2007-2016 I Plant A Tree. All rights reserved.</p>
    </div>
    </footer>);
  }
}

class NotFoundPage extends Component {
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

class App extends Component {
  render() {
    return (
      <Locations hash>
        <Location path="/" handler={MainPage} />
        <Location path="/plant" handler={MainPage} />
        <NotFound handler={NotFoundPage} />
      </Locations>);
  }
}

render(<App />, document.getElementById('app'));

/* vim: set softtabstop=2:shiftwidth=2:expandtab */ 


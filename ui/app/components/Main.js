import axios from 'axios';
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Locations, Location, NotFound} from 'react-router-component';
import NavBar from './NavBar';
import PlantPage from './PlantPage';
import Footer from './Footer';
import Boostrap from 'bootstrap';

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
        <Location path="/plant" handler={PlantPage} />
        <NotFound handler={NotFoundPage} />
      </Locations>);
  }
}

render(<App />, document.getElementById('app'));

/* vim: set softtabstop=2:shiftwidth=2:expandtab */ 


import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';
import axios from 'axios';

import NavBar from '../common/navbar/NavBar';
import Header from '../common/header/Header';
import Footer from '../common/Footer';

require("./activationPage.less");

export default class ActivationPage extends Component {

  constructor() {
    super();
    this.state = {
      headLine: '',
      text: ''
    };
  }

  componentDidMount() {
    var that = this;
    axios.post('http://localhost:8081/user/activation' + this.props.location.search + '&language=' + localStorage.getItem('language')).then(function(response) {
      that.setState({
        headLine: 'Herzlich willkommen ' + response.data + '!',
        text: 'Wir wünschen Dir viel Spaß beim Bäume pflanzen!'
      });
    }).catch(function(response) {
      that.setState({
        headLine: response.data
      });
      if (response instanceof Error) {
        console.error('Error', response.message);
      } else {
        console.error(response.data);
        console.error(response.status);
        console.error(response.headers);
        console.error(response.config);
      }
    });
  }

  render() {
    return (
      <div>
        <NavBar ref="navbar" reRender={this.props.routes[0].reRender.bind(this)}/>
        <Header/>
        <div className="container paddingTopBottom15">
          <div className="row activationPage">
            <div className="col-md-12">
              <h2>{this.state.headLine}</h2>
              {this.state.text}
            </div>
          </div>
        </div>
      <Footer/>
    </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

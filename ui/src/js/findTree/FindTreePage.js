import React, {Component} from 'react';
import {render} from 'react-dom';
import NotificationSystem from 'react-notification-system';
import axios from 'axios';
import NavBar from '../common/navbar/NavBar';
import Footer from '../common/Footer';
import Header from '../common/header/Header';
import Boostrap from 'bootstrap';

import IconButton from '../common/components/IconButton'

require("./findTreePage.less");

export default class FindTreePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      certificateId: ''
    };
  }

  findCertificate(){
    axios.get('http://localhost:8081/certificate/search/' + this.state.certificateId).then(function(response) {
      console.log(response.data);
    }).catch(function(response) {
    if (response instanceof Error) {
      console.error('Error', response.message);
    } else {
      console.error(response.data);
      console.error(response.status);
      console.error(response.headers);
      console.error(response.config);
    }
    console.error('Payment failed');
  });
  }

  updateCertId(event){
    this.setState({certificateId: event.target.value});
  }


  render() {

    return (
      <div>
        <NavBar/>
        <Header/>
        <div className="container paddingTopBottom15">
          <div className="row findTree">
            <div className="col-md-12">
              <h2>Zertifikat finden</h2>
                Zertifikat-Nummer: <input type="text" onBlur={this.updateCertId.bind(this)}/><br/>
              <IconButton text="FINDEN" glyphIcon="glyphicon-search" onClick={this.findCertificate.bind(this)}/>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

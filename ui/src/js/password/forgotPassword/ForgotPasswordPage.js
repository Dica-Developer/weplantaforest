import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';
import axios from 'axios';

import NavBar from '../../common/navbar/NavBar';
import Header from '../../common/header/Header';
import Footer from '../../common/Footer';

import SendRequest from './SendRequest';
import RequestSent from './RequestSent';

require("./forgotPasswordPage.less");

export default class ForgotPasswordPage extends Component {

  constructor() {
    super();
    this.state = {
      isResetted: false
    };
  }
  setResetted() {
    this.setState({
      isResetted: true
    });
  }

  render() {
    var content;
    if (this.state.isResetted) {
      content = <RequestSent/>
    } else {
      content = <SendRequest setResetted={this.setResetted.bind(this)}/>
    }
    return (
      <div>
        <NavBar ref="navBar"/>
        <Header/>
        <div className="container paddingTopBottom15">
          <div className="row forgotPasswordPage">
            {content}
          </div>
        </div>
      <Footer/>
    </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

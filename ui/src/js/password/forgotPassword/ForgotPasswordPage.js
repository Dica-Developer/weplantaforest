import React, { Component } from 'react';
import RequestSent from './RequestSent';
import SendRequest from './SendRequest';

require('./forgotPasswordPage.less');

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
      content = <RequestSent />;
    } else {
      content = <SendRequest setResetted={this.setResetted.bind(this)} />;
    }
    return (
      <div className="container paddingTopBottom15">
        <div className="row forgotPasswordPage">{content}</div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

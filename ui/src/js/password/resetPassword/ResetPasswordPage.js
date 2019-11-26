import React, { Component } from 'react';
import RequestSent from './RequestSent';
import SendRequest from './SendRequest';


require('./resetPasswordPage.less');

export default class ResetPasswordPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isResetted: false
    };
  }
  setResetted() {
    this.setState({
      isResetted: true
    });
    this.props.route.showLoginSlide();
  }

  render() {
    var content;
    if (this.state.isResetted) {
      content = <RequestSent/>;
    } else {
      content = <SendRequest search={this.props.location.search} setResetted={this.setResetted.bind(this)}/>;
    }
    return (
      <div className="container paddingTopBottom15">
        <div className="row resetPasswordPage">
          {content}
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

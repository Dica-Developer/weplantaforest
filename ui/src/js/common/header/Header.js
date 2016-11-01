import React, {Component} from 'react';
import Boostrap from 'bootstrap';
import {browserHistory} from 'react-router';

import Co2Bar from './Co2Bar';
import ButtonBar from './ButtonBar';

export default class Header extends Component {

  switchToHomePage() {
    browserHistory.push("/");
  }

  render() {
    return (
      <div className="container header">
        <div className="row">
          <div className="col-md-4"><Co2Bar/></div>
          <div className="col-md-4 outline-logo">
            <a role="button" onClick={this.switchToHomePage.bind(this)}>
              <img src="/assets/images/outline_logo.png" alt="selbst pflanzen" width="150" height="150"/>
            </a>
          </div>
          <div className="col-md-4"><ButtonBar/></div>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

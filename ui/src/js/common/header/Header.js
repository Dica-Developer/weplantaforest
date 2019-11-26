import React, {Component} from 'react';
import {browserHistory} from 'react-router';

import Co2Bar from './Co2Bar';
import ButtonBar from './ButtonBar';

export default class Header extends Component {

  switchToHomePage() {
    browserHistory.push('/');
  }

  loadCo2Data() {
    this.refs['co2-data'].loadCo2Data();
  }

  render() {
    return (
      <div className="container header">
        <div className="row">
          <div className="col-md-4"><Co2Bar ref="co2-data"/></div>
          <div className="col-md-4 outline-logo">
            <a role="button" onClick={this.switchToHomePage.bind(this)}>
              <img src="/assets/images/ipatlogo.svg" alt="selbst pflanzen" width="160" height="160"/>
            </a>
          </div>
          <div className="col-md-4"><ButtonBar /></div>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

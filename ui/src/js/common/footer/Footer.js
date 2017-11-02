import React, {Component} from 'react';
import {browserHistory} from 'react-router';

require("./footer.less");

export default class Footer extends Component {

  linkTo(url) {
    browserHistory.push(url);
  }

  render() {
    return (
      <div className="row footer">
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <a role="button" onClick={() => {
                this.linkTo('/aboutUs')
              }}>
                ÜBER UNS
              </a>
            </div>
            <div className="col-md-2">
              <a role="button" onClick={() => {
                this.linkTo('/privacy')
              }}>
                DATENSCHUTZ
              </a>
            </div>
            <div className="col-md-2">
              <a role="button" onClick={() => {
                this.linkTo('/terms')
              }}>
                AGB
              </a>
            </div>
            <div className="col-md-2">
              <a role="button" onClick={() => {
                this.linkTo('/imprint')
              }}>
                IMPRESSUM
              </a>
            </div>
            <div className="col-md-2">
              <a role="button" onClick={() => {
                this.linkTo('/kontakt')
              }}>
                KONTAKT
              </a>
            </div>
            <div className="col-md-2">
              <a role="button" onClick={() => {
                this.linkTo('/social')
              }}>
                SOCIAL
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
} / * vim : set softtabstop = 2 : shiftwidth = 2 : expandtab * /

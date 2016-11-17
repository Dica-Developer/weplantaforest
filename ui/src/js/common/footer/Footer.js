import React, {Component} from 'react';
import {browserHistory} from 'react-router';

require("./footer.less");

export default class Footer extends Component {

  linkTo(url) {
    browserHistory.push(url);
  }

  render() {
    return (
      <div className='row footer'>
        <div className='container '>
          <div className="col-md-4">
            <div className="row">
              <div className="col-md-4">
                <a role="button" onClick={() => {
                  this.linkTo('/helpUs')
                }}>
                  HILF UNS
                </a>
              </div>
              <div className="col-md-4">
                <a role="button" onClick={() => {
                  this.linkTo('/links')
                }}>
                  LINKS
                </a>
              </div>
              <div className="col-md-4">
                <a role="button" onClick={() => {
                  this.linkTo('/disclaimer')
                }}>
                  AGB
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="row">
              <div className="col-md-4">
                <a role="button" onClick={() => {
                  this.linkTo('/imprint')
                }}>
                  IMPRESSUM
                </a>
              </div>
              <div className="col-md-4">
                <a role="button" onClick={() => {
                  this.linkTo('/')
                }}>
                  KONTAKT
                </a>
              </div>
              <div className="col-md-4">
                <a role="button" onClick={() => {
                  this.linkTo('/')
                }}>
                  SITEMAP
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <p className="copyRight">Copyright © 2007-2016 I Plant A Tree. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </div>
    );
  }
} / * vim : set softtabstop = 2 : shiftwidth = 2 : expandtab * /

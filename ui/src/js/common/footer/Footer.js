import React, {Component} from 'react';
import {browserHistory} from 'react-router';

import Translate from 'react-translate-component';
import counterpart from 'counterpart';

require('./footer.less');

export default class Footer extends Component {

  linkTo(url) {
    browserHistory.push(url);
  }

  render() {
    return (
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <a role="button" onClick={() => {
                this.linkTo('/aboutUs');
              }}>
              {counterpart.translate('FOOTER.ABOUT_US')}
              </a>
              <a role="button" onClick={() => {
                this.linkTo('/faq');
              }}>
                {counterpart.translate('FOOTER.FAQ')}
              </a>
            </div>
            <div className="col-md-2">
              <a role="button" onClick={() => {
                this.linkTo('/partner');
              }}>
                {counterpart.translate('FOOTER.PARTNER')}
              </a>
              <a role="button" onClick={() => {
                this.linkTo('/awards');
              }}>
              {counterpart.translate('FOOTER.AWARDS')}
              </a>
            </div>
            <div className="col-md-2">
              <a role="button" onClick={() => {
                this.linkTo('/blog');
              }}>
              {counterpart.translate('FOOTER.BLOG')}
              </a>
              <a role="button" onClick={() => {
                this.linkTo('/social');
              }}>
              {counterpart.translate('FOOTER.SOCIAL')}
              </a>
            </div>
            <div className="col-md-2">
              <a role="button" onClick={() => {
                this.linkTo('/statistics');
              }}>
              {counterpart.translate('FOOTER.FACTS_FIGURES')}
              </a>
              <a role="button" onClick={() => {
                this.linkTo('/financials');
              }}>
              {counterpart.translate('FOOTER.FINANCE')}
              </a>
            </div>
            <div className="col-md-2">
              <a role="button" onClick={() => {
                this.linkTo('/privacy');
              }}>
              {counterpart.translate('FOOTER.DATA_PROTECTION')}
              </a>
              <a role="button" onClick={() => {
                this.linkTo('/terms');
              }}>
              {counterpart.translate('FOOTER.TERMS_CONDITIONS')}
              </a>
            </div>
            <div className="col-md-2">
              <a role="button" onClick={() => {
                this.linkTo('/contact');
              }}>
              {counterpart.translate('FOOTER.CONTACT')}
              </a>
              <a role="button" onClick={() => {
                this.linkTo('/imprint');
              }}>
              {counterpart.translate('FOOTER.IMPRINT')}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/* vim : set softtabstop = 2 : shiftwidth = 2 : expandtab */


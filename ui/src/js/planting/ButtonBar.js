import counterpart from 'counterpart';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';

require('./buttonBar.less');

export default class ButtonBar extends Component {

  constructor() {
    super();
  }

  switchToCustomPlantPage() {
    if (JSON.parse(localStorage.getItem('isGift'))) {
      browserHistory.push('/plantGift2');
    } else {
      browserHistory.push('/plant3');
    }
  }

  switchToProposalPage(amount) {
    if (JSON.parse(localStorage.getItem('isGift'))) {
      browserHistory.push('/plantGift/' + amount);
    } else {
      browserHistory.push('/plant/' + amount);
    }
  }

  render() {
    return (
      <div className="buttonBar">
        {counterpart.translate('PLANT_ONLINE_TEXT')}<br/>
        <div className={'buttonDiv ' + (this.props.chosen == '1'
          ? 'chosen'
          : '')}>
          <a role="button" onClick={() => {
            this.switchToProposalPage('1');
          }}>
            1 {counterpart.translate('TREE')}
          </a>
        </div>
        <div className={'buttonDiv ' + (this.props.chosen == '5'
          ? 'chosen'
          : '')}>
          <a role="button" onClick={() => {
            this.switchToProposalPage('5');
          }}>
            5 {counterpart.translate('TREES')}
          </a>
        </div>
        <div className={'buttonDiv ' + (this.props.chosen == '10'
          ? 'chosen'
          : '')}>
          <a role="button" onClick={() => {
            this.switchToProposalPage('10');
          }}>
            10 {counterpart.translate('TREES')}
          </a>
        </div>
        <div className={'buttonDiv ' + (this.props.chosen == '50'
          ? 'chosen'
          : '')}>
          <a role="button" onClick={() => {
            this.switchToProposalPage('50');
          }}>
            50 {counterpart.translate('TREES')}
          </a>
        </div>
        <div className={'buttonDiv ' + (this.props.chosen == '100'
          ? 'chosen'
          : '')}>
          <a role="button" onClick={() => {
            this.switchToProposalPage('100');
          }}>
            100 {counterpart.translate('TREES')}
          </a>
        </div>
        <div className={'buttonDiv ' + (this.props.chosen == 'custom'
          ? 'chosen'
          : '')}>
          <a role="button" onClick={this.switchToCustomPlantPage.bind(this)}>
            {counterpart.translate('CUSTOM')}
          </a>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

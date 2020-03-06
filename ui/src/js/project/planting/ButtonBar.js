import counterpart from 'counterpart';
import React, { Component } from 'react';

require('./buttonBar.less');

export default class ButtonBar extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="buttonBar">
        {counterpart.translate('PLANT_ONLINE_TEXT')}
        <br />
        <div className={'buttonDiv ' + (this.props.chosen == 1 ? 'chosen' : '')}>
          <a
            role="button"
            onClick={() => {
              this.props.setAmount(1);
            }}
          >
            1 {counterpart.translate('TREE')}
          </a>
        </div>
        <div className={'buttonDiv ' + (this.props.chosen == 5 ? 'chosen' : '')}>
          <a
            role="button"
            onClick={() => {
              this.props.setAmount(5);
            }}
          >
            5 {counterpart.translate('TREES')}
          </a>
        </div>
        <div className={'buttonDiv ' + (this.props.chosen == 10 ? 'chosen' : '')}>
          <a
            role="button"
            onClick={() => {
              this.props.setAmount(10);
            }}
          >
            10 {counterpart.translate('TREES')}
          </a>
        </div>
        <div className={'buttonDiv ' + (this.props.chosen == 50 ? 'chosen' : '')}>
          <a
            role="button"
            onClick={() => {
              this.props.setAmount(50);
            }}
          >
            50 {counterpart.translate('TREES')}
          </a>
        </div>
        <div className={'buttonDiv ' + (this.props.chosen == 100 ? 'chosen' : '')}>
          <a
            role="button"
            onClick={() => {
              this.props.setAmount(100);
            }}
          >
            100 {counterpart.translate('TREES')}
          </a>
        </div>
        <div className={'buttonDiv ' + (this.props.chosen == 'custom' ? 'chosen' : '')}>
          <a
            role="button"
            onClick={() => {
              this.props.setAmount('custom');
            }}
          >
            {counterpart.translate('CUSTOM')}
          </a>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

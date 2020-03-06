import Accounting from 'accounting';
import axios from 'axios';
import counterpart from 'counterpart';
import React, { Component } from 'react';

export default class Co2Bar extends Component {
  constructor() {
    super();
    this.state = {
      co2: 0.0,
      treesCount: 0
    };
  }

  componentDidMount() {
    this.loadCo2Data();
  }

  loadCo2Data() {
    var that = this;
    axios.get('http://localhost:8081/reports/co2').then(function(co2) {
      that.setState(co2.data);
    });
  }

  render() {
    return (
      <div>
        <div className="tree-chars">{counterpart.translate('PLANTED_TREES')}</div>
        <div className="tree-number">{this.state.treesCount ? this.state.treesCount.toLocaleString() : '0'}</div>
        <br />
        <div
          className="co2-chars"
          dangerouslySetInnerHTML={{
            __html: counterpart.translate('CO2_BOUND')
          }}
        ></div>
        <div className="co2-number">{Accounting.formatNumber(this.state.co2, 0, '.', ',')}</div>
      </div>
    );
  }
}

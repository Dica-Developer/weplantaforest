import React, {Component} from 'react';
import axios from 'axios';
import Accounting from 'accounting';

import Translate from 'react-translate-component';
import counterpart from 'counterpart';

export default class Co2Bar extends Component {

  constructor() {
    super();
    this.state = {
      co2: 0.0,
      treesCount: 0
    };
  }

  componentDidMount() {
    var that = this;
    axios.get('http://localhost:8081/reports/co2').then(function(co2) {
      that.setState(co2.data);
    });
  }

  render() {
    return (
      <div>
        <div className="tree-chars">{counterpart.translate('PLANTED_TREES')}</div>
        <div className="tree-number">{this.state.treesCount.toLocaleString()}</div>
        <br/>
        <div className="co2-chars">{counterpart.translate('CO2_BOUND')}</div>
        <div className="co2-number">{Accounting.formatNumber(this.state.co2, 0, '.', ',')}</div>
      </div>
    );
  }
}

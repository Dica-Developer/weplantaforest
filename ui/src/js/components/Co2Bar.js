import React, { Component } from 'react';
import axios from 'axios';

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
      <div className="row">
        <div className="co2-header-chars">gepflanzte Bäume</div>
        <div className="co2-header-number">{this.state.co2.toLocaleString()}</div>
        <br />
        <div className="co2-header-chars">CO2 gebunden / Tonnen</div>
        <div className="co2-header-number">{this.state.treesCount.toLocaleString()}</div>
      </div>);
  }
}

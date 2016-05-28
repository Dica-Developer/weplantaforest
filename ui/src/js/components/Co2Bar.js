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
    return (<div className="row"><div className="col-md-6"><h3>{this.state.co2.toLocaleString()} <small>t CO2 gebunden</small></h3></div><div className="col-md-6"><h3>{this.state.treesCount.toLocaleString()} <small>Bäume gepflanzt</small></h3></div></div>);
  }
}

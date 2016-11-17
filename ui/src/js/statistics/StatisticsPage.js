import React, {Component} from 'react';
import {render} from 'react-dom';
import Boostrap from 'bootstrap';
import axios from 'axios';
import moment from 'moment';

import {Bar, Line} from 'react-chartjs';

import TreesPerMonth from './TreesPerMonth';
import TreesPerYear from './TreesPerYear';
import TreesPerOrgType from './TreesPerOrgType';
import Co2PerYear from './Co2PerYear';

require("./statisticsPage.less");

export default class StatisticsPage extends Component {

  constructor() {
    super();
    this.state = {}
  }

  render() {
    return (
      <div className="container paddingTopBottom15">
        <div className="statisticsPage">
          <div className="row">
            <div className="col-md-12">
              <h2>Statistiken</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h4>Gepflanzte Bäume</h4>
            </div>
          </div>
          <TreesPerYear/>
          <div className="row">
            <div className="col-md-12">
              <h4>Gebundenes CO<sub>2</sub></h4>
            </div>
          </div>
          <Co2PerYear/>
          <div className="row">
            <div className="col-md-12">
              <h4>Gepflanzte Bäume pro Spendertyp</h4>
            </div>
          </div>
          <TreesPerOrgType/>
            <div className="row">
              <div className="col-md-12">
                <h4>Gepflanzte Bäume pro Monat</h4>
              </div>
            </div>
          <TreesPerMonth/>

        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

import React, {Component} from 'react';
import {render} from 'react-dom';
import Boostrap from 'bootstrap';
import axios from 'axios';

import {Bar, Line} from 'react-chartjs';

import TreesPerMonth from './TreesPerMonth';
import TreesPerYear from './TreesPerYear';
import TreesPerOrgType from './TreesPerOrgType';
import Co2PerYear from './Co2PerYear';

import Translate from 'react-translate-component';
import counterpart from 'counterpart';

require('./statisticsPage.less');

export default class StatisticsPage extends Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="container paddingTopBottom15">
        <div className="statisticsPage">
          <div className="row">
            <div className="col-md-12">
              <h1>{counterpart.translate('FACTS_FIGURES')}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h2>{counterpart.translate('PLANTED_TREES')}</h2>
            </div>
          </div>
          <TreesPerYear/>
          <div className="row">
            <div className="col-md-12">
              <h2 dangerouslySetInnerHTML={{
                __html: counterpart.translate('CO2_BOUND')
              }}></h2>
            </div>
          </div>
          <Co2PerYear/>
          <div className="row">
            <div className="col-md-12">
              <h2>{counterpart.translate('TREESPLANTED_PERDONORTYPE')}</h2>
            </div>
          </div>
          <TreesPerOrgType/>
            <div className="row">
              <div className="col-md-12">
                <h2>{counterpart.translate('TREESPLANTED_PERMONTH')}</h2>
              </div>
            </div>
          <TreesPerMonth/>

        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

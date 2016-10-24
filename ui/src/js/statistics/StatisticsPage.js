import React, {Component} from 'react';
import {render} from 'react-dom';
import Boostrap from 'bootstrap';
import axios from 'axios';
import moment from 'moment';

import {Bar, Line} from 'react-chartjs';

import NavBar from '../common/navbar/NavBar';
import Header from '../common/header/Header';
import Footer from '../common/Footer';

import TreesPerMonth from './TreesPerMonth';
import TreesPerYear from './TreesPerYear';
import TreesPerOrgType from './TreesPerOrgType';
import Co2PerYear from './Co2PerYear';

require("./statisticsPage.less");

export default class StatisticsPage extends Component {

  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    return (
      <div className="container paddingTopBottom15">
        <div className="row statisticsPage">
          <div className="col-md-12">
            <h2>Statistiken</h2>
            <TreesPerYear />
            <TreesPerOrgType />
            <TreesPerMonth />
            <Co2PerYear />
          </div>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

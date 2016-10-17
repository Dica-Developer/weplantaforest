import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';
import axios from 'axios';
import moment from 'moment';

import {
  Bar
} from 'react-chartjs';

import NavBar from '../common/navbar/NavBar';
import Header from '../common/header/Header';
import Footer from '../common/Footer';

require("./statisticsPage.less");

export default class StatisticsPage extends Component {

  constructor() {
    super();
    this.state = {
      statistics: [],
      amountOfTrees: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      year: new Date().getFullYear(),
      years: []
    }
  }

  componentDidMount() {
    this.updateChartForYear();
    this.getAllYearFrom2007();
  }

  updateChartForYear() {
    var that = this;
    axios.get('http://localhost:8081/statistic/trees?year=' + this.state.year).then(function(response) {
      var result = response.data;
      that.setState({
        statistics: result
      });
      for (var month in result) {
        that.state.amountOfTrees[month] = result[month].amount;
      }
      if(result.length < 12){
        var diffTo12 = 12 - result.length;
        for(var diffTo12; diffTo12 > 0; diffTo12--){
          that.state.amountOfTrees[12 - diffTo12] = 0;
        }
      }
      that.forceUpdate();
      that.refs["barChart"].update();
    }).catch(function(response) {
      if (response instanceof Error) {
        console.error('Error', response.message);
      } else {
        console.error(response.data);
        console.error(response.status);
        console.error(response.headers);
        console.error(response.config);
      }
    });
  }

  getAllYearFrom2007() {
    var amountOfYearsTill2007 = moment().diff('2007-01-01', 'years') + 1;
    for (var year = 0; year < amountOfYearsTill2007; year++) {
      this.state.years.push(2007 + parseInt(year));
    }
  }

  updateYear(event) {
    this.state.year = event.target.value;
    this.forceUpdate();
    this.updateChartForYear();
  }

  render() {
    var chartData = {
      labels: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
      datasets: [{
        label: 'gepflanzte Bäume',
        data: this.state.amountOfTrees,
        fillColor: "rgb(130, 171, 31)",
        borderWidth: 1
      }]
    };
    var options = {

    };
    var that = this;
    return (

      <div>
        <NavBar ref="navbar" reRender={this.props.routes[0].reRender.bind(this)}/>
        <Header/>
        <div className="container paddingTopBottom15">
          <div className="row statisticsPage">
            <div className="col-md-12">
              <h2>Statistiken</h2>
              <div className="tree-chart">
                <h4>gepflanzte Bäume pro Monat</h4>
                Jahr:&nbsp;<select ref="year" onChange={this.updateYear.bind(this)} >
                  {this.state.years.map(function(year, i) {
                    if(i + 1 == that.state.years.length){
                      return ( <option key={i} value={year} selected>{year}</option>);
                    }else{
                      return ( <option key={i} value={year}>{year}</option>);
                    }
                  })}
                </select>
                <br/>
                <Bar ref="barChart" data={chartData} options={options}/>
              </div>
            </div>
          </div>
        </div>
      <Footer/>
    </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

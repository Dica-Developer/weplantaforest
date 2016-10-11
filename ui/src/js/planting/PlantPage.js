import React, {Component} from 'react';
import {render} from 'react-dom';
import Boostrap from 'bootstrap';
import axios from 'axios';
import Accounting from 'accounting';
import {Link, browserHistory} from 'react-router';

import NavBar from '../common/navbar/NavBar';
import Header from '../common/header/Header';
import Footer from '../common/Footer';

import MainSlider from './MainSlider';
import ProjectSlider from './ProjectSlider';
import ImageButton from '../common/components/ImageButton';
import IconButton from '../common/components/IconButton';

require("./plantPage.less");

export default class PlantPage extends Component {

  constructor() {
    super();
    this.state = {
      treeCount: 5,
      projects: []
    };
    this.balanceProjectSlidersFromProjectSlider = this.balanceProjectSlidersFromProjectSlider.bind(this);
  }

  componentDidMount() {
    this.setState({isGift: this.props.route.isGift, isAbo: this.props.route.isAbo})
    var that = this;
    axios.get('http://localhost:8081/reports/activeProjects').then(function(response) {
      var result = response.data;
      that.setState({projects: result, treeCount: 10});
      that.refs["mainSlider"].setMainSliderValue(10);
      that.forceUpdate();
      axios.get('http://localhost:8081/simplePlantProposalForTrees/' + 10).then(function(response) {
        var result = response.data;
        for (var plantItem in result.plantItems) {
          for (var project in that.state.projects) {
            if (that.state.projects[project].projectName == result.plantItems[plantItem].projectName) {
                that.refs["project_" + project].setSliderValue(that.refs["project_" + project].getSliderValue() + result.plantItems[plantItem].amount, false);
              for (var article in that.refs["project_" + project].getArticles()) {
                if (that.refs["project_" + project].getArticles()[article].treeType.name == result.plantItems[plantItem].treeType) {
                  that.refs["project_" + project].setArticleValue(article, result.plantItems[plantItem].amount);
                }
              }
            }
          }
        }
      });
    });

  }

  updatePlantBag() {}

  balanceProjectSlidersFromMain(value) {
    var divisionValue = Math.trunc(value / this.state.projects.length);
    var moduloValue = value % this.state.projects.length;
    var moduloCnt = 0;
    for (var project in this.state.projects) {
      this.refs["project_" + project].updateMaxValue(value);
      if (moduloCnt < moduloValue) {
        this.refs["project_" + project].setSliderValue(divisionValue + 1, false);
        moduloCnt++;
      } else {
        this.refs["project_" + project].setSliderValue(divisionValue, false);
      }
    }
    this.setState({treeCount: value});
  }

  balanceProjectSlidersFromProjectSlider(sliderIndex, value) {
    var that = this;
    var movedCntAndSum = this.getMovedCntAndSum();
    if (movedCntAndSum[0] == this.state.projects.length) {
      var manualMovedSliderValueWithMaxValue = this.getManualMovedSliderValueWithMaxValueExceptCurrent(sliderIndex);
      var diffToTreeCount = movedCntAndSum[1] - this.state.treeCount;

      var valueToSet = this.refs["project_" + manualMovedSliderValueWithMaxValue].getSliderValue() - diffToTreeCount;
      this.refs["project_" + manualMovedSliderValueWithMaxValue].setSliderValue(valueToSet, true);

      var divisionValue = Math.trunc((this.state.treeCount - (parseInt(valueToSet) + parseInt(value))) / ((movedCntAndSum[0] - 2)));
      var moduloValue = (this.state.treeCount - (parseInt(valueToSet) + parseInt(value))) % (movedCntAndSum[0] - 2);
      var moduloCnt = 0;
      for (var project in this.state.projects) {
        if (project != manualMovedSliderValueWithMaxValue && project != sliderIndex) {
          if (moduloCnt < moduloValue) {
            this.refs["project_" + project].setSliderValue(divisionValue + 1, true);
            moduloCnt++;
          } else {
            this.refs["project_" + project].setSliderValue(divisionValue, true);
          }
        }
      }
    } else if (movedCntAndSum[1] > this.state.treeCount) {
      var manualMovedSliderValueWithMaxValue = this.getManualMovedSliderValueWithMaxValueExceptCurrent(sliderIndex);
      var diffToTreeCount = movedCntAndSum[1] - this.state.treeCount;
      var valueToSet = this.refs["project_" + manualMovedSliderValueWithMaxValue].getSliderValue() - diffToTreeCount;
      this.refs["project_" + manualMovedSliderValueWithMaxValue].setSliderValue(valueToSet, true);

      if (movedCntAndSum[0] > 2) {
        var divisionValue = Math.trunc((this.state.treeCount - (parseInt(valueToSet) + parseInt(value))) / ((movedCntAndSum[0] - 2)));
        var moduloValue = (this.state.treeCount - (parseInt(valueToSet) + parseInt(value))) % (movedCntAndSum[0] - 2);
        var moduloCnt = 0;
        for (var project in this.state.projects) {
          if (this.refs["project_" + project].wasMovedManually() && project != sliderIndex && project != manualMovedSliderValueWithMaxValue) {
            if (moduloCnt < moduloValue) {
              this.refs["project_" + project].setSliderValue(divisionValue + 1, true);
              moduloCnt++;
            } else {
              this.refs["project_" + project].setSliderValue(divisionValue, true);
            }
          }
        }
      }
    } else {
      var divisionValue = Math.trunc((this.state.treeCount - movedCntAndSum[1]) / (this.state.projects.length - movedCntAndSum[0]));
      var moduloValue = (this.state.treeCount - movedCntAndSum[1]) % (this.state.projects.length - movedCntAndSum[0]);
      var moduloCnt = 0;
      for (var project in this.state.projects) {
        if (!this.refs["project_" + project].wasMovedManually()) {
          if (moduloCnt < moduloValue) {
            this.refs["project_" + project].setSliderValue(divisionValue + 1, false);
            moduloCnt++;
          } else {
            this.refs["project_" + project].setSliderValue(divisionValue, false);
          }
        }
      }
    }
  }

  getMovedCntAndSum() {
    var result = [];
    var movedCnt = 0;
    var movedSum = 0;
    for (var project in this.state.projects) {
      if (this.refs["project_" + project].wasMovedManually()) {
        movedCnt++;
        movedSum = movedSum + parseInt(this.refs["project_" + project].getSliderValue());
      }
    }
    result.push(movedCnt);
    result.push(movedSum);

    return result;
  }

  getManualMovedSliderValueWithMaxValueExceptCurrent(sliderIndex) {
    var maxValue = -1;
    var index;
    for (var project in this.state.projects) {
      if (project != sliderIndex && parseInt(this.refs["project_" + project].getSliderValue()) > maxValue) {
        maxValue = parseInt(this.refs["project_" + project].getSliderValue());
        index = project;
      }
    }
    return index;
  }

  switchToOfferProjectPage() {
    browserHistory.push('/projectOffer');
  }

  render() {
    var that = this;
    return (
      <div>
        <NavBar ref="navbar" reRender={this.props.route.reRender.bind(this)}/>
        <Header/>
        <div className="container paddingTopBottom15">
          <div className="row plantPage">
            <div className="col-md-12">
              <h2>{this.props.route.header}</h2>
              <MainSlider ref="mainSlider" balanceProjectSliders={this.balanceProjectSlidersFromMain.bind(this)}/> {this.state.projects.map(function(project, i) {
                return (<ProjectSlider project={project} articles={project.articles} key={i} ref={"project_" + i} balanceProjectSliders={that.balanceProjectSlidersFromProjectSlider.bind(this)} sliderIndex={i}/>);
              })}
              <table className="bottomTable">
                <tbody>
                  <tr>
                    <td></td>
                    <td>
                      <span>GESAMT:&nbsp;{Accounting.formatNumber(this.state.overallPrice / 100, 2, ".", ",")}&nbsp;€</span>
                    </td>
                    <td>
                      <ImageButton text="AB IN MEINEN<br/>PFLANZKORB" onClick={this.updatePlantBag.bind(this)} imagePath="/assets/images/Schubkarre_braun.png" imageWidth="72" imageHeight="40"/>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="line">Dir stehen Flächen zur Verfügung und Du hast Interesse daran, dass I Plant a Tree diese bepflanzt?
                <br/>
                Hier kanns Du eine
                <IconButton glyphIcon="glyphicon-forward" text="PROJEKTFLÄCHE ANBIETEN" onClick={this.switchToOfferProjectPage.bind(this)}/>
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

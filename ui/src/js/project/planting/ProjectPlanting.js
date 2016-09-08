import React, {Component} from 'react';
import {render} from 'react-dom';
import Boostrap from 'bootstrap';
import Accounting from 'accounting';
import {Link} from 'react-router';

import ArticleSlider from './ArticleSlider';

require("./projectPlanting.less");
require("./slider.less");

export default class ProjectPlanting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overallPrice: 5,
      treeCount: this.props.articles.length,
      articleCount: this.props.articles.length,
      slidersMoved: new Array(this.props.articles.length),
      sliderValues: new Array(this.props.articles.length),
      sliderValueSum: 0,
      moveCounter: 0
    };
    this.balanceOtherSliders = this.balanceOtherSliders.bind(this);
  }

  showDetails() {
    this.props.showDetails();
  }

  updateValue(event) {
    this.balanceArticleSliders(event.target.value);
    this.setState({treeCount: event.target.value});
  }

  balanceArticleSliders(targetValue) {
    if (this.state.sliderValueSum > targetValue) {
      this.setMovedFlagsToFalse();
      this.state.moveCounter = 0;
      this.state.sliderValueSum = 0;
    }
    var sumExceptMovedSlider = targetValue - this.state.sliderValueSum;
    var rem = sumExceptMovedSlider % (this.state.articleCount - this.state.moveCounter);
    var div = Math.trunc(sumExceptMovedSlider / (this.state.articleCount - this.state.moveCounter));
    this.setArticleSliderValues(div, rem);
  }

  balanceOtherSliders(sliderValue, sliderIndex) {
    if (this.state.moveCounter == this.state.articleCount) {
      this.setMovedFlagsToFalse();
    }
    this.state.slidersMoved[sliderIndex] = true;
    this.state.sliderValues[sliderIndex] = sliderValue;
    this.calcSliderValueSum();
    this.countMovedSliders();

    var sumExceptMovedSlider;
    if (this.state.sliderValueSum > this.state.treeCount) {
      this.setMovedFlagsToFalse();
      sumExceptMovedSlider = this.state.treeCount
    } else {
      sumExceptMovedSlider = this.state.treeCount - this.state.sliderValueSum;
    }
    var rem = sumExceptMovedSlider % (this.state.articleCount - this.state.moveCounter);
    var div = Math.trunc(sumExceptMovedSlider / (this.state.articleCount - this.state.moveCounter));
    this.setArticleSliderValues(div, rem);
  }

  setArticleSliderValues(div, rem) {
    var remCnt = 0;
    for (var i = 0; i < this.state.articleCount; i++) {
      if (!this.state.slidersMoved[i]) {
        if (remCnt < rem) {
          this.refs['a' + i].setTreeCount(div + 1);
          remCnt++;
        } else {
          this.refs['a' + i].setTreeCount(div);
        }
      }
    }
  }

  calcSliderValueSum() {
    var sum = 0;
    for (var i = 0; i < this.state.slidersMoved.length; i++) {
      if (this.state.slidersMoved[i]) {
        sum = sum + parseInt(this.state.sliderValues[i]);
      }
    }
    this.state.sliderValueSum = sum;
  }

  countMovedSliders() {
    var moved = 0;
    for (var i = 0; i < this.state.slidersMoved.length; i++) {
      if (this.state.slidersMoved[i]) {
        moved++;
      }
    }
    this.state.moveCounter = moved;
  }

  setMovedFlagsToFalse() {
    for (var i = 0; i < this.state.slidersMoved.length; i++) {
      this.state.slidersMoved[i] = false;
    }
    this.state.moveCounter = 0;
  }

  render() {
    var that = this;
    let imageUrl = 'http://localhost:8081/treeType/image/' + this.props.articles[0].treeType.imageFile + '/60/60';
    return (
      <div className="projectPlanting">
        <h2>{this.props.projectName}&nbsp;/&nbsp;
          <i>hier pflanzen</i>
        </h2>
        <div className="summary">
          <div>
            PREIS&nbsp;/&nbsp;STÜCKZAHL&nbsp;<span className="bold">
              GESAMT</span>
          </div>
          <div className="sliderDiv">
            <input type="range" min="1" max="100" step="1" value={this.state.treeCount} onChange={this.updateValue.bind(this)}/>
          </div>
          <div className="summaryDiv">
            <span className="overallPrice">{this.state.overallPrice}&nbsp;€</span><br/>
            <span className="overallTreeCount">{Accounting.formatNumber(this.state.treeCount, 0, ".", ",")}&nbsp;</span>
            <span className="glyphicon glyphicon-tree-deciduous" aria-hidden="true"></span>
          </div>
        </div>
        {this.props.articles.map(function(article, i) {
          return (<ArticleSlider article={article} key={i} ref={"a" + i} sliderIndex={i} balanceOtherSliders={that.balanceOtherSliders.bind(this)} maxValue={that.state.treeCount}/>);
        })}

        <table className="bottomTable">
          <tbody>
            <tr>
              <td></td>
              <td>
                <span>GESAMT:&nbsp;{this.state.overallPrice}&nbsp;€</span>
              </td>
              <td>
                <a role="button">
                  <div>
                    <img src="/assets/images/Schubkarre_braun.png" alt="online pflanzen" width="50" height="50"/>
                    <span className="no-link-deco">AB IN MEINEN<br/>PFLANZKORB!</span>
                  </div>
                </a>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="bottom">
          <a role="button" className="backLink" onClick={this.showDetails.bind(this)}>
            <div className="backDiv">
              <span className="glyphicon glyphicon-backward" aria-hidden="true"></span>
              <span className="no-link-deco">
                ZURÜCK ZUR BESCHREIBUNG
              </span>
            </div>
          </a>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

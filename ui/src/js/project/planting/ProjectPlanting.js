import React, {Component} from 'react';
import {render} from 'react-dom';
import Boostrap from 'bootstrap';
import Accounting from 'accounting';
import {Link} from 'react-router';

import IconButton from '../../common/components/IconButton';
import ProjectSlider from './ProjectSlider';
import ArticleSlider from './ArticleSlider';

require("./projectPlanting.less");
require("./slider.less");

export default class ProjectPlanting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overallPrice: 5,
      treeCount: this.props.articles.length,
      maximumAmountOfTreesToPlant: 0,
      sliderValue: this.props.articles.length,
      sliderStep: 1,
      maxValue: 200
    };
    this.balanceArticleSlider = this.balanceArticleSlider.bind(this);
  }

  componentDidMount() {
    this.calcOverallPrice();
    this.calcMaximumAmountOfTreesToPlant();
  }

  showDetails() {
    this.props.showDetails();
  }

  calcOverallPrice() {
    var price = 0;
    for (var i = 0; i < this.props.articles.length; i++) {
      price = price + this.props.articles[i].price.amount * parseInt(this.refs['a' + i].getTreeCount());
    }
    this.setState({overallPrice: price});
    this.refs.projectSlider.setPrice(price);
    this.forceUpdate();
  }

  calcMaximumAmountOfTreesToPlant() {
    var alreadyPlantedSum = 0;
    var amountSum = 0;
    for (var i = 0; i < this.props.articles.length; i++) {
      alreadyPlantedSum = alreadyPlantedSum + parseInt(this.props.articles[i].alreadyPlanted);
      amountSum = amountSum + parseInt(this.props.articles[i].amount);
    }
    this.setState({
      maximumAmountOfTreesToPlant: (amountSum - alreadyPlantedSum)
    });
  }

  setTreeCount(value) {
    this.state.treeCount = value;
    this.forceUpdate();
    this.balanceArticleSliderFromProjectSlider();
    this.calcOverallPrice();
  }

  balanceArticleSliderFromProjectSlider() {
    var blockedSliderSum = 0;
    var nonBlockedSliderSum = 0;
    var maxPossibleNonBlockedSliderSum = 0;
    var blockedCnt = 0;
    for (var i = 0; i < this.props.articles.length; i++) {
      if (this.refs['a' + i].isSliderBlocked()) {
        blockedSliderSum = blockedSliderSum + parseInt(this.refs['a' + i].getTreeCount());
        blockedCnt++;
      } else {
        nonBlockedSliderSum = nonBlockedSliderSum + parseInt(this.refs['a' + i].getTreeCount());
        maxPossibleNonBlockedSliderSum = maxPossibleNonBlockedSliderSum + parseInt(this.refs['a' + i].getMaximumAmountOfTreesToPlant());
      }
    }

    if (blockedSliderSum > this.state.treeCount || this.state.treeCount > maxPossibleNonBlockedSliderSum) {
      this.unLockArticleSlider();
      blockedCnt = 0;
      blockedSliderSum = 0;
    }

    var sumExceptBlockedSliders = this.state.treeCount - blockedSliderSum;
    var rem = sumExceptBlockedSliders % (this.props.articles.length - blockedCnt);
    var div = Math.trunc(sumExceptBlockedSliders / (this.props.articles.length - blockedCnt));

    this.setNonBlockedArticleSliderValues(div, rem);

    var articleSumAfterSet = 0;
    for (var i = 0; i < this.props.articles.length; i++) {
      articleSumAfterSet = articleSumAfterSet + parseInt(this.refs['a' + i].getTreeCount());
    }

    if (articleSumAfterSet < this.state.treeCount) {
      this.fillNotMaxedArticleSlider(articleSumAfterSet);
    }
  }

  fillNotMaxedArticleSlider(articleSumAfterSet) {
    var diff = this.state.treeCount - articleSumAfterSet;
    var maxedCnt = 0;
    for (var i = 0; i < this.props.articles.length; i++) {
      if (this.refs['a' + i].isMaxAmountReached()) {
        maxedCnt++;
      }
    }
    var rem = diff % (this.props.articles.length - maxedCnt);
    var div = Math.trunc(diff / (this.props.articles.length - maxedCnt));

    this.setNonMaxedArticleSliderValues(div, rem);

    articleSumAfterSet = 0;
    for (var i = 0; i < this.props.articles.length; i++) {
      articleSumAfterSet = articleSumAfterSet + parseInt(this.refs['a' + i].getTreeCount());
    }
    if (articleSumAfterSet < this.state.treeCount) {
      this.fillNotMaxedArticleSlider(articleSumAfterSet);
    }
  }

  balanceArticleSlider(sliderIndex) {
    var blockedSliderSum = 0;
    var blockedCnt = 0;
    for (var i = 0; i < this.props.articles.length; i++) {
      if (this.refs['a' + i].isSliderBlocked()) {
        blockedSliderSum = blockedSliderSum + parseInt(this.refs['a' + i].getTreeCount());
        blockedCnt++;
      } else {}
    }

    if (blockedCnt == this.props.articles.length || blockedSliderSum > this.state.treeCount) {
      this.unLockArticleSlider();
      blockedCnt = 1;
      this.refs['a' + sliderIndex].lock();
      blockedSliderSum = parseInt(this.refs['a' + sliderIndex].getTreeCount());
    }

    var sumExceptBlockedSliders = this.state.treeCount - blockedSliderSum;
    var rem = sumExceptBlockedSliders % (this.props.articles.length - blockedCnt);
    var div = Math.trunc(sumExceptBlockedSliders / (this.props.articles.length - blockedCnt));
    this.setNonBlockedArticleSliderValues(div, rem);

    var articleSumAfterSet = 0;
    for (var i = 0; i < this.props.articles.length; i++) {
      articleSumAfterSet = articleSumAfterSet + parseInt(this.refs['a' + i].getTreeCount());
    }
    if (articleSumAfterSet != this.state.treeCount) {
      this.unLockArticleSlider();
      this.refs['a' + sliderIndex].lock();
      this.balanceArticleSlider(sliderIndex);
    }
    this.calcOverallPrice();
  }

  unLockArticleSlider() {
    for (var i = 0; i < this.props.articles.length; i++) {
      this.refs['a' + i].unLock();
    }
  }

  setNonBlockedArticleSliderValues(div, rem) {
    var remCnt = 0;
    for (var i = 0; i < this.props.articles.length; i++) {
      if (!this.refs['a' + i].isSliderBlocked()) {
        var value;
        if (remCnt < rem) {
          value = div + 1;
          remCnt++;
        } else {
          value = div;
        }
        this.refs['a' + i].setTreeCount(value);
      }
    }
  }

  setNonMaxedArticleSliderValues(div, rem) {
    var remCnt = 0;
    for (var i = 0; i < this.props.articles.length; i++) {
      if (!this.refs['a' + i].isMaxAmountReached()) {
        var value;
        if (remCnt < rem) {
          value = parseInt(this.refs['a' + i].getTreeCount()) + div + 1;
          remCnt++;
        } else {
          value = parseInt(this.refs['a' + i].getTreeCount()) + div;
        }
        this.refs['a' + i].setTreeCount(value);
      }
    }
  }

  updatePlantBag(){
    var projectItems = {};
    for(var i = 0; i < this.props.articles.length; i++){
      if(this.refs['a' + i].getTreeCount() > 0){
        projectItems[this.props.articles[i].treeType.name] = {amount: parseInt(this.refs['a' + i].getTreeCount())};
      }
    }
    this.props.updatePlantBag(this.state.overallPrice, projectItems, this.props.projectName);
  }

  render() {
    var that = this;
    let imageUrl = 'http://localhost:8081/treeType/image/' + this.props.articles[0].treeType.imageFile + '/60/60';
    return (
      <div className="projectPlanting">
        <h2>{this.props.projectName}&nbsp;/&nbsp;
          <i>hier pflanzen</i>
        </h2>
        <ProjectSlider ref="projectSlider" maximumAmountOfTreesToPlant={this.state.maximumAmountOfTreesToPlant} setTreeCount={this.setTreeCount.bind(this)} ref="projectSlider"/>
        <div className="articleDesc">
          <table className="descTable">
            <tbody>
              <tr>
                <td>
                  <div></div>
                </td>
                <td>
                  <div>
                    Hier kannst Du die Anzahl Deiner Bäume individuell verteilen.
                  </div>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
          {this.props.articles.map(function(article, i) {
            return (<ArticleSlider article={article} key={i} ref={"a" + i} balanceArticleSlider={that.balanceArticleSlider.bind(this)} maxValue={that.state.treeCount} sliderIndex={i}/>);
          })}
        </div>

        <table className="bottomTable">
          <tbody>
            <tr>
              <td></td>
              <td>
                <span>GESAMT:&nbsp;{Accounting.formatNumber(this.state.overallPrice, 2, ".", ",")}&nbsp;€</span>
              </td>
              <td>
                <a role="button" onClick={this.updatePlantBag.bind(this)}>
                  <div>
                    <img src="/assets/images/Schubkarre_braun.png" alt="online pflanzen" width="50" height="50"/>
                    <span className="no-link-deco">AB IN MEINEN<br/>PFLANZKORB!</span>
                  </div>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="bottom align-center">
          <IconButton text="ZURÜCK ZUR BESCHREIBUNG" glyphIcon="glyphicon-backward" onClick={this.showDetails.bind(this)}/>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

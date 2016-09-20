import React, {Component} from 'react';
import {render} from 'react-dom';
import Boostrap from 'bootstrap';
import Accounting from 'accounting';

require("./articleSlider.less");

export default class ArticleSlider extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      overallPrice: this.props.article.price.priceAsLong,
      treeCount: 1,
      maximumTreesToPlant: this.props.article.amount - this.props.article.alreadyPlanted,
      isMaxAmountReached: false,
      isSliderBlocked: false
    })
  }

  updateValue(event) {
    this.state.treeCount = event.target.value;
    this.state.isSliderBlocked = true;
    this.state.overallPrice = this.props.article.price.priceAsLong * event.target.value;
    this.forceUpdate();
    this.props.balanceArticleSlider(this.props.sliderIndex);
  }

  setTreeCount(treeCount) {
    var valueToSet;
    if (treeCount >= this.state.maximumTreesToPlant) {
      valueToSet = this.state.maximumTreesToPlant;
      this.state.isMaxAmountReached = true;
    } else {
      valueToSet = treeCount;
      this.state.isMaxAmountReached = false;
    }

    this.state.treeCount = valueToSet,
    this.state.overallPrice = this.props.article.price.priceAsLong * valueToSet
    this.forceUpdate();
  }

  getTreeCount() {
    return this.state.treeCount;
  }

  isSliderBlocked() {
    return this.state.isSliderBlocked;
  }

  unLock() {
    this.state.isSliderBlocked = false;
    this.forceUpdate();
  }

  lock(){
    this.state.isSliderBlocked = true;
    this.forceUpdate();
  }

  isMaxAmountReached() {
    return this.state.isMaxAmountReached;
  }

  getMaximumAmountOfTreesToPlant() {
    return this.state.maximumTreesToPlant;
  }

  render() {
    let imageUrl = 'http://localhost:8081/treeType/image/' + this.props.article.treeType.imageFile + '/60/60';
    return (
      <div className="articleSlider">
        <table>
          <tbody>
            <tr>
              <td>
                <div>
                  <img src={imageUrl} className="treeImg"/>
                </div>
              </td>
              <td>
                <div>
                  <span className="bold">
                    {this.props.article.treeType.name}</span><br/>
                  Stk.&nbsp;<span className="bold">{Accounting.formatNumber(this.props.article.price.priceAsLong /100, 2, ".", ",")}&nbsp;€</span><br/>
                </div>
              </td>
              <td>
                <div>
                  <input type="range" min="0" max={(this.props.maxValue <= this.state.maximumTreesToPlant)
                    ? this.props.maxValue
                    : this.state.maximumTreesToPlant} value={this.state.treeCount} step="1" onChange={this.updateValue.bind(this)}/>
                </div>
              </td>

              <td>
                <div>
                  <span className="price">{Accounting.formatNumber(this.state.overallPrice/100, 2, ".", ",")}&nbsp;€</span><br/>
                  <span className="treeCount">{Accounting.formatNumber(this.state.treeCount, 0, ".", ",")}</span>
                  <span className="glyphicon glyphicon-tree-deciduous" aria-hidden="true"></span>
                </div>
              </td>
              <td>
                <div>
                  <span>{this.state.maximumTreesToPlant}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

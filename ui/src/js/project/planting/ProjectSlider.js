import React, {Component} from 'react';
import {render} from 'react-dom';
import Boostrap from 'bootstrap';
import Accounting from 'accounting';

export default class ProjectSlider extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      overallPrice: 10,
      treeCount: 5,
      maxSliderValue: 200,
      sliderValue: 5,
      sliderStep: 1,
      editTree: false
    })
  }

  setPrice(value){
    this.setState({overallPrice: value});
    this.forceUpdate();
  }

  calcTreeCountFromSliderValue(sliderValue) {
    var treeCount;
    if (sliderValue <= 100) {
      treeCount = sliderValue;
      this.setState({sliderStep: 1});
      if (sliderValue == 100) {
        this.setState({sliderStep: 3});
      }
    } else if (sliderValue > 100 && sliderValue < 160) {
      treeCount = Math.trunc((sliderValue - 100) / 3) * 500;
      this.setState({sliderStep: 3});
    } else if (sliderValue >= 160) {
      treeCount = Math.trunc((sliderValue - 157) / 3) * 10000;
    }

    if (treeCount < this.props.maximumAmountOfTreesToPlant) {
      this.state.treeCount =  treeCount;
      this.state.maxSliderValue = 200;
    } else {
      this.state.treeCount = this.props.maximumAmountOfTreesToPlant;
      this.state.maxSliderValue =  sliderValue;
    }
  }

  calcSliderValueFromTreeCount(treeCount) {
    var sliderValue;
    if (treeCount <= 100) {
      sliderValue = treeCount;
    } else if (treeCount > 100 && treeCount < 10000) {
      sliderValue = Math.trunc(treeCount / 500 * 3 + 100);
    }else if(treeCount >= 10000 && treeCount < this.props.maximumAmountOfTreesToPlant){
      sliderValue = Math.trunc(treeCount / 10000 * 3 + 157);
    }else{
      sliderValue = 200;
    }
    this.setState({sliderValue: parseInt(sliderValue)});
  }

  updateValue(event) {
    this.setState({sliderValue: event.target.value});
    this.calcTreeCountFromSliderValue(event.target.value);
    this.forceUpdate();
    this.props.setTreeCount(this.state.treeCount);
  }

  editTree() {
    this.setState({editTree: true});
  };

  updateTreeInput(e) {
    var formattedTreecount = e.target.value.replace('.', '');

    if(formattedTreecount > this.props.maximumAmountOfTreesToPlant){
      formattedTreecount = this.props.maximumAmountOfTreesToPlant;
    }

    this.setState({treeCount: formattedTreecount});
    this.calcSliderValueFromTreeCount(formattedTreecount);
    this.forceUpdate();
  }

  componentDidUpdate() {
    this.refs.treeInput.focus();
  }


  render() {
    return (
      <div className="summary">
        <table className="mainSlider">
          <tbody>
            <tr>
              <td>
                <div>
                  PREIS&nbsp;/&nbsp;STÜCKZAHL&nbsp;<span className="bold">
                    GESAMT</span>
                </div>
              </td>
              <td colSpan="2">
                <span className="glyphicon glyphicon-tree-deciduous" aria-hidden="true"/>
                <span>&nbsp;pflanzbar</span>
              </td>
            </tr>
            <tr>
              <td>
                <div>
                  <input type="range" min="1" max={this.state.maxSliderValue} step={this.state.sliderStep} value={this.state.sliderValue} onChange={this.updateValue.bind(this)}/>
                </div>
              </td>
              <td>
                <div>
                  <span className="overallPrice">{Accounting.formatNumber(this.state.overallPrice, 2, ".", ",")}&nbsp;€</span>
                  <a role="button" onClick={this.editTree.bind(this)}>
                    <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                  </a>
                  <br/>
                  <input className="overallTreeCount" type="text" value={Accounting.formatNumber(this.state.treeCount, 0, ".", ",")} onChange={this.updateTreeInput.bind(this)} disabled={!this.state.editTree} ref="treeInput" maxLength="7"/>
                  <span className="glyphicon glyphicon-tree-deciduous" aria-hidden="true"></span>
                  <a role="button" onClick={this.editTree.bind(this)}>
                    <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                  </a>
                </div>
              </td>
              <td>
                <div>
                  {this.props.maximumAmountOfTreesToPlant}
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

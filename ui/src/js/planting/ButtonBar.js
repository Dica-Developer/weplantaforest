import React, {Component} from 'react';
import {render} from 'react-dom';
import Boostrap from 'bootstrap';
import axios from 'axios';
import Accounting from 'accounting';
import {Link, browserHistory} from 'react-router';

require("./buttonBar.less");

export default class ButtonBar extends Component {

  constructor() {
    super();
    this.state = {
      customAmount: '',
      customInputVisible: false
    }
  }

  switchToSliderPlantPage() {
    browserHistory.push('/plant2');
    this.setState({customInputVisible: false});
  }

  switchToCustomPlantPage() {
    browserHistory.push('/plant3');
    this.setState({customInputVisible: false});
  }

  switchToProposalPage(amount) {
    browserHistory.push('/plant/' + amount);
    this.setState({customAmount: '', customInputVisible: false});
  }

  updateCustomAmount(event) {
    this.setState({customAmount: event.target.value});
  }
  setCustomInputVisible() {
    this.setState({customInputVisible: true});
  }

  componentDidUpdate() {
    if (this.state.customInputVisible) {
      this.refs.customInput.focus();
    }
  }

  handleCustomInputKeyDown(event) {
    if (event.keyCode == 13 && this.state.customAmount != '') {
      browserHistory.push('/plant/' + this.state.customAmount);
    }
  }

  switchToProposalPageCustom() {
    if (this.state.customAmount != '') {
      browserHistory.push('/plant/' + this.state.customAmount);
    }
  }

  render() {
    return (
      <div className="buttonBar">
        Lass dir von uns einen Vorschlag generieren oder bestimme selber, wo du wieviele Bäume pflanzen möchtest.<br/>
        <div className={"buttonDiv " + (this.props.chosen == "1"
          ? "chosen"
          : "")}>
          <a role="button" onClick={() => {
            this.switchToProposalPage('1')
          }}>
            1 Baum
          </a>
        </div>
        <div className={"buttonDiv " + (this.props.chosen == "5"
          ? "chosen"
          : "")}>
          <a role="button" onClick={() => {
            this.switchToProposalPage('5')
          }}>
            5 Bäume
          </a>
        </div>
        <div className={"buttonDiv " + (this.props.chosen == "10"
          ? "chosen"
          : "")}>
          <a role="button" onClick={() => {
            this.switchToProposalPage('10')
          }}>
            10 Bäume
          </a>
        </div>
        <div className={"buttonDiv " + (this.props.chosen == "50"
          ? "chosen"
          : "")}>
          <a role="button" onClick={() => {
            this.switchToProposalPage('50')
          }}>
            50 Bäume
          </a>
        </div>
        <div className={"buttonDiv " + (this.props.chosen == "100"
          ? "chosen"
          : "")}>
          <a role="button" onClick={() => {
            this.switchToProposalPage('100')
          }}>
            100 Bäume
          </a>
        </div>
        <div className={"buttonDiv " + (this.props.chosen == "custom"
          ? "chosen"
          : "")}>
          <a role="button" onClick={this.switchToCustomPlantPage.bind(this)}>
            individuell
          </a>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

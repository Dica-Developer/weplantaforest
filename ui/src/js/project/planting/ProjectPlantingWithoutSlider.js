import React, {Component} from 'react';
import {render} from 'react-dom';
import Boostrap from 'bootstrap';
import Accounting from 'accounting';
import {Link} from 'react-router';
import axios from 'axios';

import IconButton from '../../common/components/IconButton';
import ImageButton from '../../common/components/ImageButton';

import PlantProposal from './PlantProposal';
import PlantCustom from './PlantCustom';

require("./projectPlanting.less");

export default class ProjectPlantingWithoutSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGift: false,
      isAbo: false,
      amount: 5,
      fade: false,
      trees: {
        plantItems: []
      }
    };
    this.fadingDone = this.fadingDone.bind(this);
  }

  componentDidMount() {
    const elm = this.refs.planting;
    elm.addEventListener('animationend', this.fadingDone);
    this.getPlantProposal(this.props.amount);
  }
  componentWillUnmount() {
    const elm = this.refs.planting;
    elm.removeEventListener('animationend', this.fadingDone);
  }
  fadingDone() {
    this.setState({fade: false});
  }

  updatePlantBag(price, projectItems, projectName) {
    this.props.updatePlantBag(price, projectItems, projectName);
  }

  getPlantProposal(value) {
    var that = this;
    axios.get('http://localhost:8081/simplePlantProposalForTrees/project?projectName=' + this.props.projectName + "&amountOfTrees=" + value).then(function(response) {
      var result = response.data;
      that.setState({
        trees: result
      });
    })
  }

  setAmount(value) {
    this.setState({amount: value});
    if(value != "custom" ){
      this.getPlantProposal(value);
      if(this.refs["proposal"] != null){
        this.refs["proposal"].slideIn();
      }
    }
  }

  render() {
    var plantContent;
    if(this.state.amount != "custom"){
      plantContent = <PlantProposal ref="proposal" projectName={this.props.projectName} trees={this.state.trees} amount={this.state.amount} setAmount={this.setAmount.bind(this)} updatePlantBag={this.updatePlantBag.bind(this)}/>;
    }else{
      plantContent = <PlantCustom projectName={this.props.projectName} articles={this.props.articles} updatePlantBag={this.updatePlantBag.bind(this)} amount={this.state.amount} setAmount={this.setAmount.bind(this)}/>;
    }
    return (
      <div ref="planting" className={(this.state.fade
        ? 'fadeOut'
        : 'fadeIn') + " projectPlanting"}>
        <h2>{this.props.projectName}&nbsp;/&nbsp;
          <i>hier pflanzen</i>
        </h2>
        {plantContent}
        <div className="bottom align-center">
          <IconButton text="ZURÜCK ZUR BESCHREIBUNG" glyphIcon="glyphicon-backward" onClick={this.props.showDetails.bind(this)}/>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

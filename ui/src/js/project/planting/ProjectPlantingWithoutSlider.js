import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';
import Accounting from 'accounting';
import {
  Link
} from 'react-router';
import axios from 'axios';

import IconButton from '../../common/components/IconButton';
import ImageButton from '../../common/components/ImageButton';

import ButtonBar from './ButtonBar';
import BottomPart from '../../planting/BottomPart';
import PlantItem from './PlantItem';

require("./projectPlanting.less");

export default class ProjectPlantingWithoutSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trees: {
        plantItems: []
      },
      overallPrice: 0,
      isGift: false,
      isAbo: false,
      amount: 5,
      slideIn: false,
      fade: false
    };
    this.fadingDone = this.fadingDone.bind(this);
    this.slidingDone = this.slidingDone.bind(this);
  }

  componentDidMount() {
    const elm = this.refs.planting;
    const elm2 = this.refs.plantItems;
    elm.addEventListener('animationend', this.fadingDone);
    elm2.addEventListener('animationend', this.slidingDone);
    this.getPlantProposal(this.props.amount);
  }
  componentWillUnmount() {
    const elm = this.refs.planting;
    const elm2 = this.refs.plantItems;
    elm.removeEventListener('animationend', this.fadingDone);
    elm2.removeEventListener('animationend', this.slidingDone);
  }
  fadingDone() {
    this.setState({
      fade: false
    });
  }
  slidingDone() {
    this.setState({
      slideIn: false
    });
  }

  updatePlantBag() {
    for (var plantItem in this.state.trees.plantItems) {
      var price = this.state.trees.plantItems[plantItem].amount * this.state.trees.plantItems[plantItem].treePrice;
      var projectItems = {};
      projectItems[this.state.trees.plantItems[plantItem].treeType] = {
        amount: parseInt(this.state.trees.plantItems[plantItem].amount),
        price: parseInt(this.state.trees.plantItems[plantItem].treePrice),
        imageFile: this.state.trees.plantItems[plantItem].imageFile
      };
      this.props.updatePlantBag(price, projectItems, this.state.trees.plantItems[plantItem].projectName);
    }
  }

  getPlantProposal(value) {
    var that = this;
    this.setState({
      slideIn: true
    });

    axios.get('http://localhost:8081/simplePlantProposalForTrees/project?projectName=' + this.props.projectName + "&amountOfTrees=" + value).then(function(response) {
      var result = response.data;
      that.setState({
        trees: result
      });
    })
  }

  setAmount(value) {
    this.setState({
      amount: value
    });
    this.getPlantProposal(value);
  }

  render() {

    return (
      <div ref="planting" className={(this.state.fade
        ? 'fadeOut'
        : 'fadeIn') + " projectPlanting"}>
        <h2>{this.props.projectName}&nbsp;/&nbsp;
          <i>hier pflanzen</i>
        </h2>
        <div>
          <ButtonBar chosen={this.state.amount} setAmount={this.setAmount.bind(this)}/>
            <div className="plantItemDesc align-center bold plantItemDesc">
              <div>
                <p>
                  Baumtyp<br/>Preis&nbsp;/&nbsp;Stk.
                </p>
              </div>
              <div>
                Anzahl
              </div>
              <div></div>
              <div>
                Preis gesamt
              </div>
            </div>
            <div ref="plantItems" className={(this.state.slideIn
              ? 'slideIn '
              : ' ') + "align-center plantItems"}>
                {this.state.trees.plantItems.map(function(plantItem, i) {
                  return (<PlantItem plantItem={plantItem} key={i}/>);
                })}
            </div>
            <BottomPart updatePlantBag={this.updatePlantBag.bind(this)} overallPrice={this.state.trees.actualPrice}/>
          </div>
        <div className="bottom align-center">
          <IconButton text="ZURÜCK ZUR BESCHREIBUNG" glyphIcon="glyphicon-backward" onClick={this.props.showDetails.bind(this)}/>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

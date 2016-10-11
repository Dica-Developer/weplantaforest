import React, {Component} from 'react';
import {render} from 'react-dom';
import Boostrap from 'bootstrap';
import axios from 'axios';
import Accounting from 'accounting';
import {Link, browserHistory} from 'react-router';

import NavBar from '../../common/navbar/NavBar';
import Header from '../../common/header/Header';
import Footer from '../../common/Footer';

import PlantItem from './PlantItem';

import ButtonBar from '../ButtonBar';
import BottomPart from '../BottomPart';

require("./proposalPlantPage.less");

export default class ProposalPlantPage extends Component {

  constructor() {
    super();
    this.state = {
      trees: {
        plantItems: []
      },
      overallPrice: 0,
      isGift: false,
      isAbo: false,
      amount: -1
    };
  }

  componentDidMount() {
    this.setState({isGift: this.props.route.isGift, isAbo: this.props.route.isAbo, amount: this.props.params.amount});
    this.getPlantProposal(this.props.params.amount);
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
      this.refs["navbar"].updatePlantBag(price, projectItems, this.state.trees.plantItems[plantItem].projectName);
    }
  }

  getPlantProposal(value) {
    var that = this;
    axios.get('http://localhost:8081/simplePlantProposalForTrees/' + value).then(function(response) {
      var result = response.data;
      that.setState({trees: result});
    })
  }

  componentDidUpdate() {
    if (this.state.amount != this.props.params.amount) {
      this.getPlantProposal(this.props.params.amount);
      this.setState({amount: this.props.params.amount});
    }
  }

  render() {
    var chosen;
    if (this.props.params.amount == "1" || this.props.params.amount == "5" || this.props.params.amount == "10") {
      chosen = this.props.params.amount;
    } else {
      chosen = "customAmount";
    }
    return (
      <div>
        <NavBar ref="navbar" reRender={this.props.route.reRender.bind(this)}/>
        <Header/>
        <div className="container paddingTopBottom15">
          <div className="row proposalPlantPage">
            <div className="col-md-12">
              <h2>{this.props.route.header}</h2>
              <ButtonBar chosen={chosen}/>
              <div className="plantItem align-center bold plantItemDesc">
                <div></div>
                <div>
                  <p>
                    Baumtyp<br/>Preis&nbsp;/&nbsp;Stk.
                  </p>
                </div>
                <div>
                  Anzahl
                </div>
                <div>
                  Projektfläche
                </div>
                <div></div>
                <div>
                  Preis gesamt
                </div>
              </div>
              <div className="align-center">
                {this.state.trees.plantItems.map(function(plantItem, i) {
                  return (<PlantItem plantItem={plantItem} key={i}/>);
                })}
              </div>
              <BottomPart updatePlantBag={this.updatePlantBag.bind(this)} overallPrice={this.state.trees.actualPrice}/>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

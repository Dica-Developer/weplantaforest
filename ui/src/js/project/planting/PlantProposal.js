import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';
import Accounting from 'accounting';
import axios from 'axios';

import ButtonBar from './ButtonBar';
import BottomPart from '../../planting/BottomPart';
import PlantItem from './PlantItem';

export default class PlantProposal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trees: {
        plantItems: []
      },
      overallPrice: 0,
      slideIn: true
    };
    this.slidingDone = this.slidingDone.bind(this);
  }

  componentDidMount() {
    const elm2 = this.refs.plantItems;
    elm2.addEventListener('animationend', this.slidingDone);
  }
  componentWillUnmount() {
    const elm2 = this.refs.plantItems;
    elm2.removeEventListener('animationend', this.slidingDone);
  }
  slidingDone() {
    this.setState({
      slideIn: false
    });
  }

  updatePlantBag() {
    for (var plantItem in this.props.trees.plantItems) {
      var price = this.props.trees.plantItems[plantItem].amount * this.props.trees.plantItems[plantItem].treePrice;
      var projectItems = {};
      projectItems[this.props.trees.plantItems[plantItem].treeType] = {
        amount: parseInt(this.props.trees.plantItems[plantItem].amount),
        price: parseInt(this.props.trees.plantItems[plantItem].treePrice),
        imageFile: this.props.trees.plantItems[plantItem].imageFile
      };
      this.props.updatePlantBag(price, projectItems, this.props.projectName);
    }
  }

  slideIn(value) {
    this.setState({
      slideIn: true
    });
  }

  render() {
    return (
      <div>
          <ButtonBar chosen={this.props.amount} setAmount={this.props.setAmount.bind(this)}/>
          <div className="plantItemDesc align-center bold plantItemDesc ">
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
            {this.props.trees.plantItems.map(function(plantItem, i) {
              return (<PlantItem plantItem={plantItem} key={i}/>);
            })}
          </div>
          <BottomPart updatePlantBag={this.updatePlantBag.bind(this)} overallPrice={this.props.trees.actualPrice}/>
        </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

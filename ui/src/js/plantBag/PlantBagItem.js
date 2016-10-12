import React, {Component} from 'react';
import {render} from 'react-dom';
import Accounting from 'accounting';
import Boostrap from 'bootstrap';

import IconButton from '../common/components/IconButton';

require("./plantBagItem.less");

export default class PlantBagItem extends Component {

  constructor() {
    super();
  }

  render() {
    let imageUrl = 'http://localhost:8081/treeType/image/' + this.props.plantBagitem.imageFile + '/60/60';
    return (
      <div className="plantBagItem">
        <div className="image">
          <img src={imageUrl}/>
        </div>
        <div className="treeTypeInfo">
          <p>
            <span className="bold uppercase">{this.props.plantItemName}</span><br/>Stk.&nbsp;<span className="bold">{Accounting.formatNumber(this.props.plantBagitem.price / 100, 2, ".", ",")}&nbsp;€</span>
          </p>
        </div>
        <div className="customizer">
          <IconButton glyphIcon="glyphicon-minus" onClick={this.props.decreasePlantBagItem.bind(this)}/>
          <span className="bold">{this.props.plantBagitem.amount}</span>
          <IconButton glyphIcon="glyphicon-plus" onClick={this.props.increasePlantBagItem.bind(this)}/>
        </div>
        <div className="result-arrow">
          <span className="glyphicon glyphicon-share-alt" aria-hidden="true"></span>
        </div>
        <div className="result">
          <p className="bold">{Accounting.formatNumber(this.props.plantBagitem.amount * this.props.plantBagitem.price / 100, 2, ".", ",")}&nbsp;€</p>
          <IconButton glyphIcon="glyphicon-trash" onClick={this.props.removePlantBagItem.bind(this)}/>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

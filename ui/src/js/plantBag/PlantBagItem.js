import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
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
        <div>
          <img src={imageUrl} />
        </div>
        <div>
          <p><span className="bold uppercase">{this.props.plantItemName}</span><br/>Stk.&nbsp;<span className="bold">{Accounting.formatNumber(this.props.plantBagitem.price/100, 2, ".", ",")}&nbsp;€</span></p>
        </div>
        <div>
          <p>Anzahl:&nbsp;<span className="bold">{this.props.plantBagitem.amount}</span></p>
        </div>
        <div>
          <span className="glyphicon glyphicon-share-alt" aria-hidden="true"></span>
        </div>
        <div>
          <p className="bold">{Accounting.formatNumber(this.props.plantBagitem.amount * this.props.plantBagitem.price / 100, 2, ".", ",")}&nbsp;€</p>
          <IconButton glyphIcon="glyphicon-trash" onClick={this.props.removePlantBagItem.bind(this)}/>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

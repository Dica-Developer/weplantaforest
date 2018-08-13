import axios from 'axios';
import React, {Component} from 'react';
import {render} from 'react-dom';
import Boostrap from 'bootstrap';
import Accounting from 'accounting';

export default class RecipientGiftItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="giftItem">
        <div>
          {this.props.gift.code.code}
        </div>
        <div>
          {this.props.gift.code.cart.treeCount}
        </div>
        <div>
          {Accounting.formatNumber(this.props.gift.code.cart.totalPrice, 2, '.', ',')}€
        </div>
        <div>
          {this.props.gift.consignor.name}
        </div>
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */

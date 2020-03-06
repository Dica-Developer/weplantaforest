import Accounting from 'accounting';
import React, { Component } from 'react';

export default class RecipientGiftItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="giftItem">
        <div>{this.props.gift.code.code}</div>
        <div>{this.props.gift.code.cart.treeCount}</div>
        <div>{Accounting.formatNumber(this.props.gift.code.cart.totalPrice, 2, '.', ',')}€</div>
        <div>{this.props.gift.consignor.name}</div>
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */

import axios from 'axios';
import React, {Component} from 'react';
import {render} from 'react-dom';
import Boostrap from 'bootstrap';

export default class RecipientGiftItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="giftItem">
        <div>
          Code: {this.props.gift.code.code}
        </div>
        <div>
        Erstellt von: {this.props.gift.consignor.name}
        </div>
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */

import axios from 'axios';
import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';
import counterpart from 'counterpart';
import Accounting from 'accounting';


import IconButton from '../../common/components/IconButton';

export default class ConsignorGiftItem extends Component {
  constructor(props) {
    super(props);
  }
  generateGiftPdf() {
    window.open('http://localhost:8081/gift/pdf?giftId=' + this.props.gift.id);
  }

  render() {
    var recipient;
    var pdfButton;
    var status;
    if (this.props.gift.recipient == null) {
      recipient = '';
    } else {
      recipient = <span>{this.props.gift.recipient.name}</span>;
    }

    if(this.props.gift.status == 'UNREDEEMED'){
      pdfButton = <IconButton text={counterpart.translate('GENERATE_PDF')} glyphIcon="glyphicon-file" onClick={this.generateGiftPdf.bind(this)}/>;
    }else{
      pdfButton = '';
    }

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
          {recipient}
        </div>
        <div>
          {pdfButton}
        </div>
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */

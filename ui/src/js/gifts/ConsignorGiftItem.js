import axios from 'axios';
import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';

import IconButton from '../common/components/IconButton';

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
    if (this.props.gift.recipient == null) {
      recipient = '';
    } else {
      recipient = <span>Eingelöst von: {this.props.gift.recipient.name}</span>;
    }

    if(this.props.gift.status == 'UNREDEEMED'){
      pdfButton = <IconButton text="PDF generieren" glyphIcon="glyphicon-file" onClick={this.generateGiftPdf.bind(this)}/>;
    }else{
      pdfButton = '';
    }

    return (
      <div className="giftItem">
        <div>
          Code: {this.props.gift.code.code}
        </div>
        <div>
          Status: {this.props.gift.status}
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

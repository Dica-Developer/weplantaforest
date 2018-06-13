import axios from 'axios';
import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';
import counterpart from 'counterpart';

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

    if(this.props.gift.status == 'REDEEMED'){
      status = counterpart.translate('REDEEMED');
    }else{
      status = counterpart.translate('NOT_REDEEMED');
    }

    return (
      <div className="giftItem">
        <div>
          {this.props.gift.code.code}
        </div>
        <div>
          {status}
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

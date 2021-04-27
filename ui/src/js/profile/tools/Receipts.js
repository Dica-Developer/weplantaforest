import axios from 'axios';
import counterpart from 'counterpart';
import moment from 'dayjs';
import React, { Component } from 'react';

class Receipt extends Component {
  constructor(props) {
    super(props);
  }

  generateReceiptPdf() {
    var config = {
      headers: {
        'X-AUTH-TOKEN': localStorage.getItem('jwt'),
      },
      responseType: 'arraybuffer',
    };
    axios.get('http://localhost:8081/receipt/pdf?receiptId=' + this.props.receipt.receiptId, config).then(function (response) {
      var result = response.data;
      var pdfData = URL.createObjectURL(new Blob([result], { type: 'application/pdf' }));
      window.open(pdfData);
    });
  }

  render() {
    return (
      <div className="receipt">
        <a role="button" onClick={this.generateReceiptPdf.bind(this)}>
          <img src="/assets/images/receipt.jpg" alt="receipt" width="83" height="117" />
          <br />
          {moment(this.props.receipt.createdOn).format('DD.MM.YYYY')}
          <br />#{this.props.receipt.invoiceNumber}
        </a>
      </div>
    );
  }
}

export default class Receipts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receipts: [],
    };
  }

  componentDidMount() {
    this.getReceipts();
  }

  getReceipts() {
    var that = this;
    var config = {
      headers: {
        'X-AUTH-TOKEN': localStorage.getItem('jwt'),
      },
    };
    axios.get('http://localhost:8081/receipts', config).then(function (response) {
      var result = response.data;
      that.setState({
        receipts: result,
      });
    });
  }

  render() {
    var text;
    if (this.state.receipts.length == 0) {
      text = counterpart.translate('NO_RECEIPTS');
    } else {
      text = counterpart.translate('FOLLOWING_RECEIPTS') + ':';
    }

    return (
      <div className="row receipts">
        <div className="col-md-12">
          <h1>{counterpart.translate('NAVBAR.CONTRIBUTION_RECEIPTS')}</h1>
        </div>
        <div className="col-md-12">
          {text}
          <br />
          {this.state.receipts.map(function (receipt, i) {
            return <Receipt key={i} receipt={receipt} />;
          })}
        </div>
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */

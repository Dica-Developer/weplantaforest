import axios from 'axios';
import Accounting from 'accounting';
import counterpart from 'counterpart';
import React, { Component } from 'react';
import IconButton from '../../common/components/IconButton';
import { browserHistory } from 'react-router';
import Notification from '../../common/components/Notification';

export default class ConsignorGiftItem extends Component {
  constructor(props) {
    super(props);
  }

  generateGiftPdf() {
    var config = {
      headers: {
        'X-AUTH-TOKEN': localStorage.getItem('jwt'),
      },
      responseType: 'arraybuffer',
    };
    axios.get('http://localhost:8081/gift/pdf?giftId=' + this.props.gift.id, config).then(function (response) {
      var result = response.data;
      var pdfData = URL.createObjectURL(new Blob([result], { type: 'application/pdf' }));
      window.open(pdfData);
    });
  }

  generateSameGiftAgain() {
    var that = this;
    var value = this.props.gift.code.cart.treeCount;
    that.props.gift.code.cart.cartItems.forEach(plantItem => {
      var price = plantItem.amount * plantItem.tree.projectArticle.price.amount * 100;
      var projectItems = {};
      projectItems[plantItem.tree.treeType.name] = {
        amount: parseInt(plantItem.amount),
        price: parseInt(plantItem.tree.projectArticle.price.amount * 100),
        imageFile: plantItem.tree.treeType.imageFile
      };
      that.props.route.updatePlantBag(price, projectItems, plantItem.tree.projectArticle.project.name, true);
    });
    setTimeout(function() {
      browserHistory.push('/plantBag');
    }, 1000);
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

    if (this.props.gift.status == 'UNREDEEMED') {
      pdfButton = <IconButton text={counterpart.translate('GENERATE_PDF')} glyphIcon="glyphicon-file" onClick={this.generateGiftPdf.bind(this)} />;
    } else {
      pdfButton = '';
    }
    var generateSameGiftAgainButton = <IconButton text={counterpart.translate('GENERATE_SAME_GIFT_AGAIN')} glyphIcon="glyphicon-refresh" onClick={this.generateSameGiftAgain.bind(this)} />;

    return (
      <div className="giftItem">
        <div>{this.props.gift.code.code}</div>
        <div>{this.props.gift.code.cart.treeCount}</div>
        <div>{Accounting.formatNumber(this.props.gift.code.cart.totalPrice, 2, '.', ',')}€</div>
        <div>{recipient}</div>
        <div>{pdfButton}</div>
        <div>{generateSameGiftAgainButton}</div>
        <Notification ref="notification" />
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */

import Accounting from 'accounting';
import counterpart from 'counterpart';
import React, { Component } from 'react';
import Notification from '../../common/components/Notification';
import { getTextForSelectedLanguage } from '../../common/language/LanguageHelper';

require('./article.less');

export default class Article extends Component {
  constructor() {
    super();
    this.state = {
      amount: null,
      scaleResult: false
    };
    this.scalingDone = this.scalingDone.bind(this);
  }

  scalingDone() {
    this.setState({ scaleResult: false });
  }

  componentWillUnmount() {
    const elm = this.refs.result;
    elm.removeEventListener('animationend', this.scalingDone);
  }

  componentDidMount() {
    const elm = this.refs.result;
    elm.addEventListener('animationend', this.scalingDone);
  }

  getAmount() {
    return this.state.amount;
  }

  getPrice() {
    return this.props.article.price.priceAsLong;
  }

  updateAmount(event) {
    if (event.target.value <= this.props.article.amount - this.props.article.alreadyPlanted) {
      this.state.amount = event.target.value;
      this.props.updatePrice();
      this.forceUpdate();
    } else {
      this.refs.notification.addNotification(
        counterpart.translate('TOO_MANY_TREES.TITLE'),
        counterpart.translate('TOO_MANY_TREES.TEXT_1') + (this.props.article.amount - this.props.article.alreadyPlanted) + counterpart.translate('TOO_MANY_TREES.TEXT_2'),
        'error'
      );
      this.refs.amountInput.value = this.state.amount;
    }
    this.setState({ scaleResult: true });
  }

  render() {
    let imageUrl = 'http://localhost:8081/treeType/image/' + this.props.article.treeType.imageFile + '/60/60';
    return (
      <div className="article">
        <div className="image">
          <img src={imageUrl} />
        </div>
        <div>
          <p>
            <span className="bold uppercase">{getTextForSelectedLanguage(this.props.article.treeType.name)}</span>
            <br />
            <span className="bold">{Accounting.formatNumber(this.props.article.price.priceAsLong / 100, 2, '.', ',')}&nbsp;€</span>
          </p>
        </div>
        <div>
          <input ref="amountInput" type="text" value={this.state.value} onChange={this.updateAmount.bind(this)} />
          &nbsp;/&nbsp;{this.props.article.amount - this.props.article.alreadyPlanted}
        </div>
        <div>
          <p ref="result" className={(this.state.scaleResult ? 'scaleResult' : ' ') + ' bold'}>
            {Accounting.formatNumber((this.state.amount * this.props.article.price.priceAsLong) / 100, 2, '.', ',')}&nbsp;€
          </p>
        </div>
        <Notification ref="notification" />
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

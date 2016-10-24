import React, {Component} from 'react';
import {render} from 'react-dom';
import NotificationSystem from 'react-notification-system';
import NavBar from '../common/navbar/NavBar';
import Footer from '../common/Footer';
import Header from '../common/header/Header';
import Boostrap from 'bootstrap';

import Overview from './Overview';
import Sepa from './Sepa';

require("./paymentPage.less");

export default class PaymentPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      paymentOption: '',
      plantBag: JSON.parse(localStorage.getItem('plantBag')),
      cartId: this.props.params.cartId,
      giftId: this.props.params.giftId
    };
  }

  setPaymentOption(option) {
    this.setState({paymentOption: option});
  }

  updateNavbar(){
    this.refs["navbar"].updateComponents();
  }

  render() {
    var content;
    if (this.state.paymentOption == '') {
      content = <Overview price={this.state.plantBag.price} setPaymentOption={this.setPaymentOption.bind(this)}/>
    } else if (this.state.paymentOption == 'sepa') {
      content = <Sepa price={this.state.plantBag.price} cartId={this.state.cartId} giftId={this.state.giftId} setPaymentOption={this.setPaymentOption.bind(this)} updateNavbar={this.updateNavbar.bind(this)}/>;
    } else if (this.state.paymentOption == 'paymentDone') {
      content = <div className="col-md-12 align-center">
        <h2>Zahlung erfolgreich abgeschlossen!
        </h2>
        Die Daten wurden an die Bank für Sozialwirtschaft übermittelt.
      </div>;
    }
    return (
      <div className="container paddingTopBottom15">
        <div className="row paymentPage">
          {content}
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

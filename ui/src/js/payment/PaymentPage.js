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
      cartId: this.props.params.cartId
    };
  }

  setPaymentOption(option) {
    this.setState({paymentOption: option});
  }

  render() {
    var content;
    if(this.state.paymentOption == ''){
      content = <Overview price={this.state.plantBag.price} setPaymentOption={this.setPaymentOption.bind(this)}/>
    }else if(this.state.paymentOption == 'sepa'){
      content = <Sepa price={this.state.plantBag.price} cartId={this.state.cartId}/>;
    }
    return (
      <div>
        <NavBar/>
        <Header/>
        <div className="container paddingTopBottom15">
          <div className="row paymentPage">
            {content}
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

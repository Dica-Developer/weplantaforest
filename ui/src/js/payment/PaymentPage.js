import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Accounting from 'accounting';
import NavBar from '../common/navbar/NavBar';
import Footer from '../common/Footer';
import Header from '../common/header/Header';
import Boostrap from 'bootstrap';

require("./paymentPage.less");

export default class PaymentPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      paymentOption: ''
    };
  }

  setPaymentOption(option) {
    this.setState({
      paymentOption: option
    });
  }

  render() {
    var that = this;
    return (
      <div>
        <NavBar/>
        <Header/>
        <div className="container paddingTopBottom15">
          <div className="row paymentPage">
            <div className="col-md-12">
              <h2>Kasse</h2>
              <div>
              Sicher spenden für "I plant a tree". Das Senden der Daten ist mit HTTPS verschlüsselt. Bitte überprüfen sie die Richtigkeit Ihrer Angaben, denn diese finden sich in Ihrer Spendenquittung wieder. Achten sie auch unbedingt auf die richtige Syntax Ihrer Emailadresse - an diese wird die Spendenquittung versendet.
              </div>
              <div className="bold choose">
                Zahlungsmethode wählen:
              </div>
              <div className="paymentOption">
                <a role="button" onClick={()=>{this.setPaymentOption('sepa')}}>
                SEPA<br/>
                <img src="/assets/images/sepa.png" width="256" height="183"/>
                </a>
              </div>
              <div className="paymentOption">
                <a role="button" onClick={()=>{this.setPaymentOption('paypal')}}>
                PAYPAL<br/>
                <img src="/assets/images/paypal.png" width="256" height="183"/>
                </a>
              </div>
              <div className="paymentOption">
                <a role="button" onClick={()=>{this.setPaymentOption('creditcard')}}>
                KREDITKARTE<br/>
                <img src="/assets/images/visa.png" width="256" height="183"/>
                </a>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>);
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

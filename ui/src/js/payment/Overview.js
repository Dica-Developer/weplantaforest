import React, {Component} from 'react';
import {render} from 'react-dom';
import Boostrap from 'bootstrap';
import Accounting from 'accounting';

import Notification from '../common/components/Notification';

export default class Overview extends Component {

  constructor(props) {
    super(props);
  }

  setPaymentOption(option) {
    if (option == 'creditcard' && (this.props.price < 1500)) {
      this.refs.notification.addNotification('Kreditkartenzahlung nicht möglich!', 'Kreditkartenzahlungen sind leider erst ab einem Betrag von 15€ möglich.', 'error');
    } else {
      this.props.setPaymentOption(option);
    }
  }

  renderPaypalButton() {
    let that = this;
    paypal.Button.render({
      env: 'sandbox', // sandbox | production

      style: {
        label: 'checkout', // checkout | credit | pay
        size:  'responsive',    // small | medium | responsive
        shape: 'rect',     // pill | rect
        color: 'silver'      // gold | blue | silver
      },
      // PayPal Client IDs - replace with your own
      // Create a PayPal app: https://developer.paypal.com/developer/applications/create
      client: {
        sandbox: 'AQIg9TONrZNfKMgZ3F7OroWWqx3yQMGXjQubo2uvgiZTq9TsA7ReOhMGAzNJC4BVeoPwLd6XgezKGGfU',
        production: '<insert production client id>'
      },

      // Show the buyer a 'Pay Now' button in the checkout flow
      commit: true,

      // payment() is called when the button is clicked
      payment: function(data, actions) {

        // Make a call to the REST api to create the payment
        return actions.payment.create({
          transactions: [
            {
              amount: { total: Accounting.formatNumber(that.props.price / 100, 2, ',', '.'), currency: 'EUR' }
            }
          ]
        });
      },

      // onAuthorize() is called when the buyer approves the payment
      onAuthorize: function(data, actions) {

        // Make a call to the REST api to execute the payment
        return actions.payment.execute().then(function() {
          window.alert('Payment Complete!');
        });
      }

    }, '#paypal-button-container');
  }

  componentDidMount() {
    this.renderPaypalButton();
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <h2>Kasse</h2>
          <div>
            Sicher spenden für "I plant a tree". Das Senden der Daten ist mit HTTPS verschlüsselt. Bitte überprüfen sie die Richtigkeit Ihrer Angaben, denn diese finden sich in Ihrer Spendenquittung wieder. Achten sie auch unbedingt auf die richtige Syntax Ihrer Emailadresse - an diese wird die Spendenquittung versendet.
          </div>
          <div className="bold choose">
            Zahlungsmethode wählen:
          </div>
          <div className="paymentOption">
            <a role="button" onClick={() => {
              this.setPaymentOption('sepa')
            }}>
              SEPA<br/>
              <img src="/assets/images/sepa.png" width="256" height="183"/>
            </a>
          </div>
          <div className="paymentOption">
            <div id="paypal-button-container">
            </div>
          </div>
          <div className="paymentOption">
            <a role="button" onClick={() => {
              this.setPaymentOption('creditcard')
            }}>
              KREDITKARTE<br/>
              <img src="/assets/images/visa.png" width="256" height="183"/>
            </a>
          </div>
          <Notification ref="notification"/>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

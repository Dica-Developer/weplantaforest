import React, {Component} from 'react';
import {render} from 'react-dom';
import Boostrap from 'bootstrap';

import Notification from '../common/components/Notification';

export default class Overview extends Component {

  constructor(props) {
    super(props);
  }

  setPaymentOption(option) {
    if (option == 'creditcard' && (this.props.price / 100 < 15)) {
      this.refs.notification.addNotification('Kreditkartenzahlung nicht möglich!', 'Kreditkartenzahlungen sind leider erst ab einem Betrag von 15€ möglich.', 'error');
    } else {
      this.props.setPaymentOption(option);
    }
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
            <a role="button" onClick={() => {
              this.setPaymentOption('paypal')
            }}>
              PAYPAL<br/>
              <img src="/assets/images/paypal.png" width="256" height="183"/>
            </a>
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

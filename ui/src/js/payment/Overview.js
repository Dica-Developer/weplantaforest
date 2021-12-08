import Accounting from 'accounting';
import axios from 'axios';
import counterpart from 'counterpart';
import React, { Component } from 'react';
import Notification from '../common/components/Notification';
import { getConfig } from '../common/RestHelper';
import { browserHistory } from 'react-router';

export default class Overview extends Component {
  constructor(props) {
    super(props);
  }

  setPaymentOption(option) {
    if (option == 'creditcard' && this.props.price < 1500) {
      this.refs.notification.addNotification('Kreditkartenzahlung nicht möglich!', 'Kreditkartenzahlungen sind leider erst ab einem Betrag von 15€ möglich.', 'error');
    } else {
      this.props.setPaymentOption(option);
    }
  }

  renderPaypalButton() {
    let that = this;
    paypal.Button.render(
      {
        env: 'production', // sandbox | production

        style: {
          // layout: 'vertical',
          label: 'pay',
          size: 'responsive', // small | medium | responsive
          shape: 'rect', // pill | rect
          color: 'silver', // gold | blue | silver | black
          tagline: false,
          fundingicons: true, // optional
        },
        // Options:
        // - paypal.FUNDING.CARD
        // - paypal.FUNDING.CREDIT
        // - paypal.FUNDING.ELV

        funding: {
          allowed: [paypal.FUNDING.CARD],
          disallowed: [paypal.FUNDING.ELV],
        },

        // PayPal Client IDs - replace with your own
        // Create a PayPal app: https://developer.paypal.com/developer/applications/create
        client: {
          // sandbox: 'AQIg9TONrZNfKMgZ3F7OroWWqx3yQMGXjQubo2uvgiZTq9TsA7ReOhMGAzNJC4BVeoPwLd6XgezKGGfU',
          production: 'AY7q3cX-S1w60RV7sbCPo27zHabr-COtyAWUGJibBL9hkos4eg25PyskST_uYLXsPxYkBo2guws927Ky',
        },

        // Show the buyer a 'Pay Now' button in the checkout flow
        commit: true,

        // payment() is called when the button is clicked
        payment: function (data, actions) {
          return actions.payment.create({
            transactions: [
              {
                amount: {
                  total: Accounting.formatNumber(that.props.price / 100, 2, ',', '.'),
                  currency: 'EUR',
                },
              },
            ],
          });
        },

        // onAuthorize() is called when the buyer approves the payment
        onAuthorize: function (data, actions) {
          // Make a call to the REST api to execute the payment
          return actions.payment.execute().then(function (response) {
            //TODO: implement if/elso for paypal or creditcard payment and set paymentMethod 'PP' or 'KK'
            let streetLine1 = response.payer.payer_info.shipping_address.line1 ? response.payer.payer_info.shipping_address.line1 : '';
            let streetLine2 = response.payer.payer_info.shipping_address.line2 ? response.payer.payer_info.shipping_address.line2 : '';
            let street = streetLine1 + ' ' + streetLine2;
            if (street.length > 1024) {
              street = street.substring(0, 1024);
            }
            let paymentData = {
              cartId: that.props.cartId,
              giftId: that.props.giftId,
              company: '',
              companyAddon: '',
              salutation: '',
              title: '',
              forename: response.payer.payer_info.first_name,
              name: response.payer.payer_info.last_name,
              street: street,
              country: response.payer.payer_info.shipping_address.country_code,
              city: response.payer.payer_info.shipping_address.city,
              zip: response.payer.payer_info.shipping_address.postal_code,
              mail: response.payer.payer_info.email,
              comment: '',
              paymentMethod: 'PP',
              transactionId: response.transactions[0].related_resources[0].sale.id,
            };

            var config = getConfig();
            axios
              .post('http://localhost:8081/pay', paymentData, config)
              .then(function (response) {
                that.refs.notification.addNotification(counterpart.translate('PAYMENT_SUCCESSFUL'), counterpart.translate('THANKS_FOR_DONATION'), 'success');
                that.props.resetPlantBag();
                that.props.loadUserDetails();
                setTimeout(() => {
                  if (localStorage.getItem('username') && localStorage.getItem('username') != '') {
                    if (that.props.giftId) {
                      browserHistory.push('/gifts/' + encodeURIComponent(localStorage.getItem('username')));
                    } else {
                      browserHistory.push('/user/' + encodeURIComponent(localStorage.getItem('username')));
                    }
                  }
                }, 2000);
              })
              .catch(function (error) {
                let errorString = 'Bitte wende dich via E-Mail (support@iplantatree.org) an den Support';
                if (error && error.response && error.response.data) {
                  errorString += ' und füge die Fehlermeldung bei: ' + JSON.stringify(error.response.data);
                } else {
                  errorString += '.';
                }
                that.refs.notification.addNotification('Bei der Bezahlung ist ein Fehler aufgetreten!', errorString, 'error');
              });
          });
        },
      },
      '#paypal-button-container'
    );
  }

  componentDidMount() {
    if (this.props.price >= 1500) {
      this.renderPaypalButton();
    }
  }

  showLogin() {
    this.props.route.showLoginSlide();
  }

  render() {
    let sepaPart;
    let paypalWarning;
    if (this.props.price <= 100000) {
      sepaPart = (
        <a
          role="button"
          onClick={() => {
            this.setPaymentOption('sepa');
          }}
        >
          <img src="/assets/images/sepa.png" width="256" height="183" />
        </a>
      );
    } else {
      sepaPart = (
        <div className="panel panel-warning ">
          <div className="panel-heading">{counterpart.translate('PLANTING_BETWEEN_1_AND_1000')}</div>
        </div>
      );
    }

    if (this.props.price >= 1500) {
      paypalWarning = '';
    } else {
      paypalWarning = (
        <div className="panel panel-warning ">
          <div className="panel-heading">{counterpart.translate('PLANTING_FROM_15')}</div>
        </div>
      );
    }

    let isAnonymUser = !(localStorage.getItem('jwt') != null && localStorage.getItem('jwt') != '');
    return (
      <div className="row">
        <div className="col-md-12">
          <h1>{counterpart.translate('CHECKOUT')}</h1>
          <div className={'panel panel-danger ' + (!isAnonymUser ? 'no-display' : '')}>
            <div className="panel-heading">
              <strong>{counterpart.translate('NOT_LOGGED_IN')}</strong>
            </div>
            <div className="panel-body">
              {counterpart.translate('NOT_LOGGED_IN_TEXT')}
              <br />
              {counterpart.translate('ACCOUNT_Q')}&nbsp;<a onClick={this.showLogin.bind(this)}>Login</a>
              <br />
              {counterpart.translate('NO_ACCOUNT_Q')}&nbsp;
              <a
                onClick={() => {
                  this.linkTo('/registration');
                }}
              >
                {counterpart.translate('REGISTRATE')}
              </a>
            </div>
          </div>
          <div className="panel panel-warning ">
            <div className="panel-heading">{counterpart.translate('PAYMENT_INTRO_TITLE')}</div>
            <div className="panel-body">{counterpart.translate('PAYMENT_INTRO_TEXT')}</div>
          </div>
        </div>
        <div className="bold choose col-md-12">{counterpart.translate('CHOOSE_PAYMENT')}:</div>
        <div className="paymentOption col-md-6">{sepaPart}</div>
        <div className="paymentOption col-md-6">
          {paypalWarning}
          <div id="paypal-button-container"></div>
        </div>
        <Notification ref="notification" />
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

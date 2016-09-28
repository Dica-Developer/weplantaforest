import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import axios from 'axios';
import Accounting from 'accounting';
import Boostrap from 'bootstrap';

import Notification from '../common/components/Notification';
import IconButton from '../common/components/IconButton';
import InputText from '../common/components/InputText';

export default class Sepa extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cartId: this.props.cartId,
      giftId: this.props.giftId,
      company: '',
      companyAddon: '',
      salutation: '',
      title: '',
      forename: '',
      name: '',
      street: '',
      country: 'DE',
      city: '',
      zip: '',
      mail: '',
      receipt: 'sofort',
      comment: '',
      paymentMethod: 'SEPA',
      iban: 'TE01567891011121314151',
      bic: 'DEUTDEUTDEU'
    };
  }

  componentDidMount() {
    this.refs.select.options[0].selected = true;
  }

  updateValue(toUpdate, value) {
    this.setState({
      [toUpdate]: value
    });
  }

  updateSalutation(event) {
    this.setState({
      salutation: event.target.value
    });
  }

  payPlantBag() {
    var that = this;
    var config = {
      headers: {
        'X-AUTH-TOKEN': localStorage.getItem('jwt')
      }
    };
    axios.post('http://localhost:8081/pay', this.state, config).then(function(response) {
      that.props.setPaymentOption('paymentDone');
      that.props.updateNavbar();
    }).catch(function(response) {
      that.refs.notification.addNotification('Ein Fehler ist aufgetreten!', response.data, 'error');
      if (response instanceof Error) {
        console.error('Error', response.message);
      } else {
        console.error(response.data);
        console.error(response.status);
        console.error(response.headers);
        console.error(response.config);
      }
      console.error('Payment failed');
    });
  }

  render() {
    return (
      <div className="col-md-12">
        <h2>SEPA Lastschrift</h2>
        <div className="dataInputFrom">
          <table>
            <tbody>
              <tr>
                <td>Firma
                </td>
                <td><InputText toUpdate="company" updateValue={this.updateValue.bind(this)}/>
                </td>
              </tr>
              <tr>
                <td>Firmenzusatz
                </td>
                <td><InputText toUpdate="companyAddon" updateValue={this.updateValue.bind(this)}/>
                </td>
              </tr>
              <tr>
                <td>Anrede
                </td>
                <td><select onChange={this.updateSalutation.bind(this)} ref="select">
                      <option value="" disabled>Bitte auswählen</option>
                      <option value="1">Herr</option>
                      <option value="2">Frau</option>
                    </select>
                </td>
              </tr>
              <tr>
                <td>Titel
                </td>
                <td><InputText toUpdate="title" updateValue={this.updateValue.bind(this)}/>
                </td>
              </tr>
              <tr>
                <td>Vorname*
                </td>
                <td><InputText toUpdate="forename" updateValue={this.updateValue.bind(this)}/>
                </td>
              </tr>
              <tr>
                <td>Nachname*
                </td>
                <td><InputText toUpdate="name" updateValue={this.updateValue.bind(this)}/>
                </td>
              </tr>
              <tr>
                <td>Straße*
                </td>
                <td><InputText toUpdate="street" updateValue={this.updateValue.bind(this)}/>
                </td>
              </tr>
              <tr>
                <td>Land
                </td>
                <td>Deutschland ({this.state.country})
                </td>
              </tr>
              <tr>
                <td>Ort*
                </td>
                <td><InputText toUpdate="city" updateValue={this.updateValue.bind(this)}/>
                </td>
              </tr>
              <tr>
                <td>PLZ*
                </td>
                <td><InputText toUpdate="zip" updateValue={this.updateValue.bind(this)}/>
                </td>
              </tr>
              <tr>
                <td>E-Mail*
                </td>
                <td><InputText toUpdate="mail" updateValue={this.updateValue.bind(this)}/>
                </td>
              </tr>
              <tr>
                <td>
                </td>
                <td>
                </td>
              </tr>
              <tr>
                <td>Betrag
                </td>
                <td><span className="bold">{Accounting.formatNumber(this.props.price / 100, 2, ".", ",")}&nbsp;€</span>
                </td>
              </tr>
              <tr>
                <td>IBAN*
                </td>
                <td>{this.state.iban}
                </td>
              </tr>
              <tr>
                <td>BIC*
                </td>
                <td>{this.state.bic}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="align-center">
          <IconButton glyphIcon="glyphicon-euro" text="BESTÄTIGEN" onClick={this.payPlantBag.bind(this)}/>
        </div>
        <Notification ref="notification"/>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

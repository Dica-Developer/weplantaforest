import Accounting from 'accounting';
import axios from 'axios';
import counterpart from 'counterpart';
import React, { Component } from 'react';
import { CountryDropdown } from 'react-country-region-selector';
import { browserHistory } from 'react-router';
import IconButton from '../common/components/IconButton';
import InputText from '../common/components/InputText';
import LoadingSpinner from '../common/components/LoadingSpinner';
import Notification from '../common/components/Notification';
import { getConfig } from '../common/RestHelper';


require('./paymentPage.less');

export default class Sepa extends Component {

  constructor(props) {
    super(props);
    this.state = {
      paymentData: {
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
        // iban: 'TE01567891011121314151',
        // bic: 'DEUTDEUTDEU'
        iban: '',
        bic: ''
      },
      paymentDone: false
    };

  }

  componentDidMount() {
    this.refs.select.options[0].selected = true;
    this.checkForLastCart();
  }

  updateValue(toUpdate, value) {
    var key = toUpdate;
    var val = value;
    var obj = this.state.paymentData;
    obj[key] = val;
    this.setState({
      paymentData: obj
    });
  }

  updateSalutation(event) {
    var key = 'salutation';
    var val = event.target.value;
    var obj = this.state.paymentData;
    obj[key] = val;
    this.setState({
      paymentData: obj
    });
  }

  checkForLastCart(){
    if(localStorage.getItem('username') && localStorage.getItem('username') != '') {
      var config = getConfig();
      var that = this;
      axios.get('http://localhost:8081/carts/last', config).then(function(response) {
        if(response.data){
          that.preSetValues(response.data);
        }
      }).catch(function(error) {
        that.refs.notification.handleError(error);
      });      
    }
  }

  preSetValues(data){
    let paymentData = {
      cartId: this.props.cartId,
      giftId: this.props.giftId,
      company: data.callBackFirma,
      salutation: data.callBackSalutation,
      title: data.callBackTitle,
      forename: data.callBackVorname,
      name: data.callBackNachname,
      street: data.callBackStrasse,
      country: data.callBackLand,
      city: data.callBackOrt,
      zip: data.callBackPlz,
      mail: data.callBackEmail,
      receipt: 'sofort',
      comment: '',
      paymentMethod: 'SEPA',
      iban: '',
      bic: ''
    };
    this.setState({
      paymentData: paymentData
    });
  }

  payPlantBag() {
    this.refs['spinner'].showSpinner();
    var that = this;
    var config = getConfig();
    axios.post('http://localhost:8081/pay', this.state.paymentData, config).then(function(response) {
      that.refs['payment-row'].classList.add('fadeOut');
      that.refs['spinner'].hideSpinner();
      that.refs.notification.addNotification(counterpart.translate('PAYMENT_SUCCESSFUL'), counterpart.translate('THANKS_FOR_DONATION'), 'success');
      that.props.resetPlantBag();
      that.setState({
        paymentDone: true
      });
      that.props.loadUserDetails();
    })
    .catch(function(error) {
      that.refs['spinner'].hideSpinner();
      that.refs.notification.handleError(error);
    });
  }

  switchToGiftOverview() {
    browserHistory.push('/gifts/' + encodeURIComponent(localStorage.getItem('username')));
  }

  selectCountry(val) {
    this.state.paymentData.country = val;
    this.forceUpdate();
  }

  render() {
    var header = '';
    if (this.state.paymentDone) {
      header = <div><h1>{counterpart.translate('PAYMENT_SUCCESSFUL')}</h1>{counterpart.translate('FOLLOWING_DATA_TRANSFERED')}:</div>;
      if (JSON.parse(localStorage.getItem('isGift'))) {
        header = <div><h1>{counterpart.translate('PAYMENT_SUCCESSFUL')}</h1>{counterpart.translate('YOU_FIND_YOUR_GIFT_CODE')}<a role="button" onClick={this.switchToGiftOverview.bind(this)}> {counterpart.translate('HERE')}</a><br/>{counterpart.translate('FOLLOWING_DATA_TRANSFERED')}:</div>;
      } else {
        header = <div><h1>{counterpart.translate('PAYMENT_SUCCESSFUL')}</h1>{counterpart.translate('FOLLOWING_DATA_TRANSFERED')}:</div>;
      }
    } else {
      header = <h1>{counterpart.translate('SEPA_DEBIT')}</h1>;
    };

    return (
      <div className="payment-data">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            {header}
          </div>
          <div className="col-md-2"></div>
        </div>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className={'panel panel-warning ' + (this.state.paymentDone ? 'no-display' : '')}>
              <div className="panel-heading">{counterpart.translate('SEPA_HINT_TITLE')}</div>
              <div className="panel-body">
                {counterpart.translate('SEPA_HINT_TEXT')}
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="form-group">
              <label htmlFor="company">{counterpart.translate('COMPANY')}</label>
              <InputText id="company" value={this.state.paymentData.company} cssclass="form-control" toUpdate="company" updateValue={this.updateValue.bind(this)} disabled={this.state.paymentDone}/>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                <label htmlFor="salutation">{counterpart.translate('SALUTATION')}</label>
                <select id="salutation" value={this.state.paymentData.salutation} className="form-control" onChange={this.updateSalutation.bind(this)} ref="select" disabled={this.state.paymentDone}>
                  <option value="" disabled>{counterpart.translate('SELECT')}</option>
                  <option value="1">{counterpart.translate('MR')}</option>
                  <option value="2">{counterpart.translate('MRS')}</option>
                </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                <label htmlFor="title">{counterpart.translate('TITLE')}</label>
                <InputText id="title" value={this.state.paymentData.title} cssclass="form-control" toUpdate="title" updateValue={this.updateValue.bind(this)} disabled={this.state.paymentDone}/>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="forename">{counterpart.translate('FIRSTNAME')} *</label>
                  <InputText id="forename" value={this.state.paymentData.forename} cssclass="form-control" toUpdate="forename" updateValue={this.updateValue.bind(this)} disabled={this.state.paymentDone}/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="name">{counterpart.translate('LASTNAME')} *</label>
                  <InputText id="name" value={this.state.paymentData.name} cssclass="form-control" toUpdate="name" updateValue={this.updateValue.bind(this)} disabled={this.state.paymentDone}/>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="street">{counterpart.translate('STREET_AND_NR')} *</label>
              <InputText id="street" value={this.state.paymentData.street} cssclass="form-control" toUpdate="street" updateValue={this.updateValue.bind(this)} disabled={this.state.paymentDone}/>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="zip">{counterpart.translate('ZIP')} *</label>
                  <InputText id="zip" value={this.state.paymentData.zip} cssclass="form-control" toUpdate="zip" updateValue={this.updateValue.bind(this)} disabled={this.state.paymentDone}/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="city">{counterpart.translate('CITY')} *</label>
                  <InputText id="city" value={this.state.paymentData.city} cssclass="form-control" toUpdate="city" updateValue={this.updateValue.bind(this)} disabled={this.state.paymentDone}/>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="country">{counterpart.translate('COUNTRY')}</label>
              <CountryDropdown id="country" value={this.state.paymentData.country} onChange={(val) => this.selectCountry(val)} classes="form-control" valueType="short" disabled={this.state.paymentDone}/>
            </div>
            <div className="form-group">
              <label htmlFor="mail">{counterpart.translate('MAIL')} *</label>
              <InputText id="mail" value={this.state.paymentData.mail} cssclass="form-control" toUpdate="mail" updateValue={this.updateValue.bind(this)} disabled={this.state.paymentDone}/>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="iban">{counterpart.translate('IBAN')} *</label>
                  <InputText id="iban" cssclass="form-control" toUpdate="iban" updateValue={this.updateValue.bind(this)} disabled={this.state.paymentDone}/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="bic">{counterpart.translate('BIC')} *</label>
                  <InputText id="bic" cssclass="form-control" toUpdate="bic" updateValue={this.updateValue.bind(this)} disabled={this.state.paymentDone}/>
                </div>
              </div>
            </div>
            <div className="form-group amount align-center">
              <label>{counterpart.translate('AMOUNT')}: </label>&nbsp;
              <span className="bold">{Accounting.formatNumber(this.props.price / 100, 2, '.', ',')}&nbsp;€</span><br/>
              <IconButton glyphIcon="glyphicon-euro" text={counterpart.translate('DONATE_NOW')} onClick={this.payPlantBag.bind(this)}/>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
        <LoadingSpinner ref="spinner"/>
        <Notification ref="notification"/>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

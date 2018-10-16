import React, {Component} from 'react';
import {render} from 'react-dom';
import axios from 'axios';
import Boostrap from 'bootstrap';

import Translate from 'react-translate-component';
import counterpart from 'counterpart';

import Notification from '../common/components/Notification';
import InputText from '../common/components/InputText';
import CheckBox from '../common/components/CheckBox';
import IconButton from '../common/components/IconButton';
import Captcha from '../common/components/Captcha';

export default class DoRegistration extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      passwordOne: '',
      passwordTwo: '',
      mail: '',
      language: localStorage.getItem('language'),
      orgType: 'PRIVATE',
      newsLetter: true,
      acceptAgbs: false,
      acceptGDPR: false,
      registrated: false
    };
  }

  updateValue(toUpdate, value) {
    this.setState({[toUpdate]: value});
  }

  updateOrgType(event) {
    this.setState({orgType: event.target.value});
  }

  registrateUser() {
    if (this.state.passwordOne.length == 0 || this.state.username.length == 0 || this.state.mail.length == 0) {
      this.refs.notification.addNotification(counterpart.translate('FIELDS_EMPTY.title'), counterpart.translate('FIELDS_EMPTY.text'), 'error');
    } else if (this.state.passwordOne != this.state.passwordTwo) {
      this.refs.notification.addNotification(counterpart.translate('PASSWORDS_DO_NOT_MATCH.title'), counterpart.translate('PASSWORDS_DO_NOT_MATCH.text'), 'error');
    } else if (this.state.passwordOne.length < 6) {
      this.refs.notification.addNotification(counterpart.translate('PASSWORD_TOO_SHORT.title'), counterpart.translate('PASSWORD_TOO_SHORT.text'), 'error');
    } else if (!this.state.acceptAgbs) {
      this.refs.notification.addNotification(counterpart.translate('ACCEPT_AGBS.title'), counterpart.translate('ACCEPT_AGBS.text'), 'error');
    } else if (!this.state.acceptGDPR) {
      this.refs.notification.addNotification(counterpart.translate('ACCEPT_DSGVO.title'), counterpart.translate('ACCEPT_DSGVO.text'), 'error');
    } else if (!this.refs.captcha.validateCaptcha()) {} else {
      var that = this;
      var data = {
        username: this.state.username,
        password: this.state.passwordOne,
        mail: this.state.mail,
        orgType: this.state.orgType,
        newsLetter: this.state.newsLetter,
        language: this.state.language
      };

      axios.post('http://localhost:8081/user/registrate', data, {}).then(function(response) {
        that.props.setRegistrated();
      }).catch(error => {
        that.refs.notification.handleError(error);
      });
    }
  }

  render() {

    return (
      <div className="registrationPage">
        <div className="row">
          <div className="col-md-12">
            <h1>{counterpart.translate('REGISTRATE')}</h1>
          </div>
        </div>
        <div className="row">
          <div className="form-group">
            <label htmlFor="username">{counterpart.translate('USERNAME')}:</label>
            <InputText cssclass="form-control" placeholderText={counterpart.translate('USERNAME_PLACEHOLDER')} id="username" toUpdate="username" updateValue={this.updateValue.bind(this)}/>
          </div>
          <div className="form-group">
            <label htmlFor="passwordOne">{counterpart.translate('PASSWORD')}:</label>
            <InputText cssclass="form-control" placeholderText={counterpart.translate('PASSWORD_PLACEHOLDER')} id="passwordOne" toUpdate="passwordOne" updateValue={this.updateValue.bind(this)} type="password"/>
          </div>
          <div className="form-group">
            <label htmlFor="passwordTwo">{counterpart.translate('PASSWORD_CONFIRMATION')}:</label>
            <InputText cssclass="form-control" placeholderText={counterpart.translate('PASSWORD_PLACEHOLDER')} id="passwordTwo" toUpdate="passwordTwo" updateValue={this.updateValue.bind(this)} type="password"/>
          </div>
          <div className="form-group">
            <label htmlFor="mail">{counterpart.translate('MAIL')}:</label>
            <InputText cssclass="form-control" placeholderText={counterpart.translate('MAIL_PLACEHOLDER')} id="mail" toUpdate="mail" updateValue={this.updateValue.bind(this)}/>
          </div>
          <div className="form-group">
            <label htmlFor="type">Typ:</label>
            <select id="type" className="form-control" onChange={this.updateOrgType.bind(this)}>
              <option value="PRIVATE">{counterpart.translate('PRIVATEPERSON')}</option>
              <option value="COMMERCIAL">{counterpart.translate('COMPANY')}</option>
              <option value="NONPROFIT">{counterpart.translate('NGO')}</option>
              <option value="EDUCATIONAL">{counterpart.translate('SCHOOL')}</option>
            </select>
          </div>
          <div className="col-md-12 align-left checkBox">
            <CheckBox toUpdate="newsLetter" value={this.state.newsLetter} updateValue={this.updateValue.bind(this)} text={counterpart.translate('NEWSLETTER_CB')}/>
          </div>
          <div className="col-md-12 align-left checkBox">
            <CheckBox toUpdate="acceptAgbs" value={this.state.acceptAgbs} updateValue={this.updateValue.bind(this)} text={counterpart.translate('AGB_CB')}/>
          </div>
          <div className="col-md-12 align-left checkBox">
            <CheckBox toUpdate="acceptGDPR" value={this.state.acceptGDPR} updateValue={this.updateValue.bind(this)} text={counterpart.translate('DSGVO_CB')}/>
          </div>
          <div className="col-md-12 align-left">
            <Captcha ref="captcha"/>
          </div>
          <div className="col-md-12 align-left">
            <IconButton text={counterpart.translate('REGISTRATE')} glyphIcon="glyphicon-share" onClick={this.registrateUser.bind(this)}/>
          </div>
        </div>
        <Notification ref="notification"/>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

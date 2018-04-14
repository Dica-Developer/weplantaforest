import React, {Component} from 'react';
import {render} from 'react-dom';
import axios from 'axios';
import Boostrap from 'bootstrap';

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
      this.refs.notification.addNotification('Eingabefelder sind leer!', 'Bitte füllen Sie alle Eingabefelder aus!', 'error');
    } else if (this.state.passwordOne != this.state.passwordTwo) {
      this.refs.notification.addNotification('Passwörter stimmen nicht überein!', 'Das eingegebene Passwort stimmt nicht mit der Bestätigung überein!', 'error');
    } else if (this.state.passwordOne.length < 6) {
      this.refs.notification.addNotification('Passwort zu kurz!', 'Bitte gib mind. 6 Zeichen für dein Passwort an!', 'error');
    } else if (!this.state.acceptAgbs) {
      this.refs.notification.addNotification('Nutzungsbedingungen nicht akzeptiert!', 'Die Nutzungsbedingungen müssen akzeptiert werden!', 'error');
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
        console.log('registration succescull!');
        that.props.setRegistrated();
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
      });
    }
  }

  render() {

    return (
      <div className="registrationPage">
        <div className="row">
          <div className="col-md-12">
            <h1>Registrieren</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-5">
            Benutzername:
          </div>
          <div className="col-md-7">
            <InputText toUpdate="username" updateValue={this.updateValue.bind(this)}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-5">
            Passwort:
          </div>
          <div className="col-md-7">
            <InputText toUpdate="passwordOne" updateValue={this.updateValue.bind(this)} type="password"/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-5">
            Passwort(Bestätigen):
          </div>
          <div className="col-md-7">
            <InputText toUpdate="passwordTwo" updateValue={this.updateValue.bind(this)} type="password"/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-5">
            E-Mail:
          </div>
          <div className="col-md-7">
            <InputText toUpdate="mail" updateValue={this.updateValue.bind(this)}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-5">
            Typ:
          </div>
          <div className="col-md-7">
            <select onChange={this.updateOrgType.bind(this)}>
              <option value="PRIVATE">Privatperson</option>
              <option value="COMMERCIAL">Firma</option>
              <option value="NONPROFIT">Non-Profit Organisation</option>
              <option value="EDUCATIONAL">Schule</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-md-5"></div>
          <div className="col-md-7">
            <CheckBox toUpdate="newsLetter" value={this.state.newsLetter} updateValue={this.updateValue.bind(this)} text="Ich möchte den monatlichen Newsletter erhalten."/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-5"></div>
          <div className="col-md-7">
            <CheckBox toUpdate="acceptAgbs" value={this.state.acceptAgbs} updateValue={this.updateValue.bind(this)} text="Ich akzeptiere die Nutzungsbedingungen."/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 align-center">
            <Captcha ref="captcha"/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 align-center">
            <IconButton text="Registrieren" glyphIcon="glyphicon-share" onClick={this.registrateUser.bind(this)}/>
          </div>
        </div>
        <Notification ref="notification"/>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

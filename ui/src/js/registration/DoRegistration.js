import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import axios from 'axios';
import Boostrap from 'bootstrap';

import Notification from '../common/components/Notification';
import InputText from '../common/components/InputText';
import CheckBox from '../common/components/CheckBox';
import IconButton from '../common/components/IconButton';

export default class DoRegistration extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      passwordOne: '',
      passwordTwo: '',
      mail: '',
      orgType: 'PRIVATE',
      newsLetter: true,
      acceptAgbs: false,
      registrated: false
    };
  }

  updateValue(toUpdate, value) {
    this.setState({
      [toUpdate]: value
    });
  }

  updateOrgType(event) {
    this.setState({
      orgType: event.target.value
    });
  }

  registrateUser() {
    if (this.state.passwordOne.length == 0 || this.state.username.length == 0 || this.state.mail.length == 0) {
      this.refs.notification.addNotification('Eingabefelder sind leer!', 'Bitte füllen Sie alle Eingabefelder aus!', 'error');
    } else if (this.state.passwordOne != this.state.passwordTwo) {
      this.refs.notification.addNotification('Passwörter stimmen nicht überein!', 'Das eingegebene Passwort stimmt nicht mit der Bestätigung überein!', 'error');
    } else if (!this.state.acceptAgbs) {
      this.refs.notification.addNotification('Nutzungsbedingungen nicht akzeptiert!', 'Die Nutzungsbedingungen müssen akzeptiert werden!', 'error');
    } else {
      var that = this;
      var data = {
        username: this.state.username,
        password: this.state.passwordOne,
        mail: this.state.mail,
        orgType: this.state.orgType,
        newsLetter: this.state.newsLetter
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
      <div className="col-md-12">
        <h2>Anmelden</h2>
        <div className="registrationForm">
          <table>
            <tbody>
              <tr>
                <td>Benutzername:</td>
                <td><InputText toUpdate="username" updateValue={this.updateValue.bind(this)}/></td>
              </tr>
              <tr>
                <td>Passwort:</td>
                <td><InputText toUpdate="passwordOne" updateValue={this.updateValue.bind(this)} type="password"/></td>
              </tr>
              <tr>
                <td>Passwort(Bestätigen):</td>
                <td><InputText toUpdate="passwordTwo" updateValue={this.updateValue.bind(this)} type="password"/></td>
              </tr>
              <tr>
                <td>E-Mail:</td>
                <td><InputText toUpdate="mail" updateValue={this.updateValue.bind(this)}/></td>
              </tr>
              <tr>
                <td>Type:</td>
                <td>
                  <select onChange={this.updateOrgType.bind(this)}>
                    <option value="PRIVATE">Privatperson</option>
                    <option value="COMMERCIAL">Firma</option>
                    <option value="NONPROFIT">Non-Profit Organisation</option>
                    <option value="EDUCATIONAL">Schule</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td><CheckBox toUpdate="newsLetter" value={this.state.newsLetter} updateValue={this.updateValue.bind(this)} text="Ich möchte den monatlichen Newsletter erhalten."/></td>
              </tr>
              <tr>
                <td></td>
                <td><CheckBox toUpdate="acceptAgbs" value={this.state.acceptAgbs} updateValue={this.updateValue.bind(this)} text="Ich akzeptiere die Nutzungsbedingungen."/></td>
              </tr>
            </tbody>
          </table>
          <div className="align-center">
            <IconButton text="ANMELDEN" glyphIcon="glyphicon-share" onClick={this.registrateUser.bind(this)}/>
          </div>
        </div>
        <Notification ref="notification"/>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

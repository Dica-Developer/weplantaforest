import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';
import axios from 'axios';

import Notification from '../../common/components/Notification';
import InputText from '../../common/components/InputText';
import IconButton from '../../common/components/IconButton';

export default class SendRequest extends Component {

  constructor() {
    super();
    this.state = {
      name: ''
    };
  }

  updateValue(toUpdate, value) {
    this.setState({
      [toUpdate]: value
    });
  }

  sendPasswortResetMail() {
    if (this.state.name != '') {
      var that = this;
      axios.post('http://localhost:8081/password_request?userName=' + this.state.name + '&language=' + localStorage.getItem('language')).then(function(response) {
        that.props.setResetted();
      }).catch(function(response) {
        that.refs.notification.handleError( response);
      });
    } else {
      this.refs.notification.addNotification('Keinen Nutzernamen angegeben!', 'Den Nutzernamen müsstest du schon angeben.', 'error');
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <h1>Passwort vergessen</h1>
        <div className="form">
          Bitte gib deinen Nutzernamen an <br/>und wir schicken dir an die angegebene E-Mail Adresse einen Link,<br/>womit du dein Passwort zurücksetzen kannst.
          <br/>
          <InputText toUpdate="name" updateValue={this.updateValue.bind(this)}/>
          <br/>
          <IconButton text="PASSWORT RESET MAIL VERSCHICKEN" glyphIcon="glyphicon-envelope" onClick={this.sendPasswortResetMail.bind(this)}/>
        </div>
        <Notification ref="notification"/>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

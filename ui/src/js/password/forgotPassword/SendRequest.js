import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';
import axios from 'axios';
import counterpart from 'counterpart';

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
      axios.post('http://localhost:8081/password_request?userName=' + encodeURIComponent(this.state.name) + '&language=' + localStorage.getItem('language')).then(function(response) {
        that.props.setResetted();
      }).catch(function(error) {
        that.refs.notification.handleError(error);
      });
    } else {
      this.refs.notification.addNotification(counterpart.translate('NO_USERNAME.TITLE'), counterpart.translate('NO_USERNAME.TEXT'), 'error');
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <h1>{counterpart.translate('PASSWORD_FORGOT')}</h1>
        <div className="form">
          {counterpart.translate('PASSWORD_FORGOT_TEXT')}
          <br/>
          <InputText toUpdate="name" updateValue={this.updateValue.bind(this)}/>
          <br/>
          <IconButton text={counterpart.translate('SEND_PASSWORD_RESET_MAIL')} glyphIcon="glyphicon-envelope" onClick={this.sendPasswortResetMail.bind(this)}/>
        </div>
        <Notification ref="notification"/>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

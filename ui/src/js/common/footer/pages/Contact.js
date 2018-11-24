import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';
import axios from 'axios';

import IconButton from '../../components/IconButton';
import Captcha from '../../../common/components/Captcha';
import Notification from '../../components/Notification';

import counterpart from 'counterpart';

require('./contact.less');

export default class Contact extends Component {

  constructor() {
    super();
    this.state = {
      contact: [],
      form: {
        reason: 'Frage',
        name: '',
        mail: '',
        phone: '',
        message: ''
      }
    };
  }

  componentDidMount() {
    var that = this;
    axios.get('http://localhost:8082/articles?articleType=CONTACT&language=' + localStorage.getItem('language')).then(function(response) {
      var result = response.data;
      that.setState({
        contact: result
      });
    }).catch(function(response) {
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

  submit() {
    if (this.validateForm()) {
      var that = this;
      axios.post('http://localhost:8081/contact', this.state.form).then(function(response) {
        that.refs.notification.addNotification('Kontakt-Anfrage wurde versandt!', 'Die Kontaktanfrage wurde erfolgreich übermittelt. Wir werden uns bald bei dir melden!', 'success');
      }).catch(function(response) {
        that.refs.notification.addNotification('Bei der Übermittlung ist ein Fehler aufgetreten!', 'Bitte versuche es noch einmal.', 'error');
      });
    } else {
      this.refs.notification.addNotification('Fehler!', 'Bitte füll alle notwendigen(mit einem * markierte) Felder aus!', 'error');
    }
  }

  validateForm() {
    if (this.state.form.name === '' || this.state.form.mail === '' || this.state.form.message === '') {
      return false;
    }
    return true;
  }

  updateValue(toUpdate, event){
    this.state.form[toUpdate] = event.target.value;
    this.forceUpdate();
  }

  render() {
    var that = this;
    return (
      <div className="container paddingTopBottom15 contact">
          <div className="row">
            <div className="col-md-12">
              <h1>{counterpart.translate('CONTACT')}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div>
                {this.state.contact.map(function(contact, i) {
                  return ( <div key={i} ><p className="title">{contact.title}</p><p dangerouslySetInnerHTML={{
                    __html: contact.intro}}></p>
                </div>);
                })}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group">
              <label htmlFor="contact_type">{counterpart.translate('YOUR_CONCERN')}:</label>
                <select className="form-control" id="contact_type" defaultValue={0} onChange={(e) => this.updateValue('reason', e)}>
                  <option value={'Frage'}>{counterpart.translate('QUESTION')}</option>
                  <option value={'Presse & Media'}>{counterpart.translate('PRESS_MEDIA')}</option>
                  <option value={'Kooperation'}>{counterpart.translate('COORPORATION')}</option>
                </select>
            </div>
            <div className="form-group">
              <label htmlFor="firstname_familyname">{counterpart.translate('FIRSTNAME_LASTNAME')}*:</label>
              <input type="text" className="form-control" id="firstname_familyname" placeholder={counterpart.translate('FIRSTNAME_LASTNAME_PLACEHOLDER')} onBlur={(e) => this.updateValue('name', e)}/>
            </div>
            <div className="form-group">
              <label htmlFor="e_mail">{counterpart.translate('MAIL')}*:</label>
              <input type="email" className="form-control" id="e_mail" placeholder={counterpart.translate('MAIL_PLACEHOLDER')} onBlur={(e) => this.updateValue('mail', e)}/>
            </div>
            <div className="form-group">
              <label htmlFor="phone_number">{counterpart.translate('PHONE_NO')}:</label>
              <input type="text" className="form-control" id="phone_number" placeholder={counterpart.translate('PHONE_NO_PLACEHOLDER')} onBlur={(e) => this.updateValue('phone', e)} />
            </div>
            <div className="form-group">
              <label htmlFor="personal_message">{counterpart.translate('YOUR_MESSAGE')}*:</label>
              <textarea className="form-control" rows="10" id="personal_message" placeholder={counterpart.translate('YOUR_MESSAGE_PLACEHOLDER')} onBlur={(e) => this.updateValue('message', e)}/>
            </div>
            <div className="col-md-12 item-align-start">
              <Captcha ref="captcha"/>
            </div>
            <div className="form-group">
              <IconButton text={counterpart.translate('SEND')} glyphIcon="glyphicon-envelope" onClick={this.submit.bind(this)}/>
            </div>
          </div>
          <Notification ref="notification"/>
        </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

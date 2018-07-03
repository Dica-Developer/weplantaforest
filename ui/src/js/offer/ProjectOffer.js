import React, {Component} from 'react';
import {render} from 'react-dom';
import axios from 'axios';
import Boostrap from 'bootstrap';
import counterpart from 'counterpart';

import Notification from '../common/components/Notification';
import IconButton from '../common/components/IconButton';
import InputText from '../common/components/InputText';
import TextArea from '../common/components/TextArea';
import Captcha from '../common/components/Captcha';
import RadioButton from '../common/components/RadioButton';

export default class ProjectOffer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      first: '',
      name: '',
      mail: '',
      comment: ''
    };
  }

  updateValue(toUpdate, value) {
    this.setState({[toUpdate]: value});
  }

  updateAfforestation(event) {
    if (event.target.value == '1') {
      this.setState({isAfforestation: true});
    } else {
      this.setState({isAfforestation: false});
    }
  }

  updateSelling(event) {
    if (event.target.value == '1') {
      this.setState({isSelling: true});
    } else {
      this.setState({isSelling: false});
    }
  }

  updateLeasing(event) {
    if (event.target.value == '1') {
      this.setState({isLeasing: true});
    } else {
      this.setState({isLeasing: false});
    }
  }

  sendOffer() {
    if (this.refs.captcha.validateCaptcha()) {
      var that = this;
      var config = {
        headers: {
          'X-AUTH-TOKEN': localStorage.getItem('jwt')
        }
      };

      axios.post('http://localhost:8081/project/offer', this.state, config).then(function(response) {
        console.log('call child');
        that.props.setThankYou(true);
      }).catch(function(response) {
        that.refs.notification.addNotification('Ein Fehler ist aufgetreten!', 'Bitte füll alle notwendigen Felder aus!', 'error');
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
      <div className="projectOffer container">
        <div className="row">
          <div className="col-md-12 item-align-start">
            <h1>{counterpart.translate('NAVBAR.OFFER_ACREAGE')}</h1>
            <p>{counterpart.translate('OFFER_ACREAGE_TEXTS.TEXT_1')}</p>
            <ul>
              <li>{counterpart.translate('OFFER_ACREAGE_TEXTS.TEXT_2')}</li>
              <li>{counterpart.translate('OFFER_ACREAGE_TEXTS.TEXT_3')}</li>
              <li>{counterpart.translate('OFFER_ACREAGE_TEXTS.TEXT_4')}</li>
              <li>{counterpart.translate('OFFER_ACREAGE_TEXTS.TEXT_5')}</li>
              <li>{counterpart.translate('OFFER_ACREAGE_TEXTS.TEXT_6')}</li>
              <li>{counterpart.translate('OFFER_ACREAGE_TEXTS.TEXT_7')}</li>
            </ul>
            <h3>{counterpart.translate('OFFER_ACREAGE_TEXTS.TEXT_8')}</h3>
          </div>
          <div className="form-group">
              <label htmlFor="firstname_familyname">{counterpart.translate('FIRST_AND_LASTNAME')} *:</label>
              <InputText cssclass="form-control" toUpdate="name" id="firstname_familyname" placeholderText={counterpart.translate('FIRST_AND_LASTNAME_PLACEHOLDER')} updateValue={this.updateValue.bind(this)}/>
            </div>
          <div className="form-group">
              <label htmlFor="e_mail">{counterpart.translate('MAIL')} *:</label>
              <InputText cssclass="form-control" id="e_mail" toUpdate="name" placeholderText={counterpart.translate('MAIL_PLACEHOLDER')} updateValue={this.updateValue.bind(this)}/>
          </div>
          <div className="form-group">
              <label htmlFor="message">{counterpart.translate('MESSAGE')} *:</label>
              <TextArea cssclass="form-control" id="message" toUpdate="comment" placeholderText={counterpart.translate('MESSAGE_PLACEHOLDER')} updateValue={this.updateValue.bind(this)}/>
          </div>
          <div className="col-md-12 item-align-start">
            <Captcha ref="captcha"/>
          </div>
          <div className="col-md-12 item-align-start">
            <IconButton text={counterpart.translate('SEND_OFFER')} glyphIcon="glyphicon-envelope" onClick={this.sendOffer.bind(this)}/>
            <Notification ref="notification"/>
          </div>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

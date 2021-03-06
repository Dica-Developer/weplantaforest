import axios from 'axios';
import counterpart from 'counterpart';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import IconButton from '../common/components/IconButton';
import Notification from '../common/components/Notification';
import { getConfig } from '../common/RestHelper';

require('./redeemGiftContent.less');

export default class RedeemGiftContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRedeemed: false,
      code: '',
      part1: '',
      part2: '',
      part3: '',
      part4: ''
    };
  }

  redeemGift() {
    var that = this;
    this.createGiftCodeString();
    var config = getConfig();
    axios
      .post('http://localhost:8081/code/redeem?codeString=' + this.state.code, {}, config)
      .then(function(response) {
        that.props.redeemGift();
      })
      .catch(function(error) {
        that.refs.notification.handleError(error);
      });
  }

  createGiftCodeString() {
    var code = this.state.part1 + '-' + this.state.part2 + '-' + this.state.part3 + '-' + this.state.part4;
    this.state.code = code;
    this.forceUpdate();
  }

  updateInput(toUpdate, event) {
    this.setState({
      [toUpdate]: event.target.value
    });
  }

  trimAndSetValuesIfPossible(event) {
    var clipboardData, pastedData;

    event.stopPropagation();
    event.preventDefault();

    clipboardData = event.clipboardData || window.clipboardData;
    pastedData = clipboardData.getData('Text');

    if (pastedData.length > 4) {
      var that = this;
      if (pastedData.replace(/[^-]/g, '').length == 3) {
        pastedData.split('-').map(function(item, i) {
          that.refs['part' + (i + 1)].value = item;
          that.setState({
            ['part' + (i + 1)]: item
          });
        });
      } else if (pastedData.replace(/[^ ]/g, '').length == 3) {
        pastedData.split(' ').map(function(item, i) {
          that.refs['part' + (i + 1)].value = item;
          that.setState({
            ['part' + (i + 1)]: item
          });
        });
      }
    } else if (pastedData.length <= 4) {
      this.refs['part1'].value = pastedData;
      this.setState({
        part1: pastedData
      });
    }
    this.forceUpdate();
  }

  linkTo(url) {
    browserHistory.push(url);
  }

  showLogin() {
    this.props.showLoginSlide();
  }

  render() {
    var loggedIn = localStorage.getItem('username') && localStorage.getItem('username') != '';
    return (
      <div className="col-md-12 redeemGiftContent">
        <div className={!loggedIn ? 'no-display' : ''}>
          <h1>{counterpart.translate('REDEEM_GIFT')}</h1>
          <p>{counterpart.translate('ENTER_GIFT_CODE')}:</p>
          <div className="inputWrapper">
            <input
              type="text"
              size="4"
              maxLength="4"
              ref="part1"
              onBlur={event => {
                this.updateInput('part1', event);
              }}
              onPaste={this.trimAndSetValuesIfPossible.bind(this)}
            />
            &nbsp;-&nbsp;
            <input
              type="text"
              size="4"
              maxLength="4"
              ref="part2"
              onBlur={event => {
                this.updateInput('part2', event);
              }}
            />
            &nbsp;-&nbsp;
            <input
              type="text"
              size="4"
              maxLength="4"
              ref="part3"
              onBlur={event => {
                this.updateInput('part3', event);
              }}
            />
            &nbsp;-&nbsp;
            <input
              type="text"
              size="4"
              maxLength="4"
              ref="part4"
              onBlur={event => {
                this.updateInput('part4', event);
              }}
            />
          </div>
          <IconButton className="iconButton" text={counterpart.translate('REDEEM_GIFT')} glyphIcon="glyphicon-gift" onClick={this.redeemGift.bind(this)} />
        </div>
        <div className={'panel panel-danger ' + (loggedIn ? 'no-display' : '')}>
          <div className="panel-heading">
            <strong>{counterpart.translate('NOT_LOGGED_IN_REDEEM_GIFT')}</strong>
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
        <Notification ref="notification" />
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

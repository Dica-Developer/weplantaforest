import React, {Component} from 'react';
import axios from 'axios';
import {browserHistory } from 'react-router';

import Notification from '../components/Notification';
import IconButton from '../components/IconButton';

export default class LoginMenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      loggedIn: (localStorage.getItem('jwt') != null && localStorage.getItem('jwt') != '')
    };
  }

  updateName(e) {
    this.setState({name: e.target.value})
  }

  updatePassword(e) {
    this.setState({password: e.target.value})
  }

  showErrorMessageAndClearInputFields() {
    this.setState({name: '', password: ''})
  }

  handleLogin(token) {
    var that = this;
    localStorage.setItem('jwt', token);
    localStorage.setItem('username', this.state.name);
    this.props.updateNavbar();
    axios.get('http://localhost:8081/user/language?userName=' + this.state.name).then(function(response) {
      var result = response.data;
      that.props.updateLanguage(result);
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

    this.setState({loggedIn: true})
  }

  login() {
    var that = this;
    axios({
      method: 'post',
      url: 'http://localhost:8081/api/login',
      headers: {
        'Content-Type': 'text/plain'
      },
      data: {
        name: this.state.name,
        password: this.state.password
      }
    }).then(function(response) {
      that.handleLogin(response.headers['x-auth-token']);
    }.bind(this)).catch(function(response) {
        that.setState({name: '', password: ''})
        that.refs.notification.addNotificationAtDifferentPos('Fehler!', 'Die Kombination aus Name und Passwort stimmt nicht überein! Bitte versuche Sie es noch einmal.',  'error', 'tr');
    });
  }

  logout() {
    localStorage.setItem('jwt', '');
    localStorage.setItem('username', '');
    this.setState({name: '', password: '', loggedIn: false})
    this.props.updateNavbar();
  }

  switchToRegistrationPage(){
    browserHistory.push('/registration');
  }

  render() {
    var content;
    if(this.state.loggedIn){
      content = <div>
        <div><span>{localStorage.getItem('username')}</span>
        </div>
        <div className="buttonDiv">
          <IconButton text="LOGOUT" glyphIcon="glyphicon-log-out" onClick={this.logout.bind(this)}/>
        </div>
      </div>;
    }else{
      content = <div className="login">
        <input type="text" placeholder="BENUTZERNAME" value={this.state.name} onChange={this.updateName.bind(this)}/>
        <input type="password" placeholder="PASSWORD" value={this.state.password} onChange={this.updatePassword.bind(this)}/>
        <div className="buttonDiv">
          <IconButton text="LOGIN" glyphIcon="glyphicon-log-in" onClick={this.login.bind(this)}/>
        </div>
        <div>
          <a role="button" onClick={this.switchToRegistrationPage.bind(this)}>Anmelden</a>&nbsp;&nbsp;<a>Passwort vergessen</a>
        </div>
      </div>;
    }

    return (
      <div className="login-menu-item">
        {content}
        <Notification ref="notification"/>
      </div>
    );
  }
}

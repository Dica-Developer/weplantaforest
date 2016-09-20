import React, {Component} from 'react';
import axios from 'axios';

import Notification from '../components/Notification';

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
    localStorage.setItem('jwt', token);
    localStorage.setItem('username', this.state.name)
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
      that.props.updateComponent();
    }.bind(this)).catch(function(response) {
        that.setState({name: '', password: ''})
        that.refs.notification.addNotificationAtDifferentPos('Fehler!', 'Die Kombination aus Name und Passwort stimmt nicht überein! Bitte versuche Sie es noch einmal.',  'error', 'tr');
    });
  }

  logout() {
    localStorage.setItem('jwt', '');
    localStorage.setItem('username', '');
    this.setState({name: '', password: '', loggedIn: false})
    this.props.updateComponent();
  }

  render() {
    var content;
    if(this.state.loggedIn){
      content = <div>
        <div><span>{localStorage.getItem('username')}</span>
        </div>
        <div className="buttonDiv">
          <button type="button" onClick={this.logout.bind(this)}>LOGOUT</button>
        </div>
      </div>;
    }else{
      content = <div className="login">
        <input type="text" placeholder="BENUTZERNAME" value={this.state.name} onChange={this.updateName.bind(this)}/>
        <input type="password" placeholder="PASSWORD" value={this.state.password} onChange={this.updatePassword.bind(this)}/>
        <div className="buttonDiv">
          <button type="submit" onClick={this.login.bind(this)}>LOGIN</button>
        </div>
        <div>
          <a>Regisitrieren</a>&nbsp;&nbsp;<a>Passwort vergessen</a>
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

import React, {Component} from 'react';
import axios from 'axios';

export default class LoginMenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      showError: false,
      loggedIn: (localStorage.getItem('jwt') != null && localStorage.getItem('jwt') != '')
    };

    this.updateName = this.updateName.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.showErrorMessageAndClearInputFields = this.showErrorMessageAndClearInputFields.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  updateName(e) {
    this.setState({name: e.target.value, showError: false})
  }

  updatePassword(e) {
    this.setState({password: e.target.value, showError: false})
  }

  showErrorMessageAndClearInputFields() {
    this.setState({name: '', password: '', showError: true})
  }

  handleLogin(token) {
    localStorage.setItem('jwt', token);
    localStorage.setItem('username', this.state.name)
    this.setState({loggedIn: true})
  }

  login() {
    var error = false;
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
      this.handleLogin(response.headers['x-auth-token']);
      //    window.location = '/';
    }.bind(this)).catch(function(response) {
      this.showErrorMessageAndClearInputFields();
    }.bind(this));
  }

  logout() {
    localStorage.setItem('jwt', '');
    localStorage.setItem('username', '');
    this.setState({name: '', password: '', loggedIn: false})
  }

  render() {
    return (
      <div className="login-menu-item">
        {this.state.loggedIn
          ? null
          : <input type="text" placeholder="BENUTZERNAME" value={this.state.name} onChange={this.updateName}/>}
        {this.state.loggedIn
          ? null
          : <input type="password" placeholder="PASSWORD" value={this.state.password} onChange={this.updatePassword}/>}
        {this.state.loggedIn
          ? null
          : <button type="submit" className="btn btn-default" onClick={this.login}>LOGIN
          </button>}
        {this.state.loggedIn
          ? <span>
              {localStorage.getItem('username')}</span>
          : null}
        {this.state.loggedIn
          ? <button type="button" className="btn btn-default" onClick={this.logout}>LOGOUT</button>
          : null}
        {this.state.showError
          ? <p className="validation-text">Die Kombination aus Name und Passwort stimmt nicht überein! Bitte versuchen Sie es noch einmal.</p>
          : null}
      </div>
    );
  }
}

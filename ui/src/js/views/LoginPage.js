import React, {
  Component
} from 'react';
import Accounting from 'accounting';
import Boostrap from 'bootstrap';
import axios from 'axios';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

class LoginModule extends Component {
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
    this.setState({
      name: e.target.value,
      showError: false
    })
  }

  updatePassword(e) {
    this.setState({
      password: e.target.value,
      showError: false
    })
  }

  showErrorMessageAndClearInputFields() {
    this.setState({
      name: '',
      password: '',
      showError: true
    })
  }

  handleLogin(token) {
    localStorage.setItem('jwt', token);
    this.setState({
      loggedIn: true
    })
  }

  login() {
    // Send a POST request
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
        window.location = '/';
      }.bind(this))
      .catch(function(response) {
        this.showErrorMessageAndClearInputFields();
      }.bind(this));
  }

  logout() {
    localStorage.setItem('jwt', '');
    this.setState({
      loggedIn: false
    })
  }

  render() {
    return (<div className="container">
      <input type="text" className="form-control" placeholder="username" value={this.state.name} onChange={this.updateName}/>
      <input type="password" className="form-control" placeholder="password" value={this.state.password} onChange={this.updatePassword}/>
      <button type="button" className="btn btn-default" onClick={this.login}>Login</button>
      { this.state.showError ?  <span className="validation-text">Die Kombination aus Name und Passwort stimmt nicht überein! Bitte versuchen Sie es noch einmal.</span> : null }
      { this.state.loggedIn ? <button type="button" className="btn btn-default" onClick={this.logout}>Logout</button> : null}
  </div>);
  }
}

export default class LoginPage extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <LoginModule />
        <Footer/>
      </div>);
  }
}

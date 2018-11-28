import React, {
  Component
} from 'react';
import axios from 'axios';
import {
  browserHistory
} from 'react-router';
import Accounting from 'accounting';

import Translate from 'react-translate-component';
import counterpart from 'counterpart';

import Notification from '../components/Notification';
import IconButton from '../components/IconButton';
import {createProfileImageUrl} from '../ImageHelper';

export default class LoginMenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      loggedIn: (localStorage.getItem('jwt') != null && localStorage.getItem('jwt') != ''),
      userDetails: {
        imageFileName: 'default',
        co2Data: {}
      }
    };
  }

  componentDidMount() {
    if (localStorage.getItem('username') && localStorage.getItem('username') != '') {
      this.loadUserDetails();
    }
  }

  updateName(e) {
    this.setState({
      name: e.target.value
    });
  }

  updatePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  showErrorMessageAndClearInputFields() {
    this.setState({
      name: '',
      password: ''
    });
  }

  handleLogin(token) {
    var that = this;
    localStorage.setItem('jwt', token);
    localStorage.setItem('username', this.state.name);

    axios.get('http://localhost:8081/user/language?userName=' + this.state.name).then(function(response) {
      var result = response.data;
      if (localStorage.getItem('language') != result) {
        that.props.updateLanguage(result);
      }
      that.isAdmin();
    }).catch(function(error) {
        that.refs.notification.handleError(error);
    });

  }

  isAdmin() {
    var that = this;
    var config = {
      headers: {
        'X-AUTH-TOKEN': localStorage.getItem('jwt')
      }
    };
    axios.get('http://localhost:8081/isAdmin', config).then(function(response) {
      var result = response.data;
      localStorage.setItem('isAdmin', result);
      that.setState({
        loggedIn: true,
        name: '',
        password: ''
      });
      that.loadUserDetails();
    }).catch(function(error) {
      that.refs.notification.handleError(error);
    });
  }

  loadUserDetails() {
    var that = this;
    var config = {
      headers: {
        'X-AUTH-TOKEN': localStorage.getItem('jwt')
      }
    };
    axios.get('http://localhost:8081/user?userName=' + localStorage.getItem('username'), config).then(function(response) {
      var result = response.data;
      that.setState({
        userDetails: result
      });
      localStorage.setItem('userDetails', JSON.stringify(result));
      that.props.updateNavbar();
    }).catch(function(error) {
      that.refs.notification.handleError(error);
    });
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
    }.bind(this)).catch(function(error) {
      that.setState({
        name: '',
        password: ''
      });
      if(error.response.data.reason == 'LOCKED'){
        that.refs.notification.addNotificationAtDifferentPos(counterpart.translate('ERROR'), counterpart.translate('LOCKED_USER'), 'error', 'tr');
      }else if(error.response.data.reason == 'BAD_CREDENTIALS') {
        that.refs.notification.addNotificationAtDifferentPos(counterpart.translate('ERROR'), counterpart.translate('WRONG_USERNAME_PASSWORD'), 'error', 'tr');
      }
    });
  }

  logout() {
    localStorage.setItem('jwt', '');
    localStorage.setItem('username', '');
    localStorage.setItem('isAdmin', false);
    localStorage.setItem('userDetails', '');
    this.setState({
      name: '',
      password: '',
      loggedIn: false
    });
    this.linkTo('/');
    this.props.updateNavbar();
  }

  linkTo(url) {
    browserHistory.push(url);
  }

  handleKeyPress(event) {
    if (event.key == 'Enter') {
      this.login();
    }
  }

  render() {
    var content;
    if (localStorage.getItem('username') && localStorage.getItem('username') != '') {
      let imageUrl = createProfileImageUrl(this.state.userDetails.imageFileName, 50, 50);

      content = <div className="login-user-details">
        <div>
          <img src={imageUrl} alt="profile" width="50" height="50"/>
        </div>
        <div>
          <span className="glyphicon glyphicon-user" aria-hidden="true"></span>
          <label>{localStorage.getItem('username')}</label>
          <br/>
          <span className="glyphicon glyphicon-tree-deciduous" aria-hidden="true"></span>
          <label>{this.state.userDetails.co2Data.treesCount}</label>
          <br/>
          <span className="glyphicon glyphicon glyphicon-cloud" aria-hidden="true"></span>
          <label>{Accounting.formatNumber(this.state.userDetails.co2Data.co2, 0, '.', ',')} tCO<sub>2</sub></label>
        </div>
        <div className="logout-div">
          <a onClick={this.logout.bind(this)}>logout</a>
        </div>
      </div>;
    } else {
      content = <div className="login">
        <input type="text" placeholder={counterpart.translate('USERNAME')} value={this.state.name} onChange={this.updateName.bind(this)} onKeyPress={this.handleKeyPress.bind(this)}/>
        <input type="password" placeholder={counterpart.translate('PASSWORD')} value={this.state.password} onChange={this.updatePassword.bind(this)} onKeyPress={this.handleKeyPress.bind(this)}/>
        <div className="login-interact">
          <a role="button" onClick={() => {
            this.linkTo('/forgotPassword');
          }}>{counterpart.translate('FORGOT_PASSWORD')}</a>
        </div>
        <div className="buttonDiv">
          <IconButton text={counterpart.translate('LOGIN')} glyphIcon="glyphicon-log-in" onClick={this.login.bind(this)}/>
        </div>
        <div className="login-interact">
          <a role="button" onClick={() => {
            this.linkTo('/registration');
          }}>{counterpart.translate('REGISTRATE')}</a>
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

import React, {Component} from 'react';
import {
  browserHistory
} from 'react-router';

require('./userDetails.less');

export default class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  logout(){
    localStorage.setItem('jwt', '');
    localStorage.setItem('username', '');
    localStorage.setItem('userDetails', '');
    localStorage.setItem('isAdmin', false);
    this.setState({name: '', password: '', loggedIn: false});
    browserHistory.push('/');
    this.props.updateNavbar();
  }

  render() {
    return (
      <div className="user-details">
        <a className="logout-link" onClick={this.logout.bind(this)} className="pull-right">logout</a>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

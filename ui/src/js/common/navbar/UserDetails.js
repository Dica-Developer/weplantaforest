import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';

import Menu from './Menu';
import MenuItem from './MenuItem';
import LanguageMenuItem from './LanguageMenuItem';
import PlantBag from './PlantBag';
import LoginMenuItem from './LoginMenuItem';
import BackOfficeMenuItem from './BackOfficeMenuItem';
import ImageButton from '../components/ImageButton';
import axios from 'axios';

require("./userDetails.less");

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
    this.props.updateNavbar();
  }

  render() {
    return (
      <div className="user-details">
        <span className="glyphicon glyphicon-user" aria-hidden="true"></span>
        <label>{this.props.user.userName}</label>
        <br/>
        <span className="glyphicon glyphicon-tree-deciduous" aria-hidden="true"></span>
        <label>{this.props.user.co2Data.treesCount}</label>
        <a className="logout-link" onClick={this.logout.bind(this)} className="pull-right">logout</a>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
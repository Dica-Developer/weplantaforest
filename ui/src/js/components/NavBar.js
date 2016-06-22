import React, {
  Component
} from 'react';
import {
  Link
} from 'react-router';

export default class NavBar extends Component {
  render() {
    return (
  <nav id="navBar" className="navbar navbar-default navbar-fixed-top">
    <div className="navbar-header">
      <button className="navbar-toggle navbar-left" type="button" data-toggle="collapse" data-target="#navbarLinkBar" aria-expanded="false">
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <a href="/" className="navbar-brand navbar-right">
        <img alt="I Plant A Tree" src="assets/images/ipat_logo.jpg" />
      </a>
    </div>
    <div className="collapse navbar-collapse" id="navbarLinkBar">
      <ul className="nav navbar-nav">
        <li>
          <Link to="/plant">Pflanzen</Link>
        </li>
        <li>
          <Link to='/explore'>Entdecken</Link>
        </li>
      </ul>
      <form className="navbar-form navbar-left" role="search">
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Search" />
        </div>
        <button type="submit" className="btn btn-default">Suchen</button>
      </form>
      <ul className="nav navbar-nav navbar-right">
        <li>
          <a href="#">Login</a>
        </li>
      </ul>
    </div>
  </nav>);
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

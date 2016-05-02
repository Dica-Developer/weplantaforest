import React, {Component} from 'react';

export default class NavBar extends Component {
  render() {
    return (
    <nav id="navBar" className="navbar navbar-default navbar-fixed-top">
    <div className="container">
    <div className="navbar-header">
      <button className="navbar-toggle" type="button">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <a href="#" className="navbar-brand">
        <img alt="I Plant A Tree" src="assets/images/ipat_logo.jpg" />
      </a>
    </div>
    <div className="navbar-collapse collapse" id="navbar-main">
      <ul className="nav navbar-nav">
        <li>
        <a href="#/plant">Pflanzen</a>
        </li>
        <li>
        <a href="#/explore">Entdecken</a>
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
  </div>
  </nav>);
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */ 


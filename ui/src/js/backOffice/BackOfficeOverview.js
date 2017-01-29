import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';
import axios from 'axios';
import {
  browserHistory
} from 'react-router';

require("./backOfficeOverview.less");

class BackofficeLink extends Component {
  constructor(props) {
    super(props);
  }

  linkTo(url) {
    browserHistory.push(url);
  }

  render() {
    return (
      <div className="col-md-4 ">
      <a role="button"  onClick={() => {
        this.linkTo(this.props.url)
      }} >
      <div className="backoffice-link">
        <span className={"glyphicon " + this.props.glyphIcon} aria-hidden="true"></span>
        <br/>
        <span>
          {this.props.text}
        </span>
      </div>
      </a>
      </div>
    );
  }
}

export default class BackOfficeOverview extends Component {

  constructor() {
    super();
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="container paddingTopBottom15 backOfficeOverview">
          <div className="row ">
            <div className="col-md-12">
              <h2>Backoffice</h2>
            </div>
          </div>
          <div className="row ">
            <BackofficeLink text="Artikel-Manager" url="/article-manager" glyphIcon="glyphicon-text-size"/>
            <BackofficeLink text="Cart-Manager" url="/cart-manager" glyphIcon="glyphicon-shopping-cart"/>
            <BackofficeLink text="Projekt-Manager" url="/project-manager" glyphIcon="glyphicon-tags"/>
            <BackofficeLink text="User-Manager" url="/user-manager" glyphIcon="glyphicon-user"/>
            <BackofficeLink text="TreeType-Manager" url="/treeType-manager" glyphIcon="glyphicon-leaf"/>
            <BackofficeLink text="Plant-Manager" url="/plant-manager" glyphIcon="glyphicon-tree-deciduous"/>
            <BackofficeLink text="Event-Manager" url="/event-manager" glyphIcon="glyphicon-list-alt"/>
          </div>
        </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

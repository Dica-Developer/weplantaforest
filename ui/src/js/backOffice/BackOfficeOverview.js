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

export default class BackOfficeOverview extends Component {

  constructor() {
    super();
  }

  componentDidMount() {

  }

  linkTo(url) {
    browserHistory.push(url);
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
            <div className="col-md-4 ">
            <a role="button"  onClick={() => {
              this.linkTo('/article-manager')
            }} >
            <div className="backoffice-link">
              <span className={("glyphicon glyphicon-text-size")} aria-hidden="true"></span>
              <br/>
              <span>
                Artikel-Manager
              </span>
            </div>
            </a>
            </div>
            <div className="col-md-4">
            <a role="button"  onClick={() => {
              this.linkTo('/cart-manager')
            }} >
            <div className="backoffice-link">
              <span className={("glyphicon glyphicon-shopping-cart")} aria-hidden="true"></span>
              <br/>
              <span>
                Cart-Manager
              </span>
            </div>
            </a>
            </div>
            <div className="col-md-4">
            <a role="button"  onClick={() => {
              this.linkTo('/project-manager')
            }} >
            <div className="backoffice-link">
              <span className={("glyphicon glyphicon-tags")} aria-hidden="true"></span>
              <br/>
              <span>
                Projekt-Manager
              </span>
            </div>
            </a>
            </div>
            <div className="col-md-4">
            <a role="button"  onClick={() => {
              this.linkTo('/user-manager')
            }} >
            <div className="backoffice-link">
              <span className={("glyphicon glyphicon-user")} aria-hidden="true"></span>
              <br/>
              <span>
                User-Manager
              </span>
            </div>
            </a>
            </div>
            <div className="col-md-4">
            <a role="button"  onClick={() => {
              this.linkTo('/plant-manager')
            }}>
            <div className="backoffice-link">
              <span className={("glyphicon glyphicon-tree-deciduous")} aria-hidden="true"></span>
              <br/>
              <span>
                Plant-Manager
              </span>
            </div>
            </a>
            </div>
            <div className="col-md-4">
            <a role="button"  onClick={() => {
              this.linkTo('/event-manager')
            }}>
            <div className="backoffice-link">
              <span className={("glyphicon glyphicon-list-alt")} aria-hidden="true"></span>
              <br/>
              <span>
                Event-Manager
              </span>
            </div>
            </a>
            </div>
          </div>
        </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

import axios from 'axios';
import React, {Component} from 'react';
import {render} from 'react-dom';
import moment from 'moment';
import {Link} from 'react-router';

import Boostrap from 'bootstrap';

require("./rankingContainer.less");

export default class TimeRankingTeaserLarge extends Component {
  constructor(props) {
    super(props);
  }

  callNextPage() {
    if (!this.props.isLastPage) {
      this.props.callNextPage();
    }
  }

  callPreviousPage() {
    if (!this.props.isLastPage) {
      this.props.callPreviousPage();
    }
  }

  render() {
    var leftIcon;
    var rightIcon;
    if (this.props.isFirstPage) {
      leftIcon = "";
    } else {
      leftIcon = "glyphicon-chevron-left";
    };

    if (this.props.isLastPage) {
      rightIcon = "";
    } else {
      rightIcon = "glyphicon-chevron-right";
    };

    return (
      <div className="timeRankingLarge">
        <div className="col-md-12">
          <h2>Pflanzungen</h2>
        </div>
        <div className="col-md-6 left">
          <div className="rankingWrapper">
            {this.props.children.map(function(child, i) {
              if (i < 5) {
                return (child);
              }
            })}
          </div>
          <a className="carousel-control pagingLink" role="button" role="button" onClick={this.callPreviousPage.bind(this)}>
            <span className={"glyphicon " + leftIcon}></span>
          </a>
        </div>
        <div className="col-md-6 right">
          <a className="carousel-control pagingLink rightLink" role="button" onClick={this.callNextPage.bind(this)}>
            <span className={"glyphicon " + rightIcon}></span>
          </a>
          <div className="rankingWrapper">
            {this.props.children.map(function(child, i) {
              if (i >= 5) {
                return (child);
              }
            })}
          </div>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

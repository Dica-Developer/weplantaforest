import axios from 'axios';
import React, {Component} from 'react';
import {render} from 'react-dom';
import Boostrap from 'bootstrap';

require("./largeRankingContainer.less");

export default class LargeRankingContainer extends Component {
  constructor(props) {
    super(props);
  }

  callNextPage() {
    if (!this.props.isLastPage) {
      this.props.callNextPage();
    }
  }

  callPreviousPage() {
    if (!this.props.isFirstPage) {
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
      <div className={"largeRankingContainer " + this.props.styleClass}>
      <div className="row">
        <div className="col-md-12">
          <h2>Pflanzungen</h2>
        </div>
      </div>
        <div className="row rankingWrapper">
          <div className="col-md-4">
            <a className="pagingLink left" role="button" onClick={this.callPreviousPage.bind(this)}>
              <span className={"glyphicon " + leftIcon}></span>
            </a>
            {this.props.children.map(function(child, i) {
              if (i < 5) {
                return (child);
              }
            })}
          </div>
          <div className="col-md-4">
            {this.props.children.map(function(child, i) {
              if (i >= 5 && i < 10) {
                return (child);
              }
            })}
          </div>
          <div className="col-md-4">
          <a className="pagingLink right" role="button" onClick={this.callNextPage.bind(this)}>
            <span className={"glyphicon " + rightIcon}></span>
          </a>
            {this.props.children.map(function(child, i) {
              if (i >= 10) {
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

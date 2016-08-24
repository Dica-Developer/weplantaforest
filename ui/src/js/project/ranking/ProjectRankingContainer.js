import axios from 'axios';
import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';

require("./projectRankingContainer.less");

export default class ProjectRankingContainer extends Component {
  constructor(props) {
    super(props);

  }

  callNextPage() {
    if(!this.props.isLastPage){
      this.props.callNextPage(this.props.rankingType, this.props.page);
    }
  }

  callPreviousPage() {
    if(!this.props.isFirstPage){
      this.props.callPreviousPage(this.props.rankingType, this.props.page);
    }
  }

  render() {
    var topIcon;
    var bottomIcon;
    if (!this.props.isFirstPage) {
      topIcon = "glyphicon-menu-up";
    } else {
      topIcon = "glyphicon-minus";
    };
    if (!this.props.isLastPage) {
      bottomIcon = "glyphicon-menu-down";
    } else {
      bottomIcon = "glyphicon-minus";
    };
    return (
      <div className="projectRankingContainer">
        <h2>
          <i>{this.props.title}</i>
        </h2>
        <a className="pagingLink" role="button" onClick={this.callPreviousPage.bind(this)}>
          <div>
          <span className={"glyphicon " + topIcon}></span>
          </div>
        </a>
        <div className="rankingWrapper">
          {this.props.children}
        </div>
        <a className="pagingLink" role="button" onClick={this.callNextPage.bind(this)}>
          <div>
          <span className={"glyphicon " + bottomIcon}></span>
          </div>
        </a>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

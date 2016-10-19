import axios from 'axios';
import React, {Component} from 'react';
import {render} from 'react-dom';
import Boostrap from 'bootstrap';

require("./projectRankingContainer.less");

export default class ProjectRankingContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fade: false
    };
    this.fadingDone = this.fadingDone.bind(this);
  }

  componentDidMount() {
    const elm = this.refs.ranking;
    elm.addEventListener('animationend', this.fadingDone);
  }
  componentWillUnmount() {
    const elm = this.refs.ranking;
    elm.removeEventListener('animationend', this.fadingDone);
  }
  fadingDone() {
    this.setState({fade: false});
  }

  callNextPage() {
    if (!this.props.isLastPage) {
      this.props.callNextPage(this.props.rankingType, this.props.page);
    }
    this.setState({fade: true});
  }

  callPreviousPage() {
    if (!this.props.isFirstPage) {
      this.props.callPreviousPage(this.props.rankingType, this.props.page);
    }
    this.setState({fade: true});
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
        <div ref="ranking" className={(this.state.fade
          ? 'fadeOut'
          : 'fadeIn') + " rankingWrapper"}>
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

import counterpart from 'counterpart';
import React, { Component } from 'react';

require('./largeRankingContainer.less');

export default class LargeRankingContainer extends Component {
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
    this.setState({ fade: false });
  }

  callNextPage() {
    if (!this.props.isLastPage) {
      this.props.callNextPage();
    }
    this.setState({ fade: true });
  }

  callPreviousPage() {
    if (!this.props.isFirstPage) {
      this.props.callPreviousPage();
    }
    this.setState({ fade: true });
  }

  render() {
    var leftIconVisible;
    var rightIconVisible;
    if (this.props.isFirstPage) {
      leftIconVisible = 'no-display';
    } else {
      leftIconVisible = '';
    }

    if (this.props.isLastPage) {
      rightIconVisible = 'no-display';
    } else {
      rightIconVisible = '';
    }

    return (
      <div className={'largeRankingContainer ' + this.props.styleClass}>
        <div className="row">
          <div className="col-md-12">
            <h1>{counterpart.translate('PLANTINGS')}</h1>
          </div>
        </div>
        <div ref="ranking" className={(this.state.fade ? 'fadeOut' : 'fadeIn') + ' row rankingWrapper'}>
          <div className="col-md-4 widthforty">
            <a className={'pagingLink left ' + leftIconVisible} role="button" onClick={this.callPreviousPage.bind(this)}>
              <span className="glyphicon glyphicon-chevron-left"></span>
            </a>
          </div>
          <div className="col-md-4">
            {this.props.children.map(function(child, i) {
              if (i < 5) {
                return child;
              }
            })}
          </div>
          <div className="col-md-4">
            {this.props.children.map(function(child, i) {
              if (i >= 5 && i < 10) {
                return child;
              }
            })}
          </div>
          <div className="col-md-4">
            {this.props.children.map(function(child, i) {
              if (i >= 10) {
                return child;
              }
            })}
          </div>
          <div className="col-md-4 widthforty">
            <a className={'pagingLink right ' + rightIconVisible} role="button" onClick={this.callNextPage.bind(this)}>
              <span className="glyphicon glyphicon-chevron-right"></span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

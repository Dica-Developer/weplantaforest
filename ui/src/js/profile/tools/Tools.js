import React, { Component } from 'react';
import Banner from './Banner';
import ButtonBar from './ButtonBar';
import Certificates from './Certificates';
import Overview from './Overview';
import Receipts from './Receipts';
import Widgets from './Widgets';


require('./tools.less');

export default class Tools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'overview',
      iindex: 0
    };
  }

  switchTo(value, index) {
    this.setState({view: value, iindex: index});
  }

  render() {
    var content;
    switch (this.state.view) {
      case 'overview':
        content = <Overview switchTo={this.switchTo.bind(this)}/>;
        break;
      case 'certificates':
        content = <Certificates view={this.state.view}/>;
        break;
      case 'receipts':
        content = <Receipts view={this.state.view} />;
        break;
      case 'banner':
        content = <Banner view={this.state.view} />;
        break;
      case 'widgets':
        content = <Widgets view={this.state.view} />;
        break;
      default:
        break;
    }

    return (
      <div className="row tools">
        <div className="col-md-12">
          <ButtonBar switchTo={this.switchTo.bind(this)} clickedIndex={this.state.iindex} />
        </div>
        {content}
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */

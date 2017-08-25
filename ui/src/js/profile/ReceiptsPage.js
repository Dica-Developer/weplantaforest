import axios from 'axios';
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';
import Boostrap from 'bootstrap';

import Receipts from './tools/Receipts';

require("./receipts.less");

export default class Tools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'receipts'
    };
  }

  switchTo(value) {
    this.setState({view: value})
  }

  render() {
    var content;
    switch (this.state.view) {
      case 'receipts':
        content = <Receipts view={this.state.view} switchTo={this.switchTo.bind(this)}/>;
        break;
      default:
        break;
    }

    return (
      <div className="container paddingTopBottom15">
        {content}
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */

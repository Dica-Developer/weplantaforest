import axios from 'axios';
import React, {Component} from 'react';
import {render} from 'react-dom';
import Boostrap from 'bootstrap';

require("./ranking.less");


export default class RankingTeaser extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ranking">
        <h2>
          <i>{this.props.title}</i>
        </h2>
        {this.props.children}
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

import React, { Component } from 'react';
import DoPlanting from './DoPlanting';

require('./selfPlant.less');

export default class SelfPlantPage extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  loadUserDetails() {
    this.props.route.loadUserDetails();
  }

  render() {
    return (
      <div className="container paddingTopBottom15 selfPlant">
        <DoPlanting loadUserDetails={this.loadUserDetails.bind(this)} />
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

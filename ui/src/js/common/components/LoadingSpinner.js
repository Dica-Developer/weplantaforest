import React, { Component } from 'react';
import { CopperLoading } from 'respinner';

export default class LoadingSpinner extends Component {
  constructor(props) {
    super(props);
  }

  showSpinner() {
    this.refs['spinner'].classList.add('fadeIn');
  }

  hideSpinner() {
    this.refs['spinner'].classList.remove('fadeIn');
  }

  render() {
    return (
      <div ref="spinner" className="spinner-div">
        <div>
          <CopperLoading fill="#82ab1f" size={100} />
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import {
  CopperLoading
} from 'respinner';

import $ from 'jquery';

export default class LoadingSpinner extends Component {

  constructor(props) {
    super(props);
  }

  showSpinner(value) {
    $(this.refs['spinner']).fadeIn(400);
  }

  hideSpinner(value) {
      $(this.refs['spinner']).fadeOut(400);
  }

  render() {
    return (
      <div ref="spinner" className="spinner-div">
        <div>
          <CopperLoading fill="#82ab1f" size={100}/>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

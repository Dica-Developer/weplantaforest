import axios from 'axios';
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import {Link} from 'react-router';

import Boostrap from 'bootstrap';

export default class LoadingItem extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className={this.props.colSize + " loadingItem "} style={{backgroundColor: this.props.background}}>
        <h2>Daten werden geladen...</h2>
        <div>
          <span className="glyphicon glyphicon-refresh spinning"></span>
        </div>
      </div>
    );
  }
}
LoadingItem.defaultProps = { colSize: 'col-md-4' };
/* vim: set softtabstop=2:shiftwidth=2:expandtab */

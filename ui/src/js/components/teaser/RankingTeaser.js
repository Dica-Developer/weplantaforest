import axios from 'axios';
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';

import Boostrap from 'bootstrap';

export default class RankingTeaser extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={"col-md-4  " + this.props.background}>
          <h2>{this.props.title}</h2>
          {this.props.content.content.map(function(content) {
            let co2Rounded = Math.round(content.co2Saved * 1000) / 1000;
            return (
              <div>
                <img className="ranking-img" src="/assets/images/ipat_logo.png" alt="logo" width="60" height="60"/>
                <div className="rankingSummary">
                  <p >
                    <span className="name">{content.name}</span><br/>
                    <span className="stats">Baeume gepflant: {content.amount}</span><br/>
                    <span className="stats">CO<sub>2</sub> gebunden:</span>
                    <span className="stats">{co2Rounded}
                      t</span>
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

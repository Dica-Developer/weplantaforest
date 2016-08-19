import axios from 'axios';
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import moment from 'moment';

import Boostrap from 'bootstrap';

export default class TimeRankingTeaser extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var imageFolder = this.props.imageFolder;
    return (
      <div className={"col-md-4 " + this.props.background + " " + this.props.headerSize + " timeRanking"}>
        <h2>
          <i>{this.props.title}</i>
        </h2>
        {this.props.content.content.map(function(content) {
          let imageUrl = 'http://localhost:8081/' + imageFolder + '/image/' + content.treeTypeImageName + '/60/60';
          return (
            <div>
              <img className="ranking-img" src={imageUrl} alt="logo"/>
              <div className="rankingSummary">
                <p >
                  <span className="name">{content.name}</span><br/>
                  <span className="stats">B&auml;ume gepflant:&nbsp;{content.amount}</span><br/>
                  <span className="stats">Datum:</span>
                  <span className="stats">{moment(content.plantedOn).format("DD.MM.YYYY")}</span>
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

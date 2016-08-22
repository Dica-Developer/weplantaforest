import axios from 'axios';
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import Accounting from 'accounting';
import {Link} from 'react-router';

import Boostrap from 'bootstrap';
import LoadingItem from '../../components/LoadingItem';

export default class RankingTeaser extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var imageFolder = this.props.imageFolder;
    var content = {};

    if (this.props.content.content[0]) {
      content["1"] =   <div>
          <h2>
            <i>{this.props.title}</i>
          </h2>
          {this.props.content.content.map(function(content, i) {
            let co2Rounded = Accounting.formatNumber(content.co2Saved * 1000 / 1000, 3, ".", ",");
            let imageUrl = 'http://localhost:8081/' + imageFolder + '/image/' + content.imageName + '/60/60';
            return (
              <div key={i}>
                <img className="ranking-img" src={imageUrl} alt="logo"/>
                <div className="rankingSummary">
                  <p >
                    <Link to={`/` + imageFolder +`/` + content.name}>
                      <span className="name">{content.name}</span>
                    </Link>
                    <br/>
                    <span className="stats">B&auml;ume gepflant:&nbsp;{content.amount}</span><br/>
                    <span className="stats">CO<sub>2</sub>&nbsp;gebunden:</span>
                    <span className="stats">{co2Rounded}&nbsp;t</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>;
    }else{
      content["1"] = <LoadingItem/>;
    };

    return (
      <div className="col-md-4 ranking" style={{backgroundColor: this.props.background}}>
        {content["1"]}
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

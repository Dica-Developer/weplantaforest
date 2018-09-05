import axios from 'axios';
import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import {
  Map,
  Marker,
  Popup,
  TileLayer,
  Polygon
} from 'react-leaflet';
import {
  browserHistory
} from 'react-router';
import Boostrap from 'bootstrap';

import {
  getTextForSelectedLanguage,
  getFirstParagraph
} from '../common/language/LanguageHelper';

export default class ProjectTeaser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapCenter: [0, 0]
    }
  }

  linkTo(url) {
    browserHistory.push(url);
  }

  calcCenterOfMap() {
    let lat = 0;
    let lng = 0;
    if (this.props.content.positions && this.props.content.positions.length > 0) {
      for (let pos of this.props.content.positions) {
        lat += pos.lat;
        lng += pos.lng;
      }
      lat = lat / this.props.content.positions.length;
      lng = lng / this.props.content.positions.length;
      this.setState({
        mapCenter: [lat, lng]
      });

    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.content !== this.props.content) {
      this.calcCenterOfMap();
    }
  }

  render() {
    return (
      <div>
      <a role="button" onClick={() => {
        this.linkTo('/projects/' + this.props.content.name);
      }}>
      <Map center={this.state.mapCenter} zoom={12} scrollWheelZoom={false} dragging={false}>
        <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
        <Polygon positions={this.props.content.positions} color={'#82AB1f'}></Polygon>
      </Map>
          <h1>
            {this.props.content.name}
          </h1>
          <div className="description">
            <p dangerouslySetInnerHTML={{
              __html: getFirstParagraph(getTextForSelectedLanguage(this.props.content.description))
            }}/>
          </div>
        </a>
      </div>
    );
  }
}

ProjectTeaser.defaultProps = {
  content: {
    latitude: 0,
    longitude: 0,
    projectName: '',
    description: ''
  }
};

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

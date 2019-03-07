import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import axios from 'axios';
import counterpart from 'counterpart';
import {
  Map,
  TileLayer,
  Polygon
} from 'react-leaflet';

export default class Captcha extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapCenter: [0, 0]
    }
  }

  componentDidMount() {
    this.calcCenterOfMap();
    this.setState({positions: this.props.positions});
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.positions !== this.props.positions) {
      this.calcCenterOfMap();
      this.setState({positions: this.props.positions})
    }
  }

  calcCenterOfMap() {
    let lat = 0;
    let lng = 0;
    if (this.props.positions && this.props.positions.length > 0) {
      for (let pos of this.props.positions) {
        lat += pos.lat;
        lng += pos.lng;
      }
      lat = lat / this.props.positions.length;
      lng = lng / this.props.positions.length;
      this.setState({
        mapCenter: [lat, lng]
      });
    }
  }

  render() {
    return (
      <Map center={this.state.mapCenter} zoom={14} scrollWheelZoom={false} dragging={false}>
        <TileLayer url='https://{s}.tile.osm.org/{z}/{x}/{y}.png' attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'/>
        <Polygon positions={this.state.positions} color={'#82AB1f'}></Polygon>
      </Map>
    );
  }
}

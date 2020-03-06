import axios from 'axios';
import counterpart from 'counterpart';
import React, { Component } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import Notification from '../common/components/Notification';

require('./selfPlantOverview.less');

export default class SelfPlantOverviewPage extends Component {
  constructor() {
    super();
    this.state = {
      trees: [],
      myTree: { latitude: 0, longitude: 0 }
    };
  }

  componentDidMount() {
    var that = this;
    axios
      .get('http://localhost:8081/trees/selfPlanted')
      .then(function(response) {
        var result = response.data;
        that.setState({ trees: result });
        that.getMyTree();
      })
      .catch(function(error) {
        that.refs.notification.handleError(error);
      });
  }

  getMyTree() {
    for (let tree of this.state.trees) {
      if (tree.id == this.props.params.treeId) {
        this.setState({ myTree: tree });
      }
    }
  }

  render() {
    let that = this;
    let myIcon = L.divIcon({ className: 'glyphicon glyphicon-tree-deciduous' });
    let myTreeIcon = L.divIcon({ className: 'glyphicon glyphicon-tree-deciduous my-tree' });
    return (
      <div className="container paddingTopBottom15 selfPlantOverview">
        <div className="row">
          <div className="col-md-12">
            <h1>{counterpart.translate('TREE_LOCATION')}</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Map id="all-self-planted-map" center={[this.state.myTree.latitude, this.state.myTree.longitude]} zoom={10}>
              <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors' />
              <Marker position={[this.state.myTree.latitude, this.state.myTree.longitude]} ref="marker" icon={myTreeIcon} />
              {this.state.trees.map(function(tree, i) {
                if (tree.latitude && tree.longitude) {
                  if (tree.id != that.props.params.treeId) {
                    return <Marker key={i} position={[tree.latitude, tree.longitude]} ref={'marker-' + i} icon={myIcon} />;
                  }
                } else {
                  return '';
                }
              })}
            </Map>
          </div>
        </div>
        <Notification ref="notification" />
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

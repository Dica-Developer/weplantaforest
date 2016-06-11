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
  TileLayer
} from 'react-leaflet';
import Boostrap from 'bootstrap';

export default class Project extends Component {

  constructor() {
    super();
    this.state = {
      project: {
        name: 'default project',
        projectImageFileName: 'test.jpg',
        latitude: 0,
        longitude: 0
      }
    };
  }

  componentDidMount() {
    var that = this;
    axios.get('http://localhost:8081/projects/search/name/' + encodeURIComponent(this.props.projectName)).then(function (response) {
      var result = response.data;
      that.setState({project: result});
    }).catch(function (response) {
      if (response instanceof Error) {
        console.error('Error', response.message);
      } else {
        console.error(response.data);
        console.error(response.status);
        console.error(response.headers);
        console.error(response.config);
      }
    });
  }

  render() {
    let project = this.state.project;
    let imageUrl = 'http://localhost:8081/project/image/' + project.projectName + '/' + project.projectImageFileName + '/1170/1170';
    let position = [project.latitude, project.longitude];
    return (
      <div className="container">
        <div className="row">
        <Map center={position} zoom={13}>
          <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
          <Marker position={position}>
            <Popup>
              <span>{project.name}</span>
            </Popup>
          </Marker>
        </Map>
        </div>
        <div className="row">
          <img src={imageUrl} alt={project.projectName} />
          <div className="col-md-12">
            <h2>{project.name}</h2>
            <p>{project.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

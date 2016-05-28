import axios from 'axios';
import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';

export default class Projects extends Component {

  constructor() {
    super();
    this.state = {projects: []};
  }

  componentDidMount() {
    var that = this;
    axios.get('http://localhost:8081/projects').then(function (response) {
      var result = response.data;
      // TODO workaround a backend issue which returns two invalid json objects
      result = result.substring(0, (result.indexOf('}{') + 1));
      result = JSON.parse(result);
      that.setState({projects: result._embedded.projects});
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
    return (
    <div className="row">
      {this.state.projects.map(function (project) {
        return (<div className="col-md-4">
          <div className="thumbnail">
            <img src="" alt="" />
            <div className="caption">
              <h3>{project.name}</h3>
              <p>{project.description}</p>
            </div>
          </div>
        </div>);
      })}
    </div>);
  }
}

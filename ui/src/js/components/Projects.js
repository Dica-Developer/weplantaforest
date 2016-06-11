import axios from 'axios';
import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import {
  Link,
} from 'react-router';
import Boostrap from 'bootstrap';

export default class Projects extends Component {

  constructor() {
    super();
    this.state = {projects: []};
  }

  componentDidMount() {
    var that = this;
    axios.get('http://localhost:8081/reports/activeProjects?page=0&size=10').then(function (response) {
      var result = response.data;
      that.setState({projects: result.content});
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
        let imageUrl = 'http://localhost:8081/project/image/' + project.projectName + '/'+ project.projectImageFileName + '/360/360';
        return (<div className="col-md-4">
          <Link to={`/projects/${project.projectName}`}>
            <img src={imageUrl} alt={project.projectName} />
            <div className="caption">
              <h3>{project.projectName}</h3>
              <p>{project.description}</p>
            </div>
          </Link>
        </div>);
      })}
    </div>);
  }
}

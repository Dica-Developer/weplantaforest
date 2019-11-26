import axios from 'axios';
import counterpart from 'counterpart';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import IconButton from '../common/components/IconButton';
import ActiveProject from './ActiveProject';



require('./projectsPage.less');

export default class ProjectsPage extends Component {

  constructor() {
    super();
    this.state = {
      completedProjects: {
        content: []
      },
      completeProjectsPageSize: 3,
      activeProjects: []
    };
  }

  componentDidMount() {
    this.getCompletedProjects();
    this.getActiveProjects();
  }

  moreCompletedProjects() {
    this.state.completeProjectsPageSize = this.state.completeProjectsPageSize + 3;
    this.forceUpdate();
    this.getCompletedProjects();
  }

  getCompletedProjects() {
    var that = this;
    axios.get('http://localhost:8081/reports/inActiveProjects?page=0&size=' + this.state.completeProjectsPageSize).then(function(response) {
      var result = response.data;
      that.setState({
        completedProjects: result
      });
    }).catch(function(response) {
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

  getActiveProjects() {
    var that = this;
    axios.get('http://localhost:8081/reports/activeProjects').then(function(response) {
      var result = response.data;
      that.setState({
        activeProjects: result
      });
    });
  }

  switchToOfferProjectPage() {
    browserHistory.push('/projectOffer');
  }

  render() {
    let moreCompletedProjectsButton;
    if (!this.state.completedProjects.last) {
      moreCompletedProjectsButton = <IconButton text="" glyphIcon="glyphicon-chevron-down" onClick={this.moreCompletedProjects.bind(this)}/>;
    } else {
      moreCompletedProjectsButton = '';
    }

    return (
      <div className="container paddingTopBottom15">
        <div className="row projectsPage">
          <div className="col-md-12">
            <h1>{counterpart.translate('PROJECTS')}</h1>
            <div className="projects">
              <h2>{counterpart.translate('RUNNING_PROJECTS')}</h2>
                {this.state.activeProjects.map(function(project, i) {
                  return (<ActiveProject project={project} key={i} />);
                })}
            </div>
          </div>
          <div className="col-md-12">
            <div className="projects">
              <h2>{counterpart.translate('FINISHED_PROJECTS')}</h2>
                {this.state.completedProjects.content.map(function(project, i) {
                  return (<ActiveProject project={project} key={i} />);
                })}
            </div>
            <div className="col-md-12">
              <div className="align-center border-top">
                {moreCompletedProjectsButton}
              </div>
            </div>
            <div className="bottom col-md-12">
              <p>{counterpart.translate('AREA_QUESTION')}</p>
              <IconButton glyphIcon="glyphicon-forward" text={counterpart.translate('OFFER_AREA')} onClick={this.switchToOfferProjectPage.bind(this)}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

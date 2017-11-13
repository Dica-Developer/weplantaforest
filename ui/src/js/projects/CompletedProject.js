import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';
import {browserHistory} from 'react-router';

import IconButton from '../common/components/IconButton';

export default class CompletedProject extends Component {
  constructor() {
    super();
  }

  switchToProjectPage(){
    browserHistory.push('/projects/'+ this.props.project.projectName);
  }

  render() {
    let imageUrl = 'http://localhost:8081/project/image/' + this.props.project.projectImageFileName + '/1140/1140';
    return (
      <div className="project col-md-4">
        <div className="projectImage">
        <img src={imageUrl} width="279px" height="150px" />
        </div>  
        <div className="projectName">
          {this.props.project.projectName}
        </div>
        <div className="projectDescription">
          {this.props.project.description}
        </div>
        <div className="full">
          vollständig&nbsp;bepflanzt&nbsp;mit&nbsp;{this.props.project.amountOfMaximumTreesToPlant}&nbsp;Bäumen
        </div>
        <div className="link">
          <IconButton text="Anschauen" glyphIcon="glyphicon-forward" onClick={this.switchToProjectPage.bind(this)}/>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

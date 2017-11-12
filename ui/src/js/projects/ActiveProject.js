import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';
import {
  browserHistory
} from 'react-router';
import Accounting from 'accounting';

import IconButton from '../common/components/IconButton';

export default class ActiveProject extends Component {
  constructor() {
    super();
  }

  switchToProjectPage() {
    browserHistory.push('/projects/' + this.props.project.projectName);
  }

  render() {
    var percent;
    if (this.props.project.amountOfMaximumTreesToPlant != 0) {
      percent = this.props.project.amountOfPlantedTrees / this.props.project.amountOfMaximumTreesToPlant * 100;
    }
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
        <div className="amount-of-trees">
           <p style={{
            width: percent + '%'
          }}>
          </p>         
          <div className="text">
          {this.props.project.amountOfPlantedTrees}&nbsp;von&nbsp;{this.props.project.amountOfMaximumTreesToPlant}&nbsp;Bäumen&nbsp;gepflanzt
          </div>
        </div>
        <div className="link">
          <IconButton text="Anschauen" glyphIcon="glyphicon-forward" onClick={this.switchToProjectPage.bind(this)}/>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

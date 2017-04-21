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
    return (
      <div className="project">
        <div className="projectName">
        {this.props.project.projectName}
        </div>
        <div className="full">
          100% bepflanzt
        </div>
        <div className="amount-of-trees">
          {this.props.project.amountOfMaximumTreesToPlant}&nbsp;Bäume
        </div>
        <div className="link">
          <IconButton text="ANSCHAUEN" glyphIcon="glyphicon-forward" onClick={this.switchToProjectPage.bind(this)}/>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

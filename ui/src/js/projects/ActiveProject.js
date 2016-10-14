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
    var formattedPercent = Accounting.formatNumber(percent, 0, ".", ",")
    return (
      <div className="project">
        <div className="projectName">
        {this.props.project.projectName}
        </div>
        <div className="full">
          {formattedPercent}%&nbsp;bepflanzt
        </div>
        <div className="amount-of-trees">
          {this.props.project.amountOfPlantedTrees}&nbsp;von&nbsp;{this.props.project.amountOfMaximumTreesToPlant}&nbsp;Bäumen
        </div>
        <div className="link">
          <IconButton text="ANSCHAUEN" glyphIcon="glyphicon-forward" onClick={this.switchToProjectPage.bind(this)}/>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

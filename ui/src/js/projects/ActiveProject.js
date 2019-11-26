import counterpart from 'counterpart';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { getFirstParagraph, getTextForSelectedLanguage } from '../common/language/LanguageHelper';


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
    let imageUrl = 'http://localhost:8081/project/image/' + this.props.project.projectImageFileName + '/279/186';
    return (
      <div className="project col-md-4" onClick={this.switchToProjectPage.bind(this)}>
        <div className="projectImage">
          <img src={imageUrl} />
        </div>
        <div className="projectName">
          {this.props.project.projectName}
        </div>
        <div className="projectDescription">
          <p dangerouslySetInnerHTML={{
            __html: getFirstParagraph(getTextForSelectedLanguage(this.props.project.description))
          }}/>
        </div>
        <div className="amount-of-trees">
          <p style={{
            width: percent + '%'
          }}></p>
        </div>
        <div className="amount-of-trees-description">
          <div className="planted">
            {counterpart.translate('ALREADY_PLANTED')}:<br/>
            {this.props.project.amountOfPlantedTrees}
          </div>
          <div className="goal">
            {counterpart.translate('GOAL')}:<br/>
            {this.props.project.amountOfMaximumTreesToPlant}
          </div>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

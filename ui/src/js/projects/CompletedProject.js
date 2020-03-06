import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { getFirstParagraph, getTextForSelectedLanguage } from '../common/language/LanguageHelper';

export default class CompletedProject extends Component {
  constructor() {
    super();
  }

  switchToProjectPage() {
    browserHistory.push('/projects/' + this.props.project.projectName);
  }

  render() {
    let imageUrl = 'http://localhost:8081/project/image/' + this.props.project.projectImageFileName + '/279/186';
    return (
      <div className="project col-md-4" onClick={this.switchToProjectPage.bind(this)}>
        <div className="projectImage">
          <img src={imageUrl} />
        </div>
        <div className="projectName">{this.props.project.projectName}</div>
        <div className="projectDescription">
          <p
            dangerouslySetInnerHTML={{
              __html: getFirstParagraph(getTextForSelectedLanguage(this.props.project.description))
            }}
          />
        </div>
        <div className="full">vollständig&nbsp;bepflanzt&nbsp;mit&nbsp;{this.props.project.amountOfMaximumTreesToPlant}&nbsp;Bäumen</div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import PolygonMap from '../common/components/PolygonMap';
import { getFirstParagraph, getTextForSelectedLanguage } from '../common/language/LanguageHelper';

export default class ProjectTeaser extends Component {
  constructor(props) {
    super(props);
  }

  linkTo(url) {
    browserHistory.push(url);
  }

  render() {
    return (
      <div>
        <a
          role="button"
          onClick={() => {
            this.linkTo('/projects/' + this.props.content.name);
          }}
        >
          <PolygonMap positions={this.props.content.positions} />
          <h1>{this.props.content.name}</h1>
          <div className="description">
            <p
              dangerouslySetInnerHTML={{
                __html: getFirstParagraph(getTextForSelectedLanguage(this.props.content.description))
              }}
            />
          </div>
        </a>
      </div>
    );
  }
}

ProjectTeaser.defaultProps = {
  content: {
    latitude: 0,
    longitude: 0,
    projectName: '',
    description: ''
  }
};

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

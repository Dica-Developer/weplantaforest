import axios from 'axios';
import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import {
  browserHistory
} from 'react-router';
import Boostrap from 'bootstrap';

import {
  getTextForSelectedLanguage,
  getFirstParagraph
} from '../common/language/LanguageHelper';
import PolygonMap from '../common/components/PolygonMap';

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
        <a role="button" onClick={() => {
          this.linkTo('/projects/' + this.props.content.name);
        }}>
          <PolygonMap positions={this.props.content.positions}/>
          <h1>
            {this.props.content.name}
          </h1>
          <div className="description">
            <p dangerouslySetInnerHTML={{
              __html: getFirstParagraph(getTextForSelectedLanguage(this.props.content.description))
            }}/>
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

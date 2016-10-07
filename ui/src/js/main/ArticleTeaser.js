import React, {Component} from 'react';
import Boostrap from 'bootstrap';
import axios from 'axios';
import {Link} from 'react-router';

import {getTextForSelectedLanguage} from '../common/language/LanguageHelper';

export default class ArticleTeaser extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let imageUrl = '';
    if (this.props.content.id != 0) {
      imageUrl = 'http://localhost:8083/article/image/' + this.props.content.id + '/' + this.props.content.imageFileName + '/380/380';
    }

    var shortIntro = getTextForSelectedLanguage(this.props.content.intro);
    if (shortIntro.length > 300) {
      shortIntro = shortIntro.substr(0, 300);
      shortIntro = shortIntro.substr(0, Math.min(300, shortIntro.lastIndexOf(" ")));
    }
    shortIntro = shortIntro + "... ";

    return (
      <div>
        <img src={imageUrl} alt={this.props.content.title}/>
        <h3>
          <i>{this.props.content.title}</i>
        </h3>
        <p dangerouslySetInnerHTML={{
          __html: shortIntro
        }}/>
        <Link className="more" to={`/projects/` + this.props.content.projectName}>
          <i>(mehr)</i>
        </Link>
      </div>
    );
  }
}

ArticleTeaser.defaultProps = {
  content: {
    id: 0,
    imageFileName: '',
    title: '',
    intro: ''
  }
};

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

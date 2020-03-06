import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import IconButton from '../../common/components/IconButton';
import ArticleOverview from './ArticleOverview';

require('./article-manager.less');

export default class ArticleManager extends Component {
  constructor() {
    super();
  }

  componentDidMount() {}

  switchToArticleCreater() {
    browserHistory.push('/article-create');
  }

  render() {
    return (
      <div className="container paddingTopBottom15 article-manager">
        <div className="row ">
          <div className="col-md-12">
            <h1>Content</h1>
          </div>
        </div>
        <div className="row ">
          <div className="col-md-12">
            <IconButton glyphIcon="glyphicon-plus" text="Artikel erstellen" onClick={this.switchToArticleCreater.bind(this)} />
          </div>
        </div>
        <ArticleOverview />
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

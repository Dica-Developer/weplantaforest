import React, { Component } from 'react';
import Loadable from 'react-loadable';

const LoadableComponent = Loadable({
  loader: () => import('./ArticleManager.js'),
  loading() {
    return <div>Loading...</div>;
  }
});

export default class LoadableArticleManager extends Component {
  render() {
    return <LoadableComponent />;
  }
}

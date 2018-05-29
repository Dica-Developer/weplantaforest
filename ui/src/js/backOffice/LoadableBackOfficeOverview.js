import React, {
  Component
} from 'react';
import Loadable from 'react-loadable';

const LoadableComponent = Loadable({
  loader: () => import('./BackOfficeOverview.js'),
  loading() {
    return <div>Loading...</div>;
  }
});

export default class LoadableBackOfficeOverview extends Component {
  render() {
    return <LoadableComponent />;
  }
}


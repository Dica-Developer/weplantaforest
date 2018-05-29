import React, {
  Component
} from 'react';
import Loadable from 'react-loadable';

const LoadableComponent = Loadable({
  loader: () => import('./MainPage'),
  loading() {
    return <div>Loading...</div>;
  }
});

export default class LoadableMainPage extends Component {
  render() {
    return <LoadableComponent />;
  }
}

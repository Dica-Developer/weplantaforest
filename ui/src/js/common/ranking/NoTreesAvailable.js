import React, {Component} from 'react';
import counterpart from 'counterpart';

require('./noTreesAvailable.less');

export default class NoTreesAvailable extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className={('row noTreesAvailable')}>
        <div className="col-md-12">
          <h1>{counterpart.translate('NO_PLANTINGS')}</h1>
        </div>
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */

import counterpart from 'counterpart';
import React, { Component } from 'react';

require('./forbidden.less');

export default class ForbiddenPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container paddingTopBottom15 forbidden">
        <div className="row">
          <div className="col-md-12">
            <h1>{counterpart.translate('NO_ACCESS')}</h1>
            <p>
              {counterpart.translate('NO_ACCES_TEXT')}: {this.props.location.query.calledUrl}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

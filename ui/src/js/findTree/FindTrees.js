import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';

import IconButton from '../common/components/IconButton';

import counterpart from 'counterpart';

export default class FindTrees extends Component {

  constructor(props) {
    super(props);
    this.state = {
      certificateId: ''
    };
  }

  updateCertId(event) {
    this.setState({
      certificateId: event.target.value
    });
  }

  render() {
    return (
      <div className="col-md-12">
        <h1>{counterpart.translate('CERTIFICATE.FIND_PLANTINGS')}</h1>
        <div className="certificateWrapper">
          {counterpart.translate('CERTIFICATE.NUMBER') + ': '}<input type="text" onBlur={this.updateCertId.bind(this)}/>
          <IconButton text={counterpart.translate('CERTIFICATE.FIND')} glyphIcon="glyphicon-search" onClick={()=>{this.props.findCertificate(this.state.certificateId);}}/>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

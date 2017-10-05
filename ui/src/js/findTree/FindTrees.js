import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';

import IconButton from '../common/components/IconButton';

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
        <h2>PFLANZUNGEN FINDEN</h2>
          Zertifikat-Nummer: <input type="text" onBlur={this.updateCertId.bind(this)}/>
        <IconButton text="FINDEN" glyphIcon="glyphicon-search" onClick={()=>{this.props.findCertificate(this.state.certificateId)}}/>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import {
  Link
} from 'react-router';
import Boostrap from 'bootstrap';

import IconButton from '../../common/components/IconButton';

export default class ButtonBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="buttons">
        <div className="col-md-3 align-center">
          <IconButton text="ÜBERSICHT" glyphIcon="glyphicon-forward" onClick={()=>{this.props.switchTo('overview')}}/>
        </div>
        <div className={"col-md-3 " + (this.props.chosen == "widgets" ? "chosen" : "")}>
          <IconButton text="WIDGETS" glyphIcon="glyphicon-forward" onClick={()=>{this.props.switchTo('widgets')}}/>
        </div>
        <div className={"col-md-3 " + (this.props.chosen == "certificates" ? "chosen" : "")}>
          <IconButton text="ZERTIFIKATE" glyphIcon="glyphicon-forward" onClick={()=>{this.props.switchTo('certificates')}}/>
        </div>
        <div className={"col-md-3 " + (this.props.chosen == "banner" ? "chosen" : "")}>
          <IconButton text="BANNER" glyphIcon="glyphicon-forward" onClick={()=>{this.props.switchTo('banner')}}/>
        </div>
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */

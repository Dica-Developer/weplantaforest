import React, {Component} from 'react';
import {render} from 'react-dom';

import Boostrap from 'bootstrap';

export default class EditButton extends Component {
  constructor(props) {
    super(props);
  }

  editContent() {
    this.props.editContent();
  }

  render() {
    return (
      <div>
        <a role="button" className="link" onClick={this.editContent.bind(this)}>
          <div>
            <img src="/assets/images/edit.jpg" alt=" editieren " width="20" height="20"/>
            <span className="no-link-deco">
              BEARBEITEN
            </span>
          </div >
        </a>
      </div>
    );
  }
}

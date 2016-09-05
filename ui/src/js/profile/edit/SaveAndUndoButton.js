import React, {Component} from 'react';
import {render} from 'react-dom';

import Boostrap from 'bootstrap';

export default class SaveAndUndoButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: this.props.content
    };
  }

  saveContent() {
    this.props.saveContent();
  }

  undoChanges() {
    this.props.undoChanges(this.state.content);
  }

  render() {
    return (
      <div>
        <a role="button" className="link" onClick={this.saveContent.bind(this)}>
          <div className="left">
            <span className="glyphicon glyphicon-floppy-save" aria-hidden="true"></span>
            <span className="no-link-deco">
              SPEICHERN
            </span>
          </div>
        </a>
        <a role="button" className="link" onClick={this.undoChanges.bind(this)}>
          <div className="left">
            <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
            <span className="no-link-deco">
              VERWERFEN
            </span>
          </div>
        </a>
      </div>
    );
  }
}

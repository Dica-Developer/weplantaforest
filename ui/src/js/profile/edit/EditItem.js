import React, {Component} from 'react';
import {render} from 'react-dom';
import Boostrap from 'bootstrap';

import EditButton from './EditButton';
import SaveAndUndoButton from './SaveAndUndoButton';

export default class EditItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: this.props.content,
      edit: false
    };

  }

  componentDidUpdate() {
    this.refs.content.focus();
  }

  editContent() {
    this.setState({edit: true});
  }

  saveContent() {
    this.setState({edit: false});
    this.props.editUser(this.props.toEdit, this.state.content);
  }

  undoChanges(content) {
    this.setState({content: content, edit: false});
  }

  updateContent(e) {
    this.setState({content: e.target.value});
  }

  render() {
    var link;
    if (this.state.edit) {
      link = <SaveAndUndoButton content={this.state.content} saveContent={this.saveContent.bind(this)} undoChanges={this.undoChanges.bind(this)}/>
    } else {
      link = <EditButton editContent={this.editContent.bind(this)}/>;
    }

    return (
      <div className="editItem">
        <div className="left">
          <span className="bold">{this.props.text}:&nbsp;</span><input type="text" value={this.state.content} onChange={this.updateContent.bind(this)} ref="content" disabled={!this.state.edit}/></div>
        <div className="right">
          {link}
        </div>
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */

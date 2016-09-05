import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';

import Boostrap from 'bootstrap';

import EditButton from './EditButton';
import SaveAndUndoButton from './SaveAndUndoButton';

export default class EditDropdownItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: this.props.content,
      edit: false,
      selectedIndex: 0
    };
  }

  componentDidMount() {
    for (var i = 0; i < this.refs.select.options.length; i++) {
      if (this.refs.select.options[i].text === this.props.content) {
        this.refs.select.options[i].selected = true;
        this.setState({
          selectedIndex: i
        });
        break;
      }
    }
  }

  editContent() {
    this.setState({
      edit: true
    });
  }

  saveContent() {
    this.setState({
      edit: false
    });
    this.props.editUser(this.props.toEdit, this.state.content);
  }

  undoChanges(content) {
    this.setState({
      content: content,
      edit: false
    });
    this.refs.select.options[this.state.selectedIndex].selected = true;
  }

  updateContent(e) {
    this.setState({
      content: e.target.value
    });
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
          <span className="bold">{this.props.text}:&nbsp;</span>
          <select disabled={!this.state.edit} onChange={this.updateContent.bind(this)} style={{width : this.props.width + 'px'}} ref="select">
          {this.props.children}
          </select>
        </div>
        <div className="right">
          {link}
        </div>
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */

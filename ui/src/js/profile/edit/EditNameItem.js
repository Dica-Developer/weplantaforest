import React, {Component} from 'react';
import {render} from 'react-dom';
import Boostrap from 'bootstrap';

import Notification from '../../common/components/Notification';
import IconButton from '../../common/components/IconButton';

export default class EditNameItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: this.props.content,
      contentTemp: this.props.content,
      edit: false
    };
  }

  componentDidMount() {
    this.setState({notificationSystem: this.refs.notificationSystem});
  }

  componentDidUpdate() {
    this.refs.content.focus();
  }

  editContent() {
    this.setState({edit: true});
    this.refs.notification.addNotification('Warnung!', 'Nach einer Namensänderung wirst du automatisch ausgeloggt und auf die Startseite geleitet!',  'warning');
  }

  showError(message) {
    this.refs.notification.addNotification('Es ist ein Fehler aufgetreten!',message,  'error');
  }

  saveContent() {
    this.setState({content: this.state.contentTemp, contentTemp: this.state.contentTemp, edit: false});
    this.props.editUsername(this.state.contentTemp);
  }

  undoChanges() {
    this.setState({contentTemp: this.state.content, edit: false});
  }

  updateContent(e) {
    this.setState({contentTemp: e.target.value});
  }

  render() {
    var link;
    if (this.state.edit) {
      link = <div><IconButton text="SPEICHERN" glyphIcon="glyphicon-floppy-save" onClick={this.saveContent.bind(this)}/><IconButton text="VERWERFEN" glyphIcon="glyphicon-trash" onClick={this.undoChanges.bind(this)}/></div>;
    } else {
      link = <IconButton text="bearbeiten" glyphIcon="glyphicon-cog" onClick={this.editContent.bind(this)}/>;
    }

    return (
      <div className="editItem">
        <div className="left">
          <span className="bold">{this.props.text}:&nbsp;</span><input type="text" value={this.state.contentTemp} onChange={this.updateContent.bind(this)} ref="content" disabled={!this.state.edit}/></div>
        <div className="right">
          {link}
        </div>
        <Notification ref="notification"/>
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */

import counterpart from 'counterpart';
import React, { Component } from 'react';
import IconButton from '../../common/components/IconButton';
import Notification from '../../common/components/Notification';

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
    this.setState({ notificationSystem: this.refs.notificationSystem });
  }

  componentDidUpdate() {
    this.refs.content.focus();
  }

  editContent() {
    this.setState({ edit: true });
    this.refs.notification.addNotification('Warnung!', 'Nach einer Namensänderung wirst du automatisch ausgeloggt und auf die Startseite geleitet!', 'warning');
  }

  showError(message) {
    this.refs.notification.addNotification('Es ist ein Fehler aufgetreten!', message, 'error');
  }

  saveContent() {
    this.setState({ content: this.state.contentTemp, contentTemp: this.state.contentTemp, edit: false });
    this.props.editUsername(this.state.contentTemp);
  }

  undoChanges() {
    this.setState({ contentTemp: this.state.content, edit: false });
  }

  updateContent(e) {
    this.setState({ contentTemp: e.target.value });
  }

  render() {
    var link;
    if (this.state.edit) {
      link = (
        <div>
          <IconButton text={counterpart.translate('SAVE')} glyphIcon="glyphicon-floppy-save" onClick={this.saveContent.bind(this)} />
          <IconButton text={counterpart.translate('DISCARD')} glyphIcon="glyphicon-trash" onClick={this.undoChanges.bind(this)} />
        </div>
      );
    } else {
      link = <IconButton text={counterpart.translate('EDIT')} glyphIcon="glyphicon-cog" onClick={this.editContent.bind(this)} />;
    }

    return (
      <div className="row editItem">
        <div className="col-md-9">
          <span className="bold">{this.props.text}:&nbsp;</span>
          <input type="text" value={this.state.contentTemp} onChange={this.updateContent.bind(this)} ref="content" disabled={!this.state.edit} />
        </div>
        <div className="col-md-3">{link}</div>
        <Notification ref="notification" />
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */

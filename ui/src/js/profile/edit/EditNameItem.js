import React, {Component} from 'react';
import {render} from 'react-dom';
import NotificationSystem from 'react-notification-system';

import Boostrap from 'bootstrap';

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
    this.refs.notificationSystem.addNotification({title: 'Warnung!', position: 'tc', autoDismiss: 0, message: 'Nach einer Namensänderung wirst du automatisch ausgeloggt und auf die Startseite geleitet!', level: 'warning'});
  }

  showError(message) {
    this.refs.notificationSystem.addNotification({title: 'Es ist ein Fehler aufgetreten!', position: 'tc', autoDismiss: 0, message: message, level: 'error'});
  }

  saveContent() {
    this.setState({content: this.state.contentTemp, contentTemp: this.state.contentTemp, edit: false});
    this.props.editUsername(this.state.contentTemp);
  }

  undoChanges(content) {
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
      link = <IconButton text="BEARBEITEN" glyphIcon="glyphicon-cog" onClick={this.editContent.bind(this)}/>;
    }

    var style = {
      Containers: {
        DefaultStyle: {
          zIndex: 11000
        },
        tc: {
          top: '50%',
          bottom: 'auto',
          margin: '0 auto',
          left: '50%'
        }
      }

    };

    return (
      <div className="editItem">
        <div className="left">
          <span className="bold">{this.props.text}:&nbsp;</span><input type="text" value={this.state.contentTemp} onChange={this.updateContent.bind(this)} ref="content" disabled={!this.state.edit}/></div>
        <div className="right">
          {link}
        </div>
        <NotificationSystem ref="notificationSystem" style={style}/>
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */

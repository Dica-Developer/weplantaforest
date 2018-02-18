import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';

import Notification from '../../common/components/Notification';
import IconButton from '../../common/components/IconButton';

export default class EditPasswordItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordOne: '',
      passwordTwo: '',
      edit: false
    };
  }

  editContent() {
    this.setState({
      edit: true
    });
  }

  saveContent() {
    if (this.state.passwordOne != this.state.passwordTwo) {
      this.refs.notification.addNotification('Passwörter stimmen nicht überein!', 'Das neu eingegebene Passwort stimmt nicht mit der Bestätigung überein!', 'error');
    }else if(this.state.passwordOne.length < 6){
      this.refs.notification.addNotification('Passwort zu kurz!', 'Bitte gibt mind. 6 Zeichen für dein Passwort an!', 'error');
    } else {
      this.setState({
        edit: false
      });
      this.props.editUser(this.props.toEdit, this.state.passwordOne);
    }
  }

  saveChanges(){
    
  }

  undoChanges() {
    this.setState({
      passwordOne: '',
      passwordTwo: '',
      edit: false
    });
  }

  updatePasswordOne(e) {
    this.setState({
      passwordOne: e.target.value
    });
  }

  updatePasswordTwo(e) {
    this.setState({
      passwordTwo: e.target.value
    });
  }

  render() {
    var link;
    var passwordPart;
    if (this.state.edit) {
      passwordPart = <div className="passwordFields">
        <input type="password" value={this.state.passwordOne} onChange={this.updatePasswordOne.bind(this)} disabled={!this.state.edit} placeholder="NEUES PASSWORT"/>
        <input type="password" value={this.state.passwordTwo} onChange={this.updatePasswordTwo.bind(this)}  disabled={!this.state.edit} placeholder="BESTÄTIGUNG"/>
      </div>;
      link = <div><IconButton text="SPEICHERN" glyphIcon="glyphicon-floppy-save" onClick={this.saveContent.bind(this)}/><br/><IconButton text="VERWERFEN" glyphIcon="glyphicon-trash" onClick={this.undoChanges.bind(this)}/></div>;
    } else {
      passwordPart = '••••••';
      link = <IconButton text="bearbeiten" glyphIcon="glyphicon-cog" onClick={this.editContent.bind(this)}/>;
    }

    return (
      <div className="editItem">
        <div className="left">
          <span className="bold">{this.props.text}:&nbsp;</span>
          {passwordPart}
        </div>
        <div className="right">
          {link}
        </div>
        <Notification ref="notification"/>
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */

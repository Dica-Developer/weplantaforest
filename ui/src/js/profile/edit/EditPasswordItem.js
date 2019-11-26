import counterpart from 'counterpart';
import React, { Component } from 'react';
import IconButton from '../../common/components/IconButton';
import Notification from '../../common/components/Notification';


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
      this.refs.notification.addNotification(counterpart.translate('PASSWORDS_DO_NOT_MATCH.title'), counterpart.translate('PASSWORDS_DO_NOT_MATCH.text'), 'error');
    }else if(this.state.passwordOne.length < 6){
      this.refs.notification.addNotification(counterpart.translate('PASSWORD_TOO_SHORT.title'), counterpart.translate('PASSWORD_TOO_SHORT.text'), 'error');
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
        <input type="password" value={this.state.passwordOne} onChange={this.updatePasswordOne.bind(this)} disabled={!this.state.edit} placeholder={counterpart.translate('NEW_PASSWORD')}/>
        <input type="password" value={this.state.passwordTwo} onChange={this.updatePasswordTwo.bind(this)}  disabled={!this.state.edit} placeholder={counterpart.translate('CONFIRMATION')}/>
      </div>;
      link = <div><IconButton text={counterpart.translate('SAVE')} glyphIcon="glyphicon-floppy-save" onClick={this.saveContent.bind(this)}/><IconButton text={counterpart.translate('DISCARD')} glyphIcon="glyphicon-trash" onClick={this.undoChanges.bind(this)}/></div>;
    } else {
      passwordPart = '••••••';
      link = <IconButton text={counterpart.translate('EDIT')} glyphIcon="glyphicon-cog" onClick={this.editContent.bind(this)}/>;
    }

    return (
      <div className="row editItem">
        <div className="col-md-9">
          <span className="bold">{this.props.text}:&nbsp;</span>
          {passwordPart}
        </div>
        <div className="col-md-3">
          {link}
        </div>
        <Notification ref="notification"/>
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */

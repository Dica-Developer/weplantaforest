import axios from 'axios';
import counterpart from 'counterpart';
import moment from 'dayjs';
import React, { Component } from 'react';
import IconButton from '../../common/components/IconButton';
import Notification from '../../common/components/Notification';
import EditDropdownItem from './EditDropdownItem';
import EditItem from './EditItem';
import EditNameItem from './EditNameItem';
import EditPasswordItem from './EditPasswordItem';
import FileChooseAndUploadButton from './FileChooseAndUploadButton';


require('./editUserDetails.less');

export default class EditUserDetails extends Component {
  constructor(props) {
    super(props);
  }

  showProfile() {
    this.props.showProfile();
  }

  editUser(toEdit, newEntry) {
    var that = this;
    var config = {
      headers: {
        'X-AUTH-TOKEN': localStorage.getItem('jwt')
      }
    };
    axios.post('http://localhost:8081/user/edit?userName=' + encodeURIComponent(this.props.user.userName) + '&toEdit=' + toEdit + '&newEntry=' + encodeURIComponent(newEntry), {}, config).then(function(response) {
      that.refs[toEdit].saveChanges();
    }).catch(function(error) {
      that.refs[toEdit].undoChanges();
      that.refs.notification.handleError(error);
    });
    if (toEdit == 'LANGUAGE') {
      this.props.updateLanguage(newEntry);
    }
  }

  editUsername(newEntry) {
    var that = this;
    var config = {
      headers: {
        'X-AUTH-TOKEN': localStorage.getItem('jwt')
      }
    };
    axios.post('http://localhost:8081/user/edit?userName=' + encodeURIComponent(this.props.user.userName) + '&toEdit=NAME&newEntry=' + encodeURIComponent(newEntry), {}, config).then(function(response) {
      that.props.logout();
    }).catch(function(error) {
      that.refs.name.undoChanges(that.props.user.userName);
      that.refs.notification.handleError(error);
    });
  }

  updateImageName(imageName){
    this.props.updateImageName(imageName);
  }

  render() {
    return (
      <div>
        <div className="editUserDetails" onClick={this.clearErrorMessage}>
          <h1>{counterpart.translate('EDIT_PROFILE')}</h1>
          <div className="summary">
            <span className="name">{this.props.user.userName}</span><br/>
            <span className="bold">{counterpart.translate('MEMBER_SINCE')}:&nbsp;</span>{moment(this.props.user.regDate).format('DD.MM.YYYY')}<br/>
            <span className="bold">{counterpart.translate('LAST_VISIT')}:&nbsp;</span>{moment(this.props.user.lastVisit).format('DD.MM.YYYY')}<br/>
            <span className="bold">{counterpart.translate('RANK')}:&nbsp;</span>{this.props.user.rank}
          </div>
        </div>
        <FileChooseAndUploadButton imageId="edit-logo-img" imageFileName={this.props.user.imageFileName} updateImageName={this.updateImageName.bind(this)}/>
        <EditNameItem text={counterpart.translate('USERNAME')} content={this.props.user.userName} toEdit="NAME" editUsername={this.editUsername.bind(this)} ref="name"/>
        <EditItem text={counterpart.translate('ABOUT_ME')} content={this.props.user.aboutMe} toEdit="ABOUTME" editUser={this.editUser.bind(this)} ref="ABOUTME"/>
        <EditItem text={counterpart.translate('LOCATION')} content={this.props.user.location} toEdit="LOCATION" editUser={this.editUser.bind(this)} ref="LOCATION"/>
        <EditItem text={counterpart.translate('ORGANISATION')} content={this.props.user.organisation} toEdit="ORGANISATION" editUser={this.editUser.bind(this)} ref="ORGANISATION"/>
        <EditItem text={counterpart.translate('WEBSITE')} content={this.props.user.homepage} toEdit="HOMEPAGE" editUser={this.editUser.bind(this)} ref="HOMEPAGE"/>
        <EditDropdownItem text={counterpart.translate('LANGUAGE')} toEdit="LANGUAGE" content={this.props.user.lang} editUser={this.editUser.bind(this)} width="100" ref="LANGUAGE">
          <option value="DEUTSCH">{counterpart.translate('GERMAN')}</option>
          <option value="ENGLISH">{counterpart.translate('ENGLISH')}</option>
        </EditDropdownItem>
        <EditDropdownItem text={counterpart.translate('NEWSLETTER_ABO')} toEdit="NEWSLETTER" content={this.props.user.newsletter} editUser={this.editUser.bind(this)} width="70" ref="NEWSLETTER">
          <option value="JA">{counterpart.translate('YES')}</option>
          <option value="NEIN">{counterpart.translate('NO')}</option>
        </EditDropdownItem>
        <EditItem text={counterpart.translate('MAIL')} content={this.props.user.mail} toEdit="MAIL" editUser={this.editUser.bind(this)} ref="MAIL"/>
        <EditDropdownItem text={counterpart.translate('TYPE')} toEdit="ORGANIZATION_TYPE" content={this.props.user.organizationType} editUser={this.editUser.bind(this)} width="180" ref="ORGANIZATION_TYPE">
          <option value="PRIVATE">{counterpart.translate('RANKING_TYPES.PRIVATE')}</option>
          <option value="COMMERCIAL">{counterpart.translate('RANKING_TYPES.COMMERCIAL')}</option>
          <option value="NONPROFIT">{counterpart.translate('RANKING_TYPES.NONPROFIT')}</option>
          <option value="EDUCATIONAL">{counterpart.translate('RANKING_TYPES.EDUCATIONAL')}</option>
        </EditDropdownItem>
        <EditPasswordItem text={counterpart.translate('PASSWORD')} toEdit="PASSWORD" editUser={this.editUser.bind(this)} ref="PASSWORD"/>
        <div className="align-center bottomButton">
          <IconButton text={counterpart.translate('VIEW')} glyphIcon="glyphicon-eye-open" onClick={this.showProfile.bind(this)}/>
        </div>
        <Notification ref="notification"/>
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */

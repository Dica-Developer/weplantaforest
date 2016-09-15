import axios from 'axios';
import React, {Component} from 'react';
import {render} from 'react-dom';
import NotificationSystem from 'react-notification-system';
import {Link} from 'react-router';
import moment from 'moment';
import Accounting from 'accounting';
import Boostrap from 'bootstrap';

import EditNameItem from './EditNameItem';
import EditImageItem from './EditImageItem';
import EditItem from './EditItem';
import EditDropdownItem from './EditDropdownItem';
import IconButton from '../../common/components/IconButton';

require("./editUserDetails.less");

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
    axios.post('http://localhost:8081/user/edit?userName=' + encodeURIComponent(this.props.user.userName) + '&toEdit=' + toEdit + "&newEntry=" + newEntry, {}, config).then(function(response) {}).catch(function(response) {
      if (response instanceof Error) {
        console.error('Error', response.message);
      } else {
        console.error(response.data);
        console.error(response.status);
        console.error(response.headers);
        console.error(response.config);
      }
    });
  }

  editUsername(newEntry) {
    var that = this;
    var config = {
      headers: {
        'X-AUTH-TOKEN': localStorage.getItem('jwt')
      }
    };
    axios.post('http://localhost:8081/user/edit?userName=' + encodeURIComponent(this.props.user.userName) + '&toEdit=NAME&newEntry=' + newEntry, {}, config).then(function(response) {
      localStorage.setItem('jwt', '');
      window.location = '/';
    }).catch(function(response) {
      that.refs.name.undoChanges(that.props.user.userName);
      that.refs.name.showError(response.data.message);
      console.log(response.data.message);
      if (response instanceof Error) {
        console.error('Error', response.message);
      } else {
        console.error(response.data);
        console.error(response.status);
        console.error(response.headers);
        console.error(response.config);
      }
    });
  }

  uploadImage(file){
    var data = new FormData();
    data.append('userName', this.props.user.userName);
    data.append('file', file);
    var config = {
      headers: {
        'X-AUTH-TOKEN': localStorage.getItem('jwt')
      }
    };
    axios.post('http://localhost:8081/user/image/upload', data, config).then(function(response) {}).catch(function(response) {
      if (response instanceof Error) {
        console.error('Error', response.message);
      } else {
        console.error(response.data);
        console.error(response.status);
        console.error(response.headers);
        console.error(response.config);
      }
    });
  }

  render() {
    let imageUrl;
    if (this.props.user.userName) {
      imageUrl = 'http://localhost:8081/user/image/' + this.props.user.imageFileName + '/80/80'
    }
    return (
      <div>
        <div className="editUserDetails" onClick={this.clearErrorMessage}>
          <h2>Profil bearbeiten</h2>
          <img src={imageUrl} alt="profile"/>
          <div className="summary">
            <span className="name">{this.props.user.userName}</span><br/>
            <span className="bold">Mitglied seit:&nbsp;</span>{moment(this.props.user.regDate).format("DD.MM.YYYY")}<br/>
            <span className="bold">letzter Besuch:&nbsp;</span>{moment(this.props.user.lastVisit).format("DD.MM.YYYY")}<br/>
            <span className="bold">Rang:&nbsp;</span>{this.props.user.rank}
          </div>
        </div>
        <EditImageItem uploadImage={this.uploadImage.bind(this)}/>
        <EditNameItem text="Name" content={this.props.user.userName} toEdit="NAME" editUsername={this.editUsername.bind(this)} ref="name"/>
        <EditItem text="Über mich" content={this.props.user.aboutMe} toEdit="ABOUTME" editUser={this.editUser.bind(this)}/>
        <EditItem text="Ort" content={this.props.user.location} toEdit="LOCATION" editUser={this.editUser.bind(this)}/>
        <EditItem text="Organisation" content={this.props.user.organisation} toEdit="ORGANISATION" editUser={this.editUser.bind(this)}/>
        <EditItem text="Webseite" content={this.props.user.homepage} toEdit="HOMEPAGE" editUser={this.editUser.bind(this)}/>
        <EditDropdownItem text="Sprache" toEdit="LANGUAGE" content={this.props.user.lang} editUser={this.editUser.bind(this)} width="100">
          <option value="0">DEUTSCH</option>
          <option value="1">ENGLISCH</option>
        </EditDropdownItem>
        <EditDropdownItem text="Newsletter abbonnieren" toEdit="NEWSLETTER" content={this.props.user.newsletter} editUser={this.editUser.bind(this)} width="70">
          <option value="JA">JA</option>
          <option value="NEIN">NEIN</option>
        </EditDropdownItem>
        <EditItem text="E-Mail" content={this.props.user.mail} toEdit="MAIL" editUser={this.editUser.bind(this)}/>
        <EditDropdownItem text="Typ" toEdit="ORGANIZATION_TYPE" text={this.props.user.organizationType} editUser={this.editUser.bind(this)} width="180">
          <option value="PRIVATE">Privatperson</option>
          <option value="COMMERCIAL">Firma</option>
          <option value="NONPROFIT">Non-Profit Organisation</option>
          <option value="EDUCATIONAL">Schule</option>
        </EditDropdownItem>
        <div className="align-center bottomButton">
          <IconButton text="ANSCHAUEN" glyphIcon="glyphicon-eye-open" onClick={this.showProfile.bind(this)}/>
        </div>
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */

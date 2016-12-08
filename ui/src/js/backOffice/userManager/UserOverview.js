import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';
import axios from 'axios';
import {
  browserHistory
} from 'react-router';

import ReactDataGrid from 'react-data-grid';
import {
  Toolbar,
  Data
} from 'react-data-grid/addons';

import IconButton from '../../common/components/IconButton';
import Notification from '../../common/components/Notification';

require("./userOverview.less");

class MailChanger extends Component {

  constructor(props) {
    super(props);
    this.state = {
      originalMail: this.props.mail,
      newMail: this.props.mail
    }
  }

  updateNewMail(e) {
    this.setState({
      newMail: e.target.value
    });
  }

  updateMail() {
    var that = this;
    axios.post('http://localhost:8084/user/changeMail?userId=' + this.props.id + '&newMail=' + this.state.newMail, {}, {}).then(function(response) {
      that.props.closeEditBox(that.props.id, that.state.newMail);
    }).catch(function(response) {
      that.refs.notification.addNotification('Ein Fehler ist aufgetreten!', response.data, 'error');
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
    return (
      <div className="mail-changer">
        <input value={this.state.newMail} onChange={this.updateNewMail.bind(this)}/>
        <IconButton glyphIcon="glyphicon-floppy-open" text="" onClick={this.updateMail.bind(this)}/>
        <Notification ref="notification"/>
      </div>
    );
  }

}

class UserNameChanger extends Component {

  constructor(props) {
    super(props);
    this.state = {
      originalUsername: this.props.username,
      newUsername: this.props.username
    }
  }

  updateNewUsername(e) {
    this.setState({
      newUsername: e.target.value
    });
  }

  updateUsername() {
    var that = this;
    axios.post('http://localhost:8084/user/changeName?userId=' + this.props.id + '&newUsername=' + this.state.newUsername, {}, {}).then(function(response) {
      that.props.closeEditBox(that.props.id, that.state.newUsername);
    }).catch(function(response) {
      that.refs.notification.addNotification('Ein Fehler ist aufgetreten!', response.data, 'error');
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
    return (
      <div className="user-name-changer">
        <input value={this.state.newUsername} onChange={this.updateNewUsername.bind(this)}/>
        <IconButton glyphIcon="glyphicon-floppy-open" text="" onClick={this.updateUsername.bind(this)}/>
        <Notification ref="notification"/>
      </div>
    );
  }

}

export default class UserOverview extends Component {

  constructor() {
    super();
    this.state = {
      users: [],
      columns: [{
        key: 'id',
        name: 'ID',
        width: 40,
        filterable: true
      }, {
        key: 'username',
        name: 'User Name',
        width: 300,
        filterable: true
      }, {
        key: 'editName',
        name: '',
        width: 30
      }, {
        key: 'mail',
        name: 'EMail',
        width: 400,
        filterable: true
      }, {
        key: 'editMail',
        name: '',
        width: 30
      }, {
        key: 'active',
        name: 'aktiv',
        width: 70,
        filterable: true
      }, {
        key: 'banned',
        name: 'gebannt',
        width: 70,
        filterable: true
      }],
      rows: [],
      filters: {}
    }
  }

  componentDidMount() {
    this.loadUser();
  }

  loadUser() {
    var that = this;
    axios.get('http://localhost:8084/users').then(function(response) {
      var result = response.data;
      var rows = that.createRows(result);
      that.setState({
        users: result,
        rows: rows
      });
    }).catch(function(response) {
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

  createRows(users) {
    var rows = [];
    for (var user in users) {
      var row = this.createRow(users[user]);
      rows.push(row);
    }
    return rows;
  }

  createRow(user) {
    var row = {
      id: user.id,
      username: user.name,
      editName: this.createEditButton(user.id, user.name),
      mail: user.mail,
      editMail: this.createEditButtonForMail(user.id, user.mail),
      active: this.createActiveIcon(user.id, user.enabled),
      banned: this.createBannedIcon(user.id, user.banned)
    };
    return row;
  }

  createEditButton(id, username) {
    return <IconButton glyphIcon="glyphicon-pencil" text="" onClick={() => {
      this.showEditBoxForUsername(id,username)
    }}/>;
  }

  createEditButtonForMail(id, mail) {
    return <IconButton glyphIcon="glyphicon-pencil" text="" onClick={() => {
      this.showEditBoxForMail(id,mail)
    }}/>;
  }

  createActiveIcon(id, active){
    if(active){
      return <IconButton glyphIcon="glyphicon-ok" text="" onClick={() => {
        this.changeActiveFlagForUser(id,false)
      }}/>;
    }else{
      return <IconButton glyphIcon="glyphicon-remove" text="" onClick={() => {
        this.changeActiveFlagForUser(id,true)
      }}/>;
    }
  }

  createBannedIcon(id, banned){
    if(banned){
      return <IconButton glyphIcon="glyphicon-ok" text="" onClick={() => {
        this.changeBannedFlagForUser(id,false)
      }}/>;
    }else{
      return <IconButton glyphIcon="glyphicon-remove" text="" onClick={() => {
        this.changeBannedFlagForUser(id,true)
      }}/>;
    }
  }

  createAbortButton(id, username){
    return <IconButton glyphIcon="glyphicon-remove" text="" onClick={() => {
      this.closeEditBoxForUsername(id,username)
    }}/>;
  }

  createAbortButtonForMail(id, mail){
    return <IconButton glyphIcon="glyphicon-remove" text="" onClick={() => {
      this.closeEditBoxForMail(id,mail)
    }}/>;
  }

  closeEditBoxForUsername(id, username) {
    for (var row in this.state.rows) {
      if (this.state.rows[row].id == id) {
        this.state.rows[row].username = username;
        this.state.rows[row].editName = this.createEditButton(id, username);
        break;
      }
    }
    this.forceUpdate();
  }

  closeEditBoxForMail(id, mail) {
    for (var row in this.state.rows) {
      if (this.state.rows[row].id == id) {
        this.state.rows[row].mail = mail;
        this.state.rows[row].editMail = this.createEditButtonForMail(id, mail);
        break;
      }
    }
    this.forceUpdate();
  }


  showEditBoxForUsername(id, username) {
    for (var row in this.state.rows) {
      if (this.state.rows[row].id == id) {
        this.state.rows[row].username = <UserNameChanger id={id} username={username} closeEditBox={this.closeEditBoxForUsername.bind(this)}/>;
        this.state.rows[row].editName = this.createAbortButton(id, username);
        break;
      }
    }
    this.forceUpdate();
  }

  showEditBoxForMail(id, mail) {
    for (var row in this.state.rows) {
      if (this.state.rows[row].id == id) {
        this.state.rows[row].mail = <MailChanger id={id} mail={mail} closeEditBox={this.closeEditBoxForMail.bind(this)}/>;
        this.state.rows[row].editMail = this.createAbortButtonForMail(id, mail);
        break;
      }
    }
    this.forceUpdate();
  }

  updateActiveIcon(id, active) {
    for (var row in this.state.rows) {
      if (this.state.rows[row].id == id) {
        this.state.rows[row].active = this.createActiveIcon(id, active);
        break;
      }
    }
    this.forceUpdate();
  }

  updateBannedIcon(id, banned) {
    for (var row in this.state.rows) {
      if (this.state.rows[row].id == id) {
        this.state.rows[row].banned = this.createBannedIcon(id, banned);
        break;
      }
    }
    this.forceUpdate();
  }

  changeActiveFlagForUser(id, active){
    var that = this;
    axios.post('http://localhost:8084/user/changeActiveFlag?userId=' + id + '&activeFlag=' + active, {}, {}).then(function(response) {
      that.updateActiveIcon(id, active);
    }).catch(function(response) {
      that.refs.notification.addNotification('Ein Fehler ist aufgetreten!', response.data, 'error');
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

  changeBannedFlagForUser(id, banned){
    var that = this;
    axios.post('http://localhost:8084/user/changeBannedFlag?userId=' + id + '&bannedFlag=' + banned, {}, {}).then(function(response) {
      that.updateBannedIcon(id, banned);
    }).catch(function(response) {
      that.refs.notification.addNotification('Ein Fehler ist aufgetreten!', response.data, 'error');
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

  getRows() {
    return Data.Selectors.getRows({
      rows: this.state.rows,
      filters: this.state.filters
    });
  }

  rowGetter(i) {
    var rows = this.getRows();
    return rows[i];
  }

  getSize() {
    return this.getRows().length;
  }

  handleFilterChange(filter) {
    var newFilters = Object.assign({}, this.state.filters);
    if (filter.filterTerm) {
      newFilters[filter.column.key] = filter;
    } else {
      delete newFilters[filter.column.key];
    }
    this.setState({
      filters: newFilters
    });
  }

  onClearFilters() {
    this.setState({
      filters: {}
    });
  }

  getEmptyRowView() {
    return (
      <div>Nothing to show</div>
    );
  }

  render() {
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
      <div className="container paddingTopBottom15 userOverview">
        <div className="row ">
          <div className="col-md-12">
            <h2>User-Übersicht</h2>
          </div>
        </div>
        <div className="row ">
          <div className="col-md-12">
            <ReactDataGrid columns={this.state.columns} rowGetter={this.rowGetter.bind(this)} rowsCount={this.getSize()} minHeight={800} toolbar={< Toolbar enableFilter = {
              true
            } />} onAddFilter={this.handleFilterChange.bind(this)} onClearFilters={this.onClearFilters.bind(this)} emptyRowsView={this.getEmptyRowView.bind(this)}/>
          </div>
        </div>
        <Notification ref="notification"/>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
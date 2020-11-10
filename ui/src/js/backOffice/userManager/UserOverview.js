import axios from 'axios';
import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import { Data, Toolbar } from 'react-data-grid-addons';
import { browserHistory } from 'react-router';
import IconButton from '../../common/components/IconButton';
import Notification from '../../common/components/Notification';
import { getConfig } from '../../common/RestHelper';

require('./userOverview.less');

export default class UserOverview extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      titles: ['User name', '', 'EMail', '', 'aktiv', 'gebannt', 'Admin', 'Art.-Man.'],
      columns: [
        {
          key: 'username',
          name: 'User Name',
          width: 300,
          filterable: true,
          sortable: true,
          editable: true
        },
        {
          key: 'editName',
          name: '',
          width: 50
        },
        {
          key: 'mail',
          name: 'EMail',
          width: 400,
          filterable: true,
          sortable: true,
          editable: true
        },
        {
          key: 'editMail',
          name: '',
          width: 50
        },
        {
          key: 'active',
          name: 'aktiv',
          width: 70,
          filterable: false,
          sortable: true
        },
        {
          key: 'banned',
          name: 'gebannt',
          width: 70,
          filterable: false,
          sortable: true
        },
        {
          key: 'admin',
          name: 'Admin',
          width: 70,
          filterable: false,
          sortable: true
        },
        {
          key: 'articleManager',
          name: 'Art.-Man.',
          width: 70,
          filterable: false,
          sortable: true
        }
      ],
      rows: [],
      filters: {}
    };
  }

  componentDidMount() {
    this.loadUser();
  }

  loadUser() {
    var that = this;
    var config = getConfig();
    axios
      .get('http://localhost:8083/users', config)
      .then(function(response) {
        var result = response.data;
        var rows = that.createRows(result);
        that.setState({
          users: result,
          rows: rows
        });
      })
      .catch(function(response) {
        that.refs.notification.addNotification('Fehler beim Laden der Nutzer!', response.data, 'error');
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
      editName: '',
      mail: user.mail,
      editMail: '',
      active: this.createActiveIcon(user.id, user.enabled),
      banned: this.createBannedIcon(user.id, user.banned),
      admin: this.createAdminIcon(user.id, user.admin),
      articleManager: this.createArticleManagerIcon(user.id, user.articleManager)
    };
    return row;
  }

  createActiveIcon(id, active) {
    if (active) {
      return (
        <IconButton
          glyphIcon="glyphicon-ok"
          text=""
          onClick={() => {
            this.changeActiveFlagForUser(id, false);
          }}
        />
      );
    } else {
      return (
        <IconButton
          glyphIcon="glyphicon-remove"
          text=""
          onClick={() => {
            this.changeActiveFlagForUser(id, true);
          }}
        />
      );
    }
  }

  createBannedIcon(id, banned) {
    if (banned) {
      return (
        <IconButton
          glyphIcon="glyphicon-ok"
          text=""
          onClick={() => {
            this.changeBannedFlagForUser(id, false);
          }}
        />
      );
    } else {
      return (
        <IconButton
          glyphIcon="glyphicon-remove"
          text=""
          onClick={() => {
            this.changeBannedFlagForUser(id, true);
          }}
        />
      );
    }
  }

  createAdminIcon(id, isAdmin) {
    if (isAdmin) {
      return (
        <IconButton
          glyphIcon="glyphicon-ok"
          text=""
          onClick={() => {
            this.changeAdminRoleForUser(id, false);
          }}
        />
      );
    } else {
      return (
        <IconButton
          glyphIcon="glyphicon-remove"
          text=""
          onClick={() => {
            this.changeAdminRoleForUser(id, true);
          }}
        />
      );
    }
  }

  createArticleManagerIcon(id, isArticleManager) {
    if (isArticleManager) {
      return (
        <IconButton
          glyphIcon="glyphicon-ok"
          text=""
          onClick={() => {
            this.changeArticleManagerRoleForUser(id, false);
          }}
        />
      );
    } else {
      return (
        <IconButton
          glyphIcon="glyphicon-remove"
          text=""
          onClick={() => {
            this.changeArticleManagerRoleForUser(id, true);
          }}
        />
      );
    }
  }

  updateActiveIcon(id, active) {
    const users = this.state.users;
    for (let user of users) {
      if (user.id === id) {
        user.enabled = active;
      }
    }

    var rows = this.createRows(users);
    this.setState({
      users: users,
      rows: rows
    });
    this.forceUpdate();
  }

  updateBannedIcon(id, banned) {
    const users = this.state.users;
    for (let user of users) {
      if (user.id === id) {
        user.banned = banned;
      }
    }

    var rows = this.createRows(users);
    this.setState({
      users: users,
      rows: rows
    });
    this.forceUpdate();
  }

  updateAdminIcon(id, shouldBeAdmin) {
    const users = this.state.users;
    for (let user of users) {
      if (user.id === id) {
        user.admin = shouldBeAdmin;
      }
    }

    var rows = this.createRows(users);
    this.setState({
      users: users,
      rows: rows
    });
    this.forceUpdate();
  }

  updateArticleManagerIcon(id, shouldBeArticleManager) {
    const users = this.state.users;
    for (let user of users) {
      if (user.id === id) {
        user.articleManager = shouldBeArticleManager;
      }
    }

    var rows = this.createRows(users);
    this.setState({
      users: users,
      rows: rows
    });
    this.forceUpdate();
  }

  changeActiveFlagForUser(id, active) {
    var that = this;
    var config = getConfig();
    axios
      .post('http://localhost:8083/user/changeActiveFlag?userId=' + id + '&activeFlag=' + active, {}, config)
      .then(function(response) {
        that.updateActiveIcon(id, active);
      })
      .catch(function(response) {
        that.refs.notification.addNotification('Ein Fehler ist aufgetreten!', response.data, 'error');
      });
  }

  changeBannedFlagForUser(id, banned) {
    var that = this;
    var config = getConfig();
    axios
      .post('http://localhost:8083/user/changeBannedFlag?userId=' + id + '&bannedFlag=' + banned, {}, config)
      .then(function(response) {
        that.updateBannedIcon(id, banned);
      })
      .catch(function(response) {
        that.refs.notification.addNotification('Ein Fehler ist aufgetreten!', response.data, 'error');
      });
  }

  changeAdminRoleForUser(id, shouldBeAdmin) {
    var that = this;
    var config = getConfig();
    axios
      .post('http://localhost:8083/user/editAdminRole?userId=' + id + '&shouldBeAdmin=' + shouldBeAdmin, {}, config)
      .then(function(response) {
        that.updateAdminIcon(id, shouldBeAdmin);
      })
      .catch(function(response) {
        that.refs.notification.addNotification('Ein Fehler ist aufgetreten!', response.data, 'error');
      });
  }

  changeArticleManagerRoleForUser(id, shouldBeArticleManager) {
    var that = this;
    var config = getConfig();
    axios
      .post('http://localhost:8083/user/editArticleManagerRole?userId=' + id + '&shouldBeArticleManager=' + shouldBeArticleManager, {}, config)
      .then(function(response) {
        that.updateArticleManagerIcon(id, shouldBeArticleManager);
      })
      .catch(function(response) {
        that.refs.notification.addNotification('Ein Fehler ist aufgetreten!', response.data, 'error');
      });
  }

  getRows(rows, filters) {
    return Data.Selectors.getRows({
      rows: rows,
      filters: filters
    });
  }

  filteredRows() {
    return this.getRows(this.state.rows, this.state.filters);
  }

  getSize() {
    return this.getRows().length;
  }

  handleGridSort(sortColumn, sortDirection) {
    var sortedRows = this.filteredRows();
    const comparer = (a, b) => {
      if (sortDirection === 'ASC') {
        return a[sortColumn] > b[sortColumn] ? 1 : -1;
      } else if (sortDirection === 'DESC') {
        return a[sortColumn] < b[sortColumn] ? 1 : -1;
      }
    };

    const rows = sortDirection === 'NONE' ? ' ' : sortedRows.sort(comparer);

    this.setState({ rows: sortedRows });
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
    return <div>Nothing to show</div>;
  }

  getCellActions(column, row) {
    if ('username' === column.key) {
      return [
        {
          icon: 'glyphicon glyphicon-link',
          callback: () => {
            browserHistory.push('/user/' + encodeURIComponent(row.username));
          }
        }
      ];
    } else {
      return null;
    }
  }

  updateUsername(id, username) {
    var config = getConfig();
    var that = this;
    axios
      .post('http://localhost:8083/user/changeName?userId=' + id + '&newUsername=' + encodeURIComponent(username), {}, config)
      .then(function(response) {
        const users = that.state.users;
        for (let user of users) {
          if (user.id === id) {
            user.name = username;
          }
        }

        var rows = that.createRows(users);
        that.setState({
          users: users,
          rows: rows
        });
        that.forceUpdate();
        that.refs.notification.addNotification('Username geupdatet!', 'Der Nutzername Adresse wurde so eben editiert.', 'success');
      })
      .catch(function(error) {
        that.refs.notification.handleError(error);
      });
  }

  updateMail(id, mail) {
    var that = this;
    var config = getConfig();
    axios
      .post('http://localhost:8083/user/changeMail?userId=' + id + '&newMail=' + mail, {}, config)
      .then(function(response) {
        const users = that.state.users;
        for (let user of users) {
          if (user.id === id) {
            user.mail = mail;
          }
        }

        var rows = that.createRows(users);
        that.setState({
          users: users,
          rows: rows
        });
        that.forceUpdate();
        that.refs.notification.addNotification('E-Mail geupdatet!', 'Der E-Mail Adresse wurde so eben editiert.', 'success');
      })
      .catch(function(error) {
        that.refs.notification.handleError(error);
      });
  }

  onGridRowsUpdated({ fromRow, toRow, updated}) {
    this.setState(state => {
      const rows = state.rows.slice();
      const filtered = this.filteredRows();
      for (let i = fromRow; i <= toRow; i++) {
        const rows_index = rows.map(function(x) {return x.id; }).indexOf(filtered[i].id);
        if (updated['username']) {
          if (rows[rows_index].username !== updated.username) {
            rows[rows_index].editName = (
              <IconButton
                glyphIcon="glyphicon-floppy-open"
                text=""
                onClick={() => {
                  this.updateUsername(rows[rows_index].id, rows[rows_index].username);
                }}
              />
            );
          }
        } else if (updated['mail']) {
          if (rows[rows_index].mail !== updated.mail) {
            rows[rows_index].editMail = (
              <IconButton
                glyphIcon="glyphicon-floppy-open"
                text=""
                onClick={() => {
                  this.updateMail(rows[rows_index].id, rows[rows_index].mail);
                }}
              />
            );
          }
        }
        rows[rows_index] = { ...filtered[i], ...updated };
      }
      return { rows };
    });
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
            <h1>User</h1>
          </div>
        </div>
        <div className="row ">
          <div className="col-md-12">
            <ReactDataGrid
              columns={this.state.columns}
              titles={this.state.titles}
              rowGetter={i => this.filteredRows()[i]}
              rowsCount={this.filteredRows().length}
              onGridSort={this.handleGridSort.bind(this)}
              minHeight={800}
              rowHeight={25}
              onGridRowsUpdated={this.onGridRowsUpdated.bind(this)}
              enableCellSelect={true}
              toolbar={<Toolbar enableFilter={true} />}
              onAddFilter={this.handleFilterChange.bind(this)}
              onClearFilters={this.onClearFilters.bind(this)}
              emptyRowsView={this.getEmptyRowView.bind(this)}
              getCellActions={this.getCellActions.bind(this)}
            />
          </div>
        </div>
        <Notification ref="notification" />
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

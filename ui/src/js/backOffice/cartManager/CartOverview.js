import React, {Component} from 'react';
import {render} from 'react-dom';
import Boostrap from 'bootstrap';
import axios from 'axios';
import Accounting from 'accounting';
import {browserHistory} from 'react-router';
import moment from 'moment';
import ReactDataGrid from 'react-data-grid';
import {Toolbar, Data} from 'react-data-grid-addons';

import IconButton from '../../common/components/IconButton';
import NotificationSystem from 'react-notification-system';
import Notification from '../../common/components/Notification';
import LoadingSpinner from '../../common/components/LoadingSpinner';
import {getConfig} from '../../common/RestHelper';

require("./cartOverview.less");

export default class CartOverview extends Component {

  constructor() {
    super();
    this.state = {
      carts: [],
      columns: [
        {
          key: 'id',
          name: 'ID',
          width: 60,
          filterable: true,
          sortable: true
        }, {
          key: 'user',
          name: 'User',
          width: 120,
          filterable: true,
          sortable: true
        }, {
          key: 'price',
          name: 'Preis (€)',
          width: 90,
          filterable: true,
          sortable: true
        }, {
          key: 'status',
          name: 'Status',
          width: 120,
          filterable: true,
          sortable: true
        }, {
          key: 'timestamp',
          name: 'Erstellt am',
          width: 100,
          filterable: true,
          sortable: true
        }, {
          key: 'firstName',
          name: 'Vorname',
          width: 150,
          filterable: true,
          sortable: true
        }, {
          key: 'lastName',
          name: 'Nachname',
          width: 150,
          filterable: true,
          sortable: true
        }, {
          key: 'company',
          name: 'Firma',
          width: 200,
          filterable: true,
          sortable: true
        }, {
          key: 'paymentType',
          name: 'Zahlungsart',
          width: 40,
          filterable: true,
          sortable: true
        }, {
          key: 'stateChange',
          name: 'Actions',
          width: 100,
          filterablte: false,
          sortable: true
        }
      ],
      rows: [],
      filters: {}
    }
  }

  componentDidMount() {
    this.loadCarts();
  }

  loadCarts() {
    this.refs["spinner"].showSpinner();
    var that = this;
    var config = getConfig();
    axios.get('http://localhost:8083/carts', config).then(function(response) {
      var result = response.data;
      var rows = that.createRows(result);
      that.setState({carts: result, rows: rows});
      that.refs["spinner"].hideSpinner();
    }).catch(function(response) {
      that.refs.notification.addNotification('Fehler beim Laden der Pflanzkörbe!', response.data, 'error');
    });
  }

  createRows(carts) {
    var rows = [];
    for (var cart in carts) {
      var row = this.createRow(carts[cart]);
      rows.push(row);
    }
    return rows;
  }

  createRow(cart) {
    var user = cart.buyer == null
      ? ''
      : cart.buyer.name;
    var row = {
      id: cart.id,
      user: user,
      price: Accounting.formatNumber(cart.totalPrice, 2, ".", ","),
      status: cart.cartState,
      timestamp: moment(cart.timeStamp).format("DD.MM.YYYY"),
      firstName: cart.callBackVorname,
      lastName: cart.callBackNachname,
      company: cart.callBackFirma,
      paymentType: cart.callBackZahlungsart,
      stateChange: this.createStateChangeButtons(cart.id, cart.cartState)
    };
    return row;
  }
  createStateChangeButtons(id, cartState) {
    if (cartState == 'CALLBACK') {
      return <div className="state-change-buttons">
        <IconButton glyphIcon="glyphicon-ok" text="" onClick={() => {
          this.changeStatusOfCart(id, 'VERIFIED')
        }}/>
        <IconButton glyphIcon="glyphicon-remove" text="" onClick={() => {
          this.createDiscardConfirmation(id)
        }}/>
      </div>;
    } else if (cartState == 'VERIFIED') {
      return <div className="state-change-buttons">
        <IconButton glyphIcon="glyphicon-remove" text="" onClick={() => {
          this.createDiscardConfirmation(id)
        }}/>
      </div>;
    }
  }

  createDiscardConfirmation(id) {
    this.refs.notificationSystem.addNotification({
      title: 'Achtung!',
      position: 'tc',
      autoDismiss: 0,
      message: 'Dadurch werden die darin enthaltenen Bäume gelöscht!',
      level: 'warning',
      children: (
        <div className="delete-confirmation align-center">
          <button>Abbrechen</button>
          <button onClick={() => {
            this.changeStatusOfCart(id, 'DISCARDED')
          }}>OK</button>
        </div>
      )
    });
  }

  changeStatusOfCart(id, cartState) {
    var that = this;
    var config = getConfig();
    axios.post('http://localhost:8083/cart/changeState?cartId=' + id + '&cartState=' + cartState, {}, config).then(function(response) {
      for (var cart in that.state.carts) {
        if (that.state.carts[cart].id == id) {
          that.state.carts[cart].cartState = cartState;
          break;
        }
      }
      for (var row in that.state.rows) {
        if (that.state.rows[row].id == id) {
          that.state.rows[row].status = cartState;
          that.state.rows[row].stateChange = that.createStateChangeButtons(id, cartState);
          break;
        }
      }
      that.forceUpdate();
    }).catch(function(response) {
      that.refs.notification.addNotification('Es ist ein Fehler aufgetreten!', 'Beim Umsetzen des Status vom Pflanzkorb mit der ID ' + id + "auf "+ cartState +" ist folgender Fehler aufgetreten:" + response.data, 'error');
    });
  }

  getRows() {
    return Data.Selectors.getRows({rows: this.state.rows, filters: this.state.filters});
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
    this.setState({filters: newFilters});
  }

  handleGridSort(sortColumn, sortDirection) {
    var sortedRows = this.state.rows;
    const comparer = (a, b) => {
      if (sortDirection === 'ASC') {
        return (a[sortColumn] > b[sortColumn])
          ? 1
          : -1;
      } else if (sortDirection === 'DESC') {
        return (a[sortColumn] < b[sortColumn])
          ? 1
          : -1;
      }
    };

    const rows = sortDirection === 'NONE'
      ? ' '
      : sortedRows.sort(comparer);

    this.setState(rows: sortedRows);
  }

  onClearFilters() {
    this.setState({filters: {}});
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
      <div className="container paddingTopBottom15 cartOverview">
        <div className="row ">
          <div className="col-md-12">
            <h2>Pflanzkorbübersicht</h2>
          </div>
        </div>
        <div className="row ">
          <div className="col-md-12">
            <ReactDataGrid columns={this.state.columns} rowGetter={this.rowGetter.bind(this)} rowsCount={this.getSize()} onGridSort={this.handleGridSort.bind(this)} minHeight={800} toolbar={< Toolbar enableFilter = {
              true
            } />} onAddFilter={this.handleFilterChange.bind(this)} onClearFilters={this.onClearFilters.bind(this)} emptyRowsView={this.getEmptyRowView.bind(this)}/>
          </div>
        </div>
        <LoadingSpinner ref="spinner"/>
        <NotificationSystem ref="notificationSystem" style={style}/>
        <Notification ref="notification"/>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

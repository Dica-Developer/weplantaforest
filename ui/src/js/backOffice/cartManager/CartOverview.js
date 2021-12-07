import Accounting from 'accounting';
import axios from 'axios';
import moment from 'dayjs';
import React, { Component } from 'react';
import DatePicker from 'react-16-bootstrap-date-picker';
import ReactDataGrid from 'react-data-grid';
import { Data, Toolbar } from 'react-data-grid-addons';
import NotificationSystem from 'react-notification-system';
import Select from 'react-select';
import IconButton from '../../common/components/IconButton';
import LoadingSpinner from '../../common/components/LoadingSpinner';
import Notification from '../../common/components/Notification';
import { getTextForSelectedLanguage } from '../../common/language/LanguageHelper';
import { getConfig } from '../../common/RestHelper';

require('./cartOverview.less');

class CartDetails extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    var cartItems = 'no cartitems available';
    var display = 'none';
    if (this.props.details.cartItems) {
      cartItems = <CartItems cartItems={this.props.details.cartItems} />;
      display = 'block';
    }
    var x = this.props.x - 665;
    var y = this.props.y + 25;
    return (
      <div
        style={{
          display: display,
          position: 'absolute',
          left: x,
          top: y,
          width: '650px'
        }}
        className="cart-details"
      >
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-3">
                <strong>Id:</strong>
              </div>
              <div className="col-md-9">{this.props.details.id}</div>
              <div className="col-md-3">
                <strong>Datum:</strong>
              </div>
              <div className="col-md-9">{moment(this.props.details.timeStamp).format('DD.MM.YYYY')}</div>
              <div className="col-md-3">
                <strong>Anzahl Bäume:</strong>
              </div>
              <div className="col-md-9">{this.props.details.treeCount}</div>
              <div className="col-md-3">
                <strong>Preis:</strong>
              </div>
              <div className="col-md-9">{Accounting.formatNumber(this.props.details.totalPrice, 2, '.', ',')}</div>
            </div>
            {cartItems}
          </div>
        </div>
      </div>
    );
  }
}

class CartItems extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div className="cart-items">
        <div className="row">
          <div className="col-md-3">
            <strong>Baumart</strong>
          </div>
          <div className="col-md-3">
            <strong>Projekt</strong>
          </div>
          <div className="col-md-2 align-center">
            <strong>Anzahl</strong>
          </div>
          <div className="col-md-2 align-center">
            <strong>Preis/Stk</strong>
          </div>
          <div className="col-md-2"></div>
        </div>
        {this.props.cartItems.map(function(cartItem, i) {
          var treeTypeName = 'Baum wurde entfernt';
          var project = 'unbekannt';
          if (cartItem.tree) {
            treeTypeName = getTextForSelectedLanguage(cartItem.tree.treeType.name);
            project = cartItem.tree.projectArticle.project.name;
          }
          return (
            <div className="row" key={i}>
              <div className="col-md-3">{treeTypeName}</div>
              <div className="col-md-3">{project}</div>
              <div className="col-md-2 align-center">{cartItem.amount}</div>
              <div className="col-md-2 align-center">{Accounting.formatNumber(cartItem.basePricePerPiece, 2, '.', ',')}</div>
              <div className="col-md-2">
                <strong>=> </strong>
                {Accounting.formatNumber(cartItem.totalPrice, 2, '.', ',')}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
export default class CartOverview extends Component {
  constructor() {
    super();
    this.state = {
      carts: [],
      columns: [
        {
          key: 'id',
          name: 'ID',
          width: 10,
          filterable: true,
          sortable: true,
          visible: false
        },
        {
          key: 'user',
          name: 'User',
          width: 185,
          filterable: true,
          sortable: true,
          visible: true
        },
        {
          key: 'price',
          name: 'Preis (€)',
          width: 60,
          filterable: true,
          sortable: true,
          visible: true
        },
        {
          key: 'timestamp',
          name: 'Erstellt am',
          width: 80,
          filterable: true,
          sortable: true,
          visible: true
        },
        {
          key: 'firstName',
          name: 'Vorname',
          width: 100,
          filterable: true,
          sortable: true,
          visible: true
        },
        {
          key: 'lastName',
          name: 'Nachname',
          width: 100,
          filterable: true,
          sortable: true,
          visible: true
        },
        {
          key: 'company',
          name: 'Unternehmen',
          width: 185,
          filterable: true,
          sortable: true,
          visible: true
        },
        {
          key: 'paymentType',
          name: 'Zahlungsart',
          width: 80,
          filterable: true,
          sortable: true,
          visible: true
        },
        {
          key: 'details',
          name: 'Details',
          width: 60,
          filterable: false,
          sortable: false,
          visible: true
        },
        {
          key: 'receiptable',
          name: 'SQ',
          width: 30,
          filterable: false,
          sortable: false,
          visible: true
        },
        {
          key: 'stateChange',
          name: 'Status wechseln',
          width: 110,
          filterable: false,
          sortable: false,
          visible: true
        },
        {
          key: 'sendReceipt',
          name: 'Aktion',
          width: 100,
          filterable: false,
          sortable: false,
          visible: true
        },
        {
          key: 'timeStampValue',
          visible: false
        }
      ],
      rows: [],
      filters: {},
      restConfig: getConfig(),
      cartDetails: {},
      selectedCartStates: [{ value: 'CALLBACK', label: 'Callback' }],
      cartRequest: {
        cartStates: ['CALLBACK'],
        from: 0,
        to: 0
      },
      selectedIndexes: []
    };
  }

  componentDidMount() {
    let to = new Date();
    let from;
    if (to.getMonth() < 3) {
      from = new Date(to.getFullYear() - 1, 12 - (3 - to.getMonth()));
    } else {
      from = new Date(to.getFullYear(), to.getMonth() - 2);
    }
    this.state.cartRequest.from = from.getTime();
    this.state.cartRequest.to = to.getTime();
    this.forceUpdate();
    this.loadCarts();
  }

  loadCarts() {
    this.refs['spinner'].showSpinner();
    var that = this;
    axios
      .post('http://localhost:8083/carts', this.state.cartRequest, this.state.restConfig)
      .then(function(response) {
        var result = response.data;
        that.setState({ carts: [], rows: [] });
        var rows = that.createRows(result);
        that.setState({ carts: result, rows: rows });
        that.refs['spinner'].hideSpinner();
      })
      .catch(function(response) {
        that.refs.notification.addNotification('Fehler beim Laden der Pflanzkörbe!', response.data, 'error');
        that.refs['spinner'].hideSpinner();
      });
  }

  getCartDetails(id, event) {
    var that = this;
    var x = event.pageX;
    var y = event.pageY;
    axios
      .get('http://localhost:8083/cart/' + id, this.state.restConfig)
      .then(function(response) {
        var result = response.data;
        that.setState({ cartDetails: result, x: x, y: y });
      })
      .catch(function(response) {
        that.refs.notification.addNotification('Fehler beim Laden des Pflanzkorbes ' + id + '!', response.data, 'error');
      });
  }

  hideCartDetails(event) {
    this.setState({ cartDetails: {} });
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
    var row = {
      id: cart.id,
      user: cart.buyer ? cart.buyer.name : '',
      price: Accounting.formatNumber(cart.totalPrice, 2, '.', ','),
      status: cart.cartState,
      timestamp: moment(cart.timeStamp).format('DD.MM.YYYY'),
      firstName: cart.callBackVorname,
      lastName: cart.callBackNachname,
      company: cart.callBackFirma,
      paymentType: cart.callBackZahlungsart,
      details: this.createDetailIcon(cart.id),
      receiptable: this.createReceiptCheckbox(cart.id, cart.receiptable, cart.receipt),
      stateChange: this.createStateChangeDropdown(cart.cartState, cart.id),
      sendReceipt: cart.buyer ? this.createSendReceiptButton(cart.buyer.id, cart.receipt, cart.id) : '',
      timeStampValue: cart.timeStamp
    };
    return row;
  }

  createSendReceiptButton(userId, receipt, cartId) {
    if (receipt && receipt.receiptId) {
      return (        
        <div className="sq-buttons">
          <IconButton text="" glyphIcon="glyphicon-send" onClick={() => this.sendReceipt(userId, receipt.receiptId)} title="SQ senden"/>
          <div className="spacer"></div>
          <IconButton text="" glyphIcon="glyphicon-download" onClick={() => this.generateReceiptPdf(receipt.receiptId)} title="SQ download"/>
        </div>
      );
    } else {
      return (
        <div>
          <IconButton text="" glyphIcon="glyphicon-cog" onClick={() => this.createAndSendReceipt(userId, cartId)} title="SQ generieren"/>
        </div>
      );
    }
  }

  createAndSendReceipt(userId, cartId) {
    var that = this;
    axios
      .post('http://localhost:8081/receipt/createAndSend?userId=' + userId + '&cartId=' + cartId, {}, this.state.restConfig)
      .then(function(response) {
        that.refs.notification.addNotification('Quittung erstellt und versandt!', 'Die Quittung wurde an den User verschickt!', 'success');
        that.loadCarts();
      })
      .catch(function(error) {
        that.refs.notification.addNotification('Es ist ein Fehler aufgetreten!', 'Beim erzeugen und versenden der Quittung ist ein Fehler aufgetreten: "' + error.response.data + '"', 'error');
      });
  }

  sendReceipt(userId, receiptId) {
    var that = this;
    axios
      .post('http://localhost:8081/receipt/send?userId=' + userId + '&receiptId=' + receiptId, {}, this.state.restConfig)
      .then(function(response) {
        that.refs.notification.addNotification('Mail versandt!', 'Die Quittung wurde an den User verschickt!', 'success');
      })
      .catch(function(error) {
        that.refs.notification.addNotification('Es ist ein Fehler aufgetreten!', 'Beim versenden der Quittung ist ein Fehler aufgetreten: "' + error.response.data + '"', 'error');
      });
  }

  createReceiptCheckbox(id, value, receipt) {
    return (
      <div className="align-center">
        <input type="checkbox" checked={value} onChange={event => this.changeReceiptableFlag(id, event, receipt)} disabled={receipt} />
      </div>
    );
  }

  changeReceiptableFlag(id, event, receipt) {
    let value = event.target.checked;
    let thatInputField = event.target;
    var that = this;

    axios
      .post('http://localhost:8083/cart/receiptable?cartId=' + id + '&receiptable=' + value, {}, this.state.restConfig)
      .then(function(response) {
        thatInputField.checked = value;
        for (var cart in that.state.carts) {
          if (that.state.carts[cart].id == id) {
            that.state.carts[cart].receiptable = value;
            break;
          }
        }
      })
      .catch(function(response) {
        that.refs.notification.addNotification(
          'Es ist ein Fehler aufgetreten!',
          'Beim Umsetzen des Quittungsflags vom Pflanzkorb mit der ID ' + id + 'auf ' + value + ' ist folgender Fehler aufgetreten:' + response.data,
          'error'
        );
      });
  }

  createDetailIcon(id) {
    var that = this;
    return (
      <div className="edit-icon">
        <span
          className="glyphicon glyphicon-list-alt"
          aria-hidden="true"
          onClick={event => {
            if ($.isEmptyObject(that.state.cartDetails)) {
              this.getCartDetails(id, event);
            } else {
              this.hideCartDetails(event);
            }
          }}
        ></span>
      </div>
    );
  }

  createStateChangeDropdown(cartState, id) {
    return (
      <div>
        <select defaultValue={cartState} value={cartState} onClick={event => event.stopPropagation()} onChange={event => this.changeStatusOfCart(id, event)}>
          <option></option>
          <option value="CALLBACK">CALLBACK</option>
          <option value="VERIFIED">VERIFIED</option>
          <option value="DISCARDED">DISCARDED</option>
          <option value="GENERATED">GENERATED</option>
          <option value="INITIAL">INITIAL</option>
        </select>
      </div>
    );
  }

  changeStatusOfCart(id, event) {
    let cartState = event.target.value;
    if (cartState != 'DISCARDED') {
      this.callSatusRequest(id, cartState);
    } else {
      this.createDiscardConfirmation(id);
    }
  }

  callSatusRequest(id, cartState) {
    var that = this;
    var config = getConfig();
    axios
      .post('http://localhost:8083/cart/changeState?cartId=' + id + '&cartState=' + cartState, {}, config)
      .then(function(response) {
        for (var cart in that.state.carts) {
          if (that.state.carts[cart].id == id) {
            that.state.carts[cart].cartState = cartState;
            break;
          }
        }
        var carts = that.state.carts;
        var rows = that.createRows(carts);
        that.setState({ carts: carts, rows: rows });
      })
      .catch(function(response) {
        that.refs.notification.addNotification(
          'Es ist ein Fehler aufgetreten!',
          'Beim Umsetzen des Status vom Pflanzkorb mit der ID ' + id + 'auf ' + cartState + ' ist folgender Fehler aufgetreten:' + response.data,
          'error'
        );
      });
  }

  createDiscardConfirmation(id) {
    this.refs.notificationSystem.addNotification({
      title: 'Achtung!',
      position: 'tc',
      autoDismiss: 0,
      message: 'Dadurch werden die Bäume zu diesem Pflanzkorb entfernt! Diese Aktion kann nicht rückgängig gemacht werden!',
      level: 'warning',
      children: (
        <div className="delete-confirmation align-center">
          <button>Abbrechen</button>
          <button id="discard-confirmation-btn"
            onClick={() => {
              this.callSatusRequest(id, 'DISCARDED');
            }}
          >
            OK
          </button>
        </div>
      )
    });
    setTimeout(() => {
      this.forceUpdate();
      document.getElementById("discard-confirmation-btn").focus();
    }, 5);
  }

  getRows() {
    return Data.Selectors.getRows({ rows: this.state.rows, filters: this.state.filters });
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
    this.setState({ filters: newFilters });
  }

  handleGridSort(sortColumn, sortDirection) {
    var sortedRows = this.state.rows;

    const comparer = (a, b) => {
      if (sortColumn == 'timestamp') {
        if (sortDirection === 'ASC') {
          return a.timeStampValue > b.timeStampValue ? 1 : -1;
        } else if (sortDirection === 'DESC') {
          return a.timeStampValue < b.timeStampValue ? 1 : -1;
        }
        return 1;
      } else {
        if (sortDirection === 'ASC') {
          return a[sortColumn] > b[sortColumn] ? 1 : -1;
        } else if (sortDirection === 'DESC') {
          return a[sortColumn] < b[sortColumn] ? 1 : -1;
        }
      }
    };

    const rows = sortDirection === 'NONE' ? ' ' : sortedRows.sort(comparer);

    this.setState({ rows: sortedRows });
  }

  sortByDateString() {}

  onClearFilters() {
    this.setState({ filters: {} });
  }

  getEmptyRowView() {
    return <div>Nothing to show</div>;
  }

  handleStateSelection(objects) {
    let states = [];
    if (null != objects) {
      for (let elm of objects) {
        states.push(elm.value);
      }
    }
    this.state.selectedCartStates = objects;
    this.state.cartRequest.cartStates = states;
    this.forceUpdate();
  }

  updateFrom(value) {
    if (value) {
      this.state.cartRequest.from = Date.parse(value);
    } else {
      this.state.cartRequest.from = 0;
    }
    this.forceUpdate();
  }

  updateTo(value) {
    if (value) {
      this.state.cartRequest.to = Date.parse(value);
    } else {
      this.state.cartRequest.to = new Date().getTime();
    }
    this.forceUpdate();
  }

  generateReceiptPdf(receiptId) {
    var config = {
      headers: {
        'X-AUTH-TOKEN': localStorage.getItem('jwt'),
      },
      responseType: 'arraybuffer',
    };
    axios.get('http://localhost:8081/receipt/pdf?receiptId=' + receiptId, config).then(function (response) {
      var result = response.data;
      var pdfData = URL.createObjectURL(new Blob([result], { type: 'application/pdf' }));
      window.open(pdfData);
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

    const cols = this.state.columns.filter(column => column.visible === true);
    let selectedOption = 'one';

    return (
      <div className="container paddingTopBottom15 cartOverview">
        <div className="row ">
          <div className="col-md-12">
            <h1>Carts</h1>
          </div>
        </div>
        <div className="row ">
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="status">Stati:</label>
              <Select
                id="status"
                name="form-field-name"
                value={this.state.selectedCartStates}
                onChange={this.handleStateSelection.bind(this)}
                isMulti={true}
                options={[
                  { value: 'VERIFIED', label: 'Verified' },
                  { value: 'CALLBACK', label: 'Callback' },
                  { value: 'INITIAL', label: 'Initial' },
                  { value: 'DISCARDED', label: 'Discarded' },
                  { value: 'GENERATED', label: 'Generated' }
                ]}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="from">Von:</label>
              <DatePicker value={new Date(this.state.cartRequest.from).toISOString()} onChange={this.updateFrom.bind(this)} dateFormat="DD.MM.YYYY" calendarPlacement="right" />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="to">Bis:</label>
              <DatePicker value={new Date(this.state.cartRequest.to).toISOString()} onChange={this.updateTo.bind(this)} dateFormat="DD.MM.YYYY" calendarPlacement="right" />
            </div>
          </div>
          <div className="col-md-3">
            <IconButton text="Lade Pflanzkörbe" glyphIcon="glyphicon-refresh" onClick={this.loadCarts.bind(this)} />
            <br />
            <br />
            <label>Ergebnisse:</label>&nbsp;{this.state.carts.length}
          </div>
        </div>
        <div className="row ">
          <div className="col-md-12">
            <ReactDataGrid
              columns={cols}
              rowGetter={this.rowGetter.bind(this)}
              rowsCount={this.getSize()}
              onGridSort={this.handleGridSort.bind(this)}
              minHeight={800}
              rowHeight={25}
              toolbar={<Toolbar enableFilter={true} />}
              onAddFilter={this.handleFilterChange.bind(this)}
              onClearFilters={this.onClearFilters.bind(this)}
              emptyRowsView={this.getEmptyRowView.bind(this)}
            />
          </div>
        </div>
        <CartDetails details={this.state.cartDetails} x={this.state.x} y={this.state.y} />
        <LoadingSpinner ref="spinner" />
        <NotificationSystem ref="notificationSystem" style={style} />
        <Notification ref="notification" />
      </div>
    );
  }
}

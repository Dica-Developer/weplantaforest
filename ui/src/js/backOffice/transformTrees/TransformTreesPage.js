import axios from 'axios';
import React, { Component } from 'react';
import createFilterOptions from 'react-select-fast-filter-options';
import VirtualizedSelect from 'react-virtualized-select';
import IconButton from '../../common/components/IconButton';
import Notification from '../../common/components/Notification';
import { getConfig } from '../../common/RestHelper';
import './transformTreesPage.less';



export default class TransformTreesPage extends Component {

  constructor() {
    super();
    this.state = {
      users: [],
      usersFilter: [],
      restConfig: getConfig(),
      fromUser: -1,
      toUser: -1,
      treesToTransfer: [],
      sumOfTreesToTransfer: -1
    }
  }

  componentDidMount() {
    this.loadUser();
  }

  loadUser() {
    var that = this;
    axios.get('http://localhost:8083/users', this.state.restConfig).then(function(response) {
      var result = response.data;
      that.createValueLabelPairsForUser(result);
    }).catch(function(response) {
      that.refs.notification.addNotification('Fehler beim Laden der Nutzer!', response.data + response.message, 'error');
    });
  }

  createValueLabelPairsForUser(users) {
    let options = [];
    for (let user of users) {
      let option = {
        value: user.id,
        label: user.name
      };
      options.push(option);
    }
    this.setState({
      users: options,
      usersFilter: createFilterOptions({
        options
      })
    });
  }

  updateToUser(user) {
    this.state.toUser = user.value;
    this.forceUpdate();
  }

  updateFromUser(user) {
    this.state.fromUser = user.value;
    var that = this;
    axios.get('http://localhost:8083/trees?userId=' + user.value, this.state.restConfig).then(function(response) {
      var result = response.data;
      let amount = 0;
      for (let tree of result) {
        amount += tree.amount;
      }
      that.setState({
        treesToTransfer: result,
        sumOfTreesToTransfer: amount
      });
    }).catch(function(response) {
      that.refs.notification.addNotification('Fehler beim Laden der Bäume!', response.data + response.message, 'error');
    });
    this.forceUpdate();
  }

  transferTrees() {
    var that = this;
    axios.post('http://localhost:8083/transformTrees?fromUserId=' + this.state.fromUser + '&toUserId=' + this.state.toUser, {}, this.state.restConfig).then(function(response) {
      that.refs.notification.addNotification('Geschafft!', 'Die Bäume wurden erfolgreich übertragen!', 'success');
      that.setState({
        fromUser: -1,
        toUser: -1,
        treesToTransfer: [],
        sumOfTreesToTransfer: -1
      })
    }).catch(error => {
      that.refs.notification.handleError(error);
    });

  }

  render() {
    let sumOfTreesToTransferDiv = '';
    if (this.state.sumOfTreesToTransfer != -1) {
      sumOfTreesToTransferDiv = <div className="row sum-of-trees">
        <div className="col-md-6">
          <label className="select-label">Anzahl der zu übertragenden Bäume:</label>
        </div>
        <div className="col-md-6">
          {this.state.sumOfTreesToTransfer}
        </div>
      </div>;
    }
    let transferButton = '';
    if (this.state.fromUser != -1 && this.state.toUser != -1) {
      transferButton = <div className="row transfer-button">
          <div className="col-md-12">
            <IconButton glyphIcon="glyphicon-transfer" text="BÄUME TRANSFERIEREN" onClick={this.transferTrees.bind(this)}/>
          </div>
        </div>;
    }
    return (
      <div className="container paddingTopBottom15 transformTreesPage">
        <div className="row ">
          <div className="col-md-12">
            <h1>Bäume übertragen</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
            <label className="select-label">Von User:</label>
          </div>
          <div className="col-md-4">
            <VirtualizedSelect name="user-from-select" value={this.state.fromUser} filterOptions={this.state.usersFilter} options={this.state.users} onChange={this.updateFromUser.bind(this)}/>
          </div>
          <div className="col-md-2">
            <label className="select-label">Zu User:</label>
          </div>
          <div className="col-md-4">
            <VirtualizedSelect name="user-to-select" value={this.state.toUser} filterOptions={this.state.usersFilter} options={this.state.users} onChange={this.updateToUser.bind(this)}/>
          </div>
        </div>
        {sumOfTreesToTransferDiv}
        {transferButton}
        <Notification ref="notification"/>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

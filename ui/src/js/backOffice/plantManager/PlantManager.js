import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';
import axios from 'axios';
import Accounting from 'accounting';

import ReactDataGrid from 'react-data-grid';
import {
  Toolbar,
  Data
} from 'react-data-grid/addons';

import ImageButton from '../../common/components/ImageButton';
import Notification from '../../common/components/Notification';
import BottomPart from '../../planting/BottomPart';
import Project from '../../planting/customPlantPage/Project';
import {getConfig} from '../../common/RestHelper';

require("./plantManager.less");

export default class PlantManager extends Component {

  constructor() {
    super();
    this.state = {
      users: [],
      columns: [
        {
          key: 'checkbox',
          name: ' ',
          width: 100,
          filterable: false
        },{
        key: 'user',
        name: 'User',
        width: 200,
        filterable: true
      }],
      rows: [],
      filters: {},
      selectedUserId: null,
      projects: [],
      overallPrice: 0
    };
    this.updatePrice = this.updatePrice.bind(this);
  }

  componentDidMount() {
    var that = this;
    var config = getConfig();
    axios.get('http://localhost:8083/users', config).then(function(response) {
      var result = response.data;
      var rows = that.createRows(result);
      that.setState({
        users: result,
        rows: rows
      });
    }).catch(function(response) {
      that.refs.notification.addNotification('Fehler beim Laden der Nutzer!', response.data + response.message, 'error');
    });
    axios.get('http://localhost:8081/reports/activeProjects').then(function(response) {
      var result = response.data;
      that.setState({projects: result});
      that.forceUpdate();
    }).catch(function(response) {
      that.refs.notification.addNotification('Fehler beim Laden der aktiven Projekte!', response.data + response.message, 'error');
    });
  }

  updatePrice() {
    var price = 0;
    for (var project in this.state.projects) {
      price = price + parseInt(this.refs["project_" + project].getPrice());
    }
    this.state.overallPrice = price;
    this.forceUpdate();
  }

  updatePlantBag() {
    for (var project in this.state.projects) {
      var projectItems = {};
      var updateProject = false;
      for (var article in this.refs["project_" + project].getArticles()) {
        if (this.refs["project_" + project].getArticleValue(article) != null && this.refs["project_" + project].getArticleValue(article) > 0) {
          projectItems[this.refs["project_" + project].getArticles()[article].treeType.name] = {
            amount: parseInt(this.refs["project_" + project].getArticleValue(article)),
            price: parseInt(this.refs["project_" + project].getArticles()[article].price.priceAsLong),
            imageFile: this.refs["project_" + project].getArticles()[article].treeType.imageFile
          };
          updateProject = true;
        }
      }
      if (updateProject) {
        this.props.route.updatePlantBag(this.refs["project_" + project].getPrice(), projectItems, this.state.projects[project].projectName, this.props.route.isGift);
      }
    }
  }

  plantForUser(){
    var that = this;
    this.updatePlantBag();
    var plantBag = JSON.parse(localStorage.getItem('plantBag'));
    var request = {
      userId: this.state.selectedUserId,
      plantBag: plantBag
    };

    var config = getConfig();
    axios.post('http://localhost:8081/plantForUser/' , request, config).then(function(response) {
      that.refs.notification.addNotification('Bäume wurden für den Nutzer gepflant!', '', 'success');
    }).catch(function(response) {
      that.refs.notification.addNotification('Ein Fehler ist aufgetreten!', '', 'error');
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
      checkbox: this.createCheckbox(user.id),
      user: user.name
    };
    return row;
  }

  createCheckbox(id){
    return <div className="checkbox">
              <input type="checkbox"  onClick={() => {
                this.selectUser(id)
              }}/>
            </div>;
  }

  selectUser(id){
    this.setState({selectedUserId: id});
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
    var that = this;
    return (
        <div className="container paddingTopBottom15 plantManager">
          <div className="row ">
            <h2>Plantmanager</h2>
            <div className="col-md-4">
              <ReactDataGrid
                columns={this.state.columns}
                rowGetter={this.rowGetter.bind(this)}
                rowsCount={this.getSize()}
                minHeight={220}
                toolbar={< Toolbar enableFilter = {
                true
              } /> }
                onAddFilter={this.handleFilterChange.bind(this)}
                onClearFilters={this.onClearFilters.bind(this)}
                emptyRowsView={this.getEmptyRowView.bind(this)}
                />
            </div>
            <div className="col-md-8">
              <div>
                {this.state.projects.map(function(project, i) {
                  return (<Project key={i} project={project} ref={"project_" + i} updatePrice={that.updatePrice.bind(this)}/>);
                })}
              </div>
            </div>
            <div className="col-md-4"></div>
            <div className="col-md-8 plant-div">
              <div className="price">
                <span>GESAMT:&nbsp;{Accounting.formatNumber(this.state.overallPrice / 100, 2, ".", ",")}&nbsp;€</span>
              </div>
              <ImageButton text="PFLANZEN" onClick={this.plantForUser.bind(this)} imagePath="/assets/images/Schubkarre_braun.png" imageWidth="50" imageHeight="25"/>
            </div>
          </div>
          <Notification ref="notification"/>
        </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

import React, {Component} from 'react';
import {render} from 'react-dom';
import Boostrap from 'bootstrap';
import axios from 'axios';
import Accounting from 'accounting';
import {Link, browserHistory} from 'react-router';

import NavBar from '../../common/navbar/NavBar';
import Header from '../../common/header/Header';
import Footer from '../../common/Footer';

import ButtonBar from '../ButtonBar';
import BottomPart from '../BottomPart';

import Project from './Project';

require("./customPlantPage.less");

export default class CustomPlantPage extends Component {

  constructor() {
    super();
    this.state = {
      projects: [],
      overallPrice: 0,
      isGift: false,
      isAbo: false,
      slideIn: false
    };
    this.updatePrice = this.updatePrice.bind(this);
  }

  componentDidMount() {
    this.setState({isGift: this.props.route.isGift, isAbo: this.props.route.isAbo, slideIn: true});
    var that = this;
    axios.get('http://localhost:8081/reports/activeProjects').then(function(response) {
      var result = response.data;
      that.setState({projects: result, slideIn: false});
      that.forceUpdate();
    });
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
        this.props.route.updatePlantBag(this.refs["project_" + project].getPrice(), projectItems, this.state.projects[project].projectName);
      }
    }
  }

  updatePrice() {
    var price = 0;
    for (var project in this.state.projects) {
      price = price + parseInt(this.refs["project_" + project].getPrice());
    }
    this.state.overallPrice = price;
    this.forceUpdate();
  }

  render() {
    var that = this;
    return (
      <div className="container paddingTopBottom15">
        <div className="row customPlantPage">
          <div className="col-md-12">
            <h2>{this.props.route.header}</h2>
            <ButtonBar chosen="custom"/>
            <div ref="planting" className={(this.state.slideIn
              ? 'sliding-in '
              : 'sliding-out ') + "plantItems"}>
              {this.state.projects.map(function(project, i) {
                return (<Project key={i} project={project} ref={"project_" + i} updatePrice={that.updatePrice.bind(this)}/>);
              })}
            </div>
            <BottomPart updatePlantBag={this.updatePlantBag.bind(this)} overallPrice={this.state.overallPrice}/>
          </div>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

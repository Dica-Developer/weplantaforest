import React, {Component} from 'react';
import {render} from 'react-dom';
import Boostrap from 'bootstrap';
import Accounting from 'accounting';
import {Link} from 'react-router';

import ArticleSlider from './ArticleSlider';

require("./projectPlanting.less");
require("./slider.less");

export default class ProjectPlanting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overallPrice: 10
    };
  }

  showDetails() {
    this.props.showDetails();
  }

  updateValue(event) {
    this.setState({overallPrice: event.target.value});
  }

  render() {
    let imageUrl = 'http://localhost:8081/treeType/image/' + this.props.articles[0].treeType.imageFile + '/60/60';
    return (
      <div className="projectPlanting">
        <h2>{this.props.projectName}&nbsp;/&nbsp;
          <i>hier pflanzen</i>
        </h2>

        <div className="summary">
          <div>
            PREIS&nbsp;/&nbsp;STÜCKZAHL&nbsp;<span className="bold">
              GESAMT</span>
          </div>
          <div className="sliderDiv">
            <input type="range" min="1" max="1000" step="1" stepUp="5" defaultValue="10" onChange={this.updateValue.bind(this)}/>
          </div>
          <div className="summaryDiv">
            <span className="overallPrice">{this.state.overallPrice}&nbsp;€</span>
          </div>
        </div>
        {this.props.articles.map(function(article, i) {
          return (<ArticleSlider article={article} key={i}/>);
        })}

        <table className="bottomTable">
          <tbody>
            <tr>
              <td></td>
              <td>
                <span>GESAMT:&nbsp;{this.state.overallPrice}&nbsp;€</span>
              </td>
              <td>
                <a role="button">
                  <div>
                    <img src="/assets/images/Schubkarre_braun.png" alt="online pflanzen" width="50" height="50"/>
                    <span className="no-link-deco">AB IN MEINEN<br/>PFLANZKORB!</span>
                  </div>
                </a>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="bottom">
          <a role="button" className="backLink" onClick={this.showDetails.bind(this)}>
            <div className="backDiv">
              <span className="glyphicon glyphicon-backward" aria-hidden="true"></span>
              <span className="no-link-deco">
                ZURÜCK ZUR BESCHREIBUNG
              </span>
            </div>
          </a>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

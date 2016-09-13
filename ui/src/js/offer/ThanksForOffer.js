import React, {Component} from 'react';
import {render} from 'react-dom';
import Boostrap from 'bootstrap';


require("./projectOffer.less");

export default class ProjectOfferPage extends Component {

  constructor() {
    super();

  }

  setThankYou(){
    this.props.setThankYou(false);
  }

  render() {
    return (
      <div className="col-md-12">
        <h2 className="thanks">Vielen Dank für das Anbieten einer Projektfläche!</h2>
        <br/>
        <a role="button" className="mailLink" onClick={this.setThankYou.bind(this)}>
          <div className="mailDiv">
            <span className="glyphicon glyphicon-backward" aria-hidden="true"></span>
            <span className="no-link-deco">
              WEITERES ANGEBOT ABGEBEN
            </span>
          </div>
        </a>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

import React, {Component} from 'react';
import {render} from 'react-dom';
import Boostrap from 'bootstrap';

export default class PlantingDone extends Component {

  constructor() {
    super();
  }

  setPlantingDone(){
    this.props.setPlantingDone(false);
  }

  render() {
    return (
      <div className="col-md-12">
        <h2 className="plantingDone">Deine Pflanzung wurde erstellt!</h2>
        <br/>
        <a role="button" className="sendLink" onClick={this.setPlantingDone.bind(this)}>
          <div className="sendDiv">
            <span className="glyphicon glyphicon-backward" aria-hidden="true"></span>
            <span className="no-link-deco">
              WEITERE PFLANZUNG ERSTELLEN
            </span>
          </div>
        </a>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

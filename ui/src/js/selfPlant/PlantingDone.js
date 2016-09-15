import React, {Component} from 'react';
import {render} from 'react-dom';
import Boostrap from 'bootstrap';

import IconButton from '../common/components/IconButton';

export default class PlantingDone extends Component {

  constructor() {
    super();
  }

  setPlantingDone() {
    this.props.setPlantingDone(false);
  }

  render() {
    return (
      <div className="col-md-12">
        <h2 className="plantingDone">Deine Pflanzung wurde erstellt!</h2>
        <br/>
        <div className="align-center">
          <IconButton text="WEITERE PFLANZUNG ERSTELLEN" glyphIcon="glyphicon-backward" onClick={this.setPlantingDone.bind(this)}/>
        </div>
        <br/>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

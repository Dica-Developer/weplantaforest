import React, {Component} from 'react';
import {render} from 'react-dom';
import Boostrap from 'bootstrap';

import DoPlanting from './DoPlanting';

require('./selfPlant.less');

export default class SelfPlantPage extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="container paddingTopBottom15 selfPlant">
        <DoPlanting />
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

import axios from 'axios';
import React, {Component} from 'react';
import {render} from 'react-dom';

import Boostrap from 'bootstrap';

require("./rankingContainer.less");

export default class NoTreesAvailable extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="timeRankingLarge">
        <div className="col-md-12">
          <h2>Du hast noch keine Bäume gepflanzt!? Na klasse, deine Kinder werden dir dankbar sein...</h2>
          <p>(Hier wäre noch eine Beschreibung gut, was da wirklich hin soll)</p>
        </div>
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */

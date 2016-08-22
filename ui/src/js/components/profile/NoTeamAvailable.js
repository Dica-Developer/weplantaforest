import axios from 'axios';
import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';

import Boostrap from 'bootstrap';

export default class NoTeamAvailable extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="col-md-6 teamDetails">
        <h2>Du bist noch keinem Team beigetreten! Hast du keine Freunde!?</h2>
        <p>(Hier wäre noch eine Beschreibung gut, was da wirklich hin soll)</p>
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */

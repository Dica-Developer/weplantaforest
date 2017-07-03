import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import Translate from 'react-translate-component';
import counterpart from 'counterpart';

import ImageButton from '../components/ImageButton';

export default class ButtonBar extends Component {

  constructor() {
    super();
  }

  linkTo(url) {
    browserHistory.push(url);
  }

  render() {
    return (
      <div className="buttonBar">
        <ImageButton text={counterpart.translate('buttonbar.plant_self')} onClick={() => {
          this.linkTo('/selfPlant')
        }} imagePath="/assets/images/Spaten.png" imageWidth="35" imageHeight="35"/>
        <br/>
        <ImageButton text={counterpart.translate('buttonbar.plant_online')} onClick={() => {
          this.linkTo('/plant/5')
        }} imagePath="/assets/images/Maus.png" imageWidth="35" imageHeight="35"/>
        <br/>
        <ImageButton text={counterpart.translate('buttonbar.tree_service')} onClick={() => {
          this.linkTo('/plant')
        }} imagePath="/assets/images/Schere.png" imageWidth="35" imageHeight="35"/>
      </div>
    );
  }
}

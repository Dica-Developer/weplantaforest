import counterpart from 'counterpart';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import SvgButton from '../components/SvgButton';


export default class ButtonBar extends Component {

  constructor() {
    super();
  }

  linkTo(url, mouseEvent) {
    let evt = mouseEvent.hasOwnProperty('nativeEvent') ? mouseEvent.nativeEvent : mouseEvent;
    if (evt.which == 1) {
      browserHistory.push(url);
    } else if (evt.which == 2) {
      window.open("http://localhost:8080" + url, "_blank");
    }
  }

  render() {
    return (
      <div className="buttonBar">
        <SvgButton text={counterpart.translate('BUTTONBAR.PLANT_SELF')} buttonType="shovel" onClick={(event) => {
          this.linkTo('/selfPlant', event);
        }} />
        <br/>
        <SvgButton text={counterpart.translate('BUTTONBAR.PLANT_ONLINE')} buttonType="mouse" onClick={(event) => {
          this.linkTo('/plant/5', event);
        }} />
        <br/>
        <SvgButton text={counterpart.translate('BUTTONBAR.TREE_SERVICE')} buttonType="secateurs" onClick={(event) => {
          this.linkTo('/treeService', event);
        }} />
      </div>
    );
  }
}

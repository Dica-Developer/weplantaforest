import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';

import ImageButton from '../components/ImageButton';

export default class ButtonBar extends Component {

  constructor() {
    super();
  }

  linkTo(url){
    browserHistory.push(url);
  }

  render() {
    return (
      <div className="buttonBar">
        <ImageButton text="SELBST PFLANZEN" onClick={()=>{this.linkTo('/selfPlant')}} imagePath="/assets/images/Spaten.png" imageWidth="25" imageHeight="50"/>
        <br/>
        <ImageButton text="ONLINE PFLANZEN" onClick={()=>{this.linkTo('/plant/5')}} imagePath="/assets/images/Maus.png" imageWidth="50" imageHeight="50"/>
        <br/>
        <ImageButton text="BAUMSERVICE" onClick={()=>{this.linkTo('/plant')}} imagePath="/assets/images/Schere.png" imageWidth="59" imageHeight="50"/>
      </div>
    );
  }
}

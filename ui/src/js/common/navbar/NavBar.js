import React, {Component} from 'react';
import {Link, browserHistory } from 'react-router';

import Menu from './Menu';
import MenuItem from './MenuItem';
import PlantBag from './PlantBag';
import LoginMenuItem from './LoginMenuItem';
import ImageButton from '../components/ImageButton';

require("./navbar.less");
require("./menu.less");

export default class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      profileLinksInActive: 'true'
    }
  }

  componentDidMount() {
    this.setProfileLinkIsInActive();
  }

  showLeft() {
    this.refs.left.show();
  }

  showRight() {
    this.refs.right.show();
  }

  updatePlantBag(price, projectItems, projectName) {
    this.refs["plantBag"].updatePlantBag(price, projectItems, projectName);
  }

  updateComponent(){
    this.setProfileLinkIsInActive();
    this.refs["plantBag"].resetPlantBag();
    this.forceUpdate();
  }

  setProfileLinkIsInActive(){
    if(localStorage.getItem('username') == null || localStorage.getItem('username') == ''){
      this.setState({profileLinksInActive: 'true'});
    }else{
      this.setState({profileLinksInActive: 'false'});
    }
  }

  linkTo(url){
    browserHistory.push(url);
  }

  render() {
    return (
      <div>
        <Menu ref="left" alignment="left">
          <MenuItem hash="first-page">PFLANZUNGEN</MenuItem>
          <MenuItem hash="/explore">PROJEKTFLÄCHEN</MenuItem>
          <MenuItem hash="third-page">FINDEN</MenuItem>
          <MenuItem hash="5">GUTSCHEIN</MenuItem>
          <MenuItem hash="/projectOffer">FLÄCHE ANBIETEN</MenuItem>
          <MenuItem hash="/ranking">BESTENLISTE</MenuItem>
          <MenuItem hash="8">STATISTIKEN</MenuItem>
          <MenuItem hash="9">BLOG</MenuItem>
          <MenuItem hash="10">FAQs</MenuItem>
        </Menu>
        <Menu ref="right" alignment="right">
          <LoginMenuItem hash="login" updateComponent={this.updateComponent.bind(this)}></LoginMenuItem>
          <MenuItem hash={"/user/" + localStorage.getItem('username')} inactive={this.state.profileLinksInActive}>MEIN PROFIL</MenuItem>
          <MenuItem hash="third-page" inactive={this.state.profileLinksInActive}>MEIN TEAM</MenuItem>
          <MenuItem hash="4" inactive={this.state.profileLinksInActive}>POSTFACH</MenuItem>
          <MenuItem hash="6" inactive={this.state.profileLinksInActive}>ABONNEMENTS</MenuItem>
        </Menu>
        <nav id="navBar" className="navbar navbar-default navbar-fixed-top">
          <div className="navbar-header">
            <div className="navbar-left">
              <ImageButton text="MENU" onClick={this.showLeft.bind(this)} imagePath="/assets/images/Menu.png" imageWidth="50" imageHeight="50"/>
            </div>
          </div>
          <div className="collapse navbar-collapse" id="navbarLinkBar">
            <div className="navbar-right">
              <ImageButton text="MEIN WALD" onClick={this.showRight.bind(this)} imagePath="/assets/images/MeinWald.png" imageWidth="58" imageHeight="50"/>
            </div>
            <div className="container">
              <div className="navbar-left">
                <ImageButton text="" onClick={()=>{this.linkTo('/')}} imagePath="/assets/images/ipat_logo.png" imageWidth="50" imageHeight="50"/>
                <ImageButton text="" onClick={()=>{this.linkTo('/selfPlant')}} imagePath="/assets/images/Spaten.png" imageWidth="25" imageHeight="50"/>
                <ImageButton text="" onClick={()=>{this.linkTo('/plant')}} imagePath="/assets/images/Maus.png" imageWidth="50" imageHeight="50"/>
                <ImageButton text="" onClick={()=>{this.linkTo('/plant')}} imagePath="/assets/images/Schere.png" imageWidth="59" imageHeight="50"/>
              </div>
              <div className="navbar-right">
                <PlantBag updatePlantBag={this.updatePlantBag.bind(this)} ref="plantBag"/>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

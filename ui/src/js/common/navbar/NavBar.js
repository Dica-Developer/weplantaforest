import axios from 'axios';
import counterpart from 'counterpart';
import React, { Component } from 'react';
import CookieBanner from 'react-cookie-banner';
import { browserHistory } from 'react-router';
import SvgButton from '../components/SvgButton';
import BackOfficeMenuItem from './BackOfficeMenuItem';
import LanguageMenuItem from './LanguageMenuItem';
import LoginMenuItem from './LoginMenuItem';
import Menu from './Menu';
import MenuItem from './MenuItem';
import PlantBag from './PlantBag';
import UserDetails from './UserDetails';

require('./navbar.less');
require('./menu.less');

export default class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      language: localStorage.getItem('language') == null ? 'DEUTSCH' : localStorage.getItem('language'),
      userDetails: {
        co2Data: {}
      }
    };
  }

  componentDidMount() {
    this.isLoggedIn();
    localStorage.setItem('language', this.state.language);
  }

  showLeft() {
    this.refs.left.show();
  }

  showRight() {
    this.refs.right.show();
  }

  updatePlantBagFromLocaleStorage() {
    this.refs['plantBag'].updatePlantBagFromLocaleStorage();
  }

  updatePlantBag(price, projectItems, projectName, isGift) {
    localStorage.setItem('isGift', isGift);
    this.refs['plantBag'].updatePlantBag(price, projectItems, projectName);
  }

  resetPlantBag() {
    this.refs['plantBag'].resetPlantBag();
  }

  updateLanguage(value) {
    localStorage.setItem('language', value);
    this.setState({
      language: value
    });
    if (localStorage.getItem('jwt') != null && localStorage.getItem('jwt') != '') {
      var config = {
        headers: {
          'X-AUTH-TOKEN': localStorage.getItem('jwt')
        }
      };
      axios.post('http://localhost:8081/user/edit?userName=' + encodeURIComponent(localStorage.getItem('username')) + '&toEdit=LANGUAGE&newEntry=' + value, {}, config);
    }
    if (value == 'DEUTSCH') {
      this.props.switchLocale('de');
    } else if (value == 'ENGLISH') {
      this.props.switchLocale('en');
    }
  }

  updateComponents() {
    this.isLoggedIn();
  }

  isLoggedIn() {
    if (localStorage.getItem('username') == null || localStorage.getItem('username') == '') {
      this.setState({
        isLoggedIn: false,
        userDetails: {
          co2Data: {}
        }
      });
    } else {
      let userDetails;
      if (localStorage.getItem('userDetails') && localStorage.getItem('userDetails') != '') {
        userDetails = JSON.parse(localStorage.getItem('userDetails'));
      } else {
        userDetails = { co2Data: {} };
      }
      this.setState({
        isLoggedIn: true,
        userDetails: userDetails
      });
    }
  }

  linkTo(url, mouseEvent) {
    let evt = mouseEvent.hasOwnProperty('nativeEvent') ? mouseEvent.nativeEvent : mouseEvent;
    if (evt.which == 1) {
      browserHistory.push(url);
    } else if (evt.which == 2) {
      window.open('http://localhost:8080' + url, '_blank');
    }
  }

  logout() {
    this.refs['login-menu-item'].logout();
  }

  loadUserDetails() {
    this.refs['login-menu-item'].loadUserDetails();
  }

  render() {
    let myForrestButton;
    let userDetails;
    if (this.state.isLoggedIn) {
      myForrestButton = (
        <div className="navbar-right myForrestDiv">
          <SvgButton text={counterpart.translate('NAVBAR.MY_FOREST')} buttonType="trees" onClick={this.showRight.bind(this)} />
        </div>
      );
      userDetails = <UserDetails user={this.state.userDetails} updateNavbar={this.updateComponents.bind(this)} />;
    } else {
      myForrestButton = '';
      userDetails = (
        <div className="user-details logged-out">
          {' '}
          <a className="pull left" onClick={this.showRight.bind(this)}>
            Login
          </a>{' '}
          <a
            className="pull right"
            onMouseUp={event => {
              this.linkTo('/registration', event);
            }}
          >
            {counterpart.translate('REGISTRATE')}
          </a>
        </div>
      );
    }

    return (
      <div>
        <Menu ref="left" alignment="left">
          <MenuItem hash="/projects">{counterpart.translate('NAVBAR.PROJECTS')}</MenuItem>
          <MenuItem hash="/ranking">{counterpart.translate('NAVBAR.LEAGUE_TABLES')}</MenuItem>
          <MenuItem hash="/certificate/find">{counterpart.translate('NAVBAR.FIND_PLANTINGS')}</MenuItem>
          <MenuItem hash={'/gift/redeem'}>{counterpart.translate('NAVBAR.REDEEM_VOUCHER')}</MenuItem>
          <MenuItem hash="/co2Calculator">{counterpart.translate('NAVBAR.CO2_CALCULATOR')}</MenuItem>
          <MenuItem hash="/projectOffer">{counterpart.translate('NAVBAR.OFFER_ACREAGE')}</MenuItem>
          <MenuItem hash="/blog">{counterpart.translate('NAVBAR.BLOG')}</MenuItem>
          <LanguageMenuItem language={this.state.language} updateLanguage={this.updateLanguage.bind(this)} />
        </Menu>
        <Menu ref="right" alignment="right">
          <LoginMenuItem ref="login-menu-item" hash="login" updateNavbar={this.updateComponents.bind(this)} updateLanguage={this.updateLanguage.bind(this)}></LoginMenuItem>
          <MenuItem hash={'/user/' + encodeURIComponent(localStorage.getItem('username'))} inactive={!this.state.isLoggedIn}>
            {counterpart.translate('NAVBAR.MY_PROFIL')}
          </MenuItem>
          <MenuItem hash={'/tools/' + encodeURIComponent(localStorage.getItem('username'))} inactive={!this.state.isLoggedIn}>
            {counterpart.translate('NAVBAR.TOOLS')}
          </MenuItem>
          <MenuItem hash={'/gifts/' + encodeURIComponent(localStorage.getItem('username'))} inactive={!this.state.isLoggedIn}>
            {counterpart.translate('NAVBAR.VOUCHERS')}
          </MenuItem>
          <MenuItem hash={'/receipts/' + encodeURIComponent(localStorage.getItem('username'))} inactive={!this.state.isLoggedIn}>
            {counterpart.translate('NAVBAR.CONTRIBUTION_RECEIPTS')}
          </MenuItem>
          <BackOfficeMenuItem hash="/backOffice">{counterpart.translate('NAVBAR.BACKOFFICE')}</BackOfficeMenuItem>
        </Menu>
        <nav id="navBar" className="navbar navbar-default navbar-fixed-top">
          <div className="navbar-left">
            <SvgButton text={counterpart.translate('NAVBAR.MENU')} buttonType="hamburger" onClick={this.showLeft.bind(this)} />
          </div>
          {myForrestButton}
          <div className="container">
            <div className="collapse navbar-collapse" id="navbarLinkBar">
              <div className="navbar-left">
                <SvgButton
                  text=""
                  buttonType="ipatlogo"
                  onClick={event => {
                    this.linkTo('/', event);
                  }}
                />
                <SvgButton
                  text=""
                  buttonType="shovel"
                  onClick={event => {
                    this.linkTo('/selfPlant', event);
                  }}
                />
                <SvgButton
                  text=""
                  buttonType="mouse"
                  onClick={event => {
                    this.linkTo('/plant/5', event);
                  }}
                />
              </div>
            </div>
            <div className="navbar-right">
              {userDetails}
              <PlantBag updatePlantBag={this.updatePlantBag.bind(this)} ref="plantBag" />
            </div>
          </div>
        </nav>
        <CookieBanner
          message={counterpart.translate('NAVBAR.COOKIE_MESSAGE')}
          buttonMessage={counterpart.translate('NAVBAR.UNDERSTOOD')}
          link={<a href="/privacy">{counterpart.translate('NAVBAR.FURTHER_INFORMATION')}</a>}
          onAccept={() => {}}
          cookie="user-has-accepted-cookies"
          dismissOnScroll={false}
          disableStyle={true}
        />
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

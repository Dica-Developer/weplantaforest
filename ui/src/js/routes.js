import counterpart from 'counterpart';
import React, { Component } from 'react';
import { browserHistory, Route, Router } from 'react-router';
import ActivationPage from './activation/ActivationPage';
import ArticleCreater from './backOffice/articleManager/ArticleCreater';
import ArticleEditor from './backOffice/articleManager/ArticleEditor';
import LoadableArticleManager from './backOffice/articleManager/LoadableArticleManager';
import CartOverview from './backOffice/cartManager/CartOverview';
import EventEditor from './backOffice/eventManager/EventEditor';
import EventOverview from './backOffice/eventManager/EventOverview';
import LoadableBackOfficeOverview from './backOffice/LoadableBackOfficeOverview';
import PlantManager from './backOffice/plantManager/PlantManager';
import ProjectEditor from './backOffice/projectManager/ProjectEditor';
import ProjectOverview from './backOffice/projectManager/ProjectOverview';
import SliderImageManager from './backOffice/sliderImageManager/SliderImageManager';
import TransformTreesPage from './backOffice/transformTrees/TransformTreesPage';
import TreeTypeOverview from './backOffice/treeTypeManager/TreeTypeOverview';
import UserOverview from './backOffice/userManager/UserOverview';
import BlogOverviewPage from './blog/BlogOverviewPage';
import BlogPage from './blog/BlogPage';
import LoadableCo2Calculator from './co2/LoadableCo2Calculator';
import Notification from './common/components/Notification';
import Footer from './common/footer/Footer';
import AboutUs from './common/footer/pages/AboutUs';
import Award from './common/footer/pages/Award';
import Contact from './common/footer/pages/Contact';
import Disclaimer from './common/footer/pages/Disclaimer';
import Financial from './common/footer/pages/Financial';
import Imprint from './common/footer/pages/Imprint';
import Links from './common/footer/pages/Links';
import Partner from './common/footer/pages/Partner';
import Privacy from './common/footer/pages/Privacy';
import Social from './common/footer/pages/Social';
import Terms from './common/footer/pages/Terms';
import TreeService from './common/footer/pages/TreeService';
import Header from './common/header/Header';
import NavBar from './common/navbar/NavBar';
import FAQ from './faq/FaqView';
import FindTreePage from './findTree/FindTreePage';
import GiftOverview from './gifts/overview/GiftOverview';
import RedeemGiftPage from './gifts/redeem/RedeemGiftPage';
import LoadableMainPage from './main/LoadableMainPage';
import ProjectOfferPage from './offer/ProjectOfferPage';
import ForgotPasswordPage from './password/forgotPassword/ForgotPasswordPage';
import ResetPasswordPage from './password/resetPassword/ResetPasswordPage';
import ErrorCC from './payment/ErrorCC';
import PaymentPage from './payment/PaymentPage';
import SuccessCC from './payment/SuccessCC';
import PlantBagPage from './plantBag/PlantBagPage';
import CustomPlantPage from './planting/customPlantPage/CustomPlantPage';
import ProposalPlantPage from './planting/proposalPlantPage/ProposalPlantPage';
import ProfilePage from './profile/ProfilePage';
import ReceiptsPage from './profile/ReceiptsPage';
import ToolsPage from './profile/ToolsPage';
import ProjectDetailsPage from './project/ProjectDetailsPage';
import ProjectsPage from './projects/ProjectsPage';
import RankingPage from './ranking/RankingPage';
import RegistrationPage from './registration/RegistrationPage';
import SelfPlantPage from './selfPlant/SelfPlantPage';
import SelfPlantOverviewPage from './selfPlantOverview/SelfPlantOverviewPage';
import StatisticsPage from './statistics/StatisticsPage';
import TeamPage from './team/TeamPage';
import ForbiddenPage from './views/ForbiddenPage';
import NotFoundPage from './views/NotFoundPage';

export default class Routes extends Component {
  componentDidMount() {}

  reRender() {
    this.forceUpdate();
  }

  updatePlantBag(price, projectItems, projectName, isGift) {
    this.refs['navbar'].updatePlantBag(price, projectItems, projectName, isGift);
  }

  updatePlantBagFromLocaleStorage() {
    this.refs['navbar'].updatePlantBagFromLocaleStorage();
  }

  updateNavbarComponents() {
    this.refs['navbar'].updateComponents();
  }

  resetPlantBag() {
    this.refs['navbar'].resetPlantBag();
  }

  switchLocale(locale) {
    counterpart.setLocale(locale);
    location.reload();
  }

  showLoginSlide() {
    this.refs['navbar'].showRight();
  }

  updateLanguage(value) {
    this.refs['navbar'].updateLanguage(value);
  }

  redeemGift() {
    if (localStorage.getItem('username') && localStorage.getItem('username') != '') {
      browserHistory.push('/user/' + encodeURIComponent(localStorage.getItem('username')));
      this.refs.notification.addNotification(counterpart.translate('GIFT_REDEEMED'), counterpart.translate('TREES_ACCOUNTED'), 'success');
    }
  }

  logout() {
    this.refs['navbar'].logout();
    this.showLoginSlide();
  }

  loadUserDetails() {
    setTimeout(() => {
      // return the timeoutID
      this.refs['navbar'].loadUserDetails();
      this.refs['header'].loadCo2Data();
    }, 500);
  }

  render() {
    counterpart.registerTranslations('de', require('counterpart/locales/de'));
    counterpart.registerTranslations('en', require('./locales/en'));
    counterpart.registerTranslations('de', require('./locales/de'));
    counterpart.setLocale(localStorage.getItem('language') == 'ENGLISH' ? 'en' : 'de');
    return (
      <div>
        <NavBar ref="navbar" reRender={this.reRender.bind(this)} switchLocale={this.switchLocale} />
        <Header ref="header" />
        <Router history={browserHistory}>
          <Route path="/" component={LoadableMainPage} reRender={this.reRender.bind(this)} />
          <Route
            path="/plant/:amount"
            component={ProposalPlantPage}
            updatePlantBag={this.updatePlantBag.bind(this)}
            reRender={this.reRender.bind(this)}
            header={counterpart.translate('PLANT_ONLINE')}
            isGift={false}
            isAbo={false}
          />
          <Route
            path="/plant3"
            component={CustomPlantPage}
            updatePlantBag={this.updatePlantBag.bind(this)}
            reRender={this.reRender.bind(this)}
            header={counterpart.translate('PLANT_ONLINE')}
            isGift={false}
            isAbo={false}
          />
          <Route
            path="/plantGift/:amount"
            component={ProposalPlantPage}
            updatePlantBag={this.updatePlantBag.bind(this)}
            reRender={this.reRender.bind(this)}
            header={counterpart.translate('CREATE_GIFT')}
            isGift={true}
            isAbo={false}
          />
          <Route
            path="/plantGift2"
            component={CustomPlantPage}
            updatePlantBag={this.updatePlantBag.bind(this)}
            reRender={this.reRender.bind(this)}
            header={counterpart.translate('CREATE_GIFT')}
            isGift={true}
            isAbo={false}
          />
          <Route path="/projects" component={ProjectsPage} reRender={this.reRender.bind(this)} />
          <Route path="/projects/:projectName" component={ProjectDetailsPage} updatePlantBag={this.updatePlantBag.bind(this)} reRender={this.reRender.bind(this)} />
          <Route
            path="/user/:userName"
            component={ProfilePage}
            reRender={this.reRender.bind(this)}
            logout={this.logout.bind(this)}
            updateLanguage={this.updateLanguage.bind(this)}
            loadUserDetails={this.loadUserDetails.bind(this)}
          />
          <Route path="/tools/:username" component={ToolsPage} reRender={this.reRender.bind(this)} />
          <Route path="/receipts/:username" component={ReceiptsPage} reRender={this.reRender.bind(this)} />
          <Route path="/ranking" component={RankingPage} reRender={this.reRender.bind(this)} />
          <Route path="/projectOffer" component={ProjectOfferPage} reRender={this.reRender.bind(this)} />
          <Route path="/selfPlant" component={SelfPlantPage} reRender={this.reRender.bind(this)} loadUserDetails={this.loadUserDetails.bind(this)} />
          <Route path="/selfPlants/:treeId" component={SelfPlantOverviewPage} reRender={this.reRender.bind(this)} />
          <Route
            path="/plantBag"
            component={PlantBagPage}
            reRender={this.reRender.bind(this)}
            updatePlantBag={this.updatePlantBagFromLocaleStorage.bind(this)}
            showLoginSlide={this.showLoginSlide.bind(this)}
          />
          <Route
            path="/payCart/:cartId"
            component={PaymentPage}
            reRender={this.reRender.bind(this)}
            updateComponents={this.updateNavbarComponents.bind(this)}
            resetPlantBag={this.resetPlantBag.bind(this)}
            loadUserDetails={this.loadUserDetails.bind(this)}
          />
          <Route
            path="/payGift/:cartId/:giftId"
            component={PaymentPage}
            reRender={this.reRender.bind(this)}
            updateComponents={this.updateNavbarComponents.bind(this)}
            resetPlantBag={this.resetPlantBag.bind(this)}
            loadUserDetails={this.loadUserDetails.bind(this)}
          />
          <Route path="/registration" component={RegistrationPage} reRender={this.reRender.bind(this)} />
          <Route path="/userActivation" component={ActivationPage} reRender={this.reRender.bind(this)} />
          <Route path="/forgotPassword" component={ForgotPasswordPage} reRender={this.reRender.bind(this)} />
          <Route path="/password_reset" component={ResetPasswordPage} reRender={this.reRender.bind(this)} showLoginSlide={this.showLoginSlide.bind(this)} />
          <Route path="/gifts/:userName" component={GiftOverview} reRender={this.reRender.bind(this)} redeemGift={this.redeemGift.bind(this)} />
          <Route path="/gift/redeem" component={RedeemGiftPage} reRender={this.reRender.bind(this)} redeemGift={this.redeemGift.bind(this)} showLoginSlide={this.showLoginSlide.bind(this)} />
          <Route path="/certificate/find" component={FindTreePage} reRender={this.reRender.bind(this)} />
          <Route path="/statistics" component={StatisticsPage} reRender={this.reRender.bind(this)} />
          <Route path="/team/:teamName" component={TeamPage} reRender={this.reRender.bind(this)} />
          <Route path="/blog/:articleId" component={BlogPage} reRender={this.reRender.bind(this)} />
          <Route path="/blog" component={BlogOverviewPage} reRender={this.reRender.bind(this)} />
          <Route path="/payCC/succes/:cartId" component={SuccessCC} reRender={this.reRender.bind(this)} />
          <Route path="/payCC/error/:cartId" component={ErrorCC} reRender={this.reRender.bind(this)} />
          <Route path="/co2Calculator" component={LoadableCo2Calculator} reRender={this.reRender.bind(this)} />
          <Route path="/faq" component={FAQ} reRender={this.reRender.bind(this)} />
          <Route path="/AboutUs" component={AboutUs} reRender={this.reRender.bind(this)} />
          <Route path="/awards" component={Award} reRender={this.reRender.bind(this)} />
          <Route path="/links" component={Links} reRender={this.reRender.bind(this)} />
          <Route path="/disclaimer" component={Disclaimer} reRender={this.reRender.bind(this)} />
          <Route path="/financials" component={Financial} reRender={this.reRender.bind(this)} />
          <Route path="/privacy" component={Privacy} reRender={this.reRender.bind(this)} />
          <Route path="/treeService" component={TreeService} reRender={this.reRender.bind(this)} />
          <Route path="/imprint" component={Imprint} reRender={this.reRender.bind(this)} />
          <Route path="/contact" component={Contact} reRender={this.reRender.bind(this)} />
          <Route path="/partner" component={Partner} reRender={this.reRender.bind(this)} />
          <Route path="/social" component={Social} reRender={this.reRender.bind(this)} />
          <Route path="/terms" component={Terms} reRender={this.reRender.bind(this)} />
          <Route path="/backOffice" component={LoadableBackOfficeOverview} reRender={this.reRender.bind(this)} />
          <Route path="/article-manager" component={LoadableArticleManager} reRender={this.reRender.bind(this)} />
          <Route path="/article-create" component={ArticleCreater} reRender={this.reRender.bind(this)} />
          <Route path="/article-edit/:articleId" component={ArticleEditor} reRender={this.reRender.bind(this)} />
          <Route path="/cart-manager" component={CartOverview} reRender={this.reRender.bind(this)} />
          <Route path="/user-manager" component={UserOverview} reRender={this.reRender.bind(this)} />
          <Route path="/project-manager" component={ProjectOverview} reRender={this.reRender.bind(this)} />
          <Route path="/project-edit/:projectId" component={ProjectEditor} reRender={this.reRender.bind(this)} />
          <Route path="/treeType-manager" component={TreeTypeOverview} reRender={this.reRender.bind(this)} />
          <Route path="/plant-manager" component={PlantManager} reRender={this.reRender.bind(this)} updatePlantBag={this.updatePlantBag.bind(this)} />
          <Route path="/slider-image-manager" component={SliderImageManager} reRender={this.reRender.bind(this)} />
          <Route path="/event-manager" component={EventOverview} reRender={this.reRender.bind(this)} />
          <Route path="/event/:eventId" component={EventEditor} reRender={this.reRender.bind(this)} updatePlantBag={this.updatePlantBag.bind(this)} />
          <Route path="/transform-trees" component={TransformTreesPage} reRender={this.reRender.bind(this)} />
          <Route path="/forbidden" component={ForbiddenPage} reRender={this.reRender.bind(this)} />
          <Route path="*" component={NotFoundPage} reRender={this.reRender.bind(this)} updatePlantBag={this.updatePlantBag.bind(this)} isGift={false} isAbo={false} />
        </Router>
        <Footer />
        <Notification ref="notification" />
      </div>
    );
  }
}

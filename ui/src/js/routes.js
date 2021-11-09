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
        <NavBar ref="navbar" switchLocale={this.switchLocale} />
        <Header ref="header" />
        <Router history={browserHistory}>
          <Route path="/" component={LoadableMainPage} />
          <Route
            path="/plant/:amount"
            component={ProposalPlantPage}
            updatePlantBag={this.updatePlantBag.bind(this)}
          
            header={counterpart.translate('PLANT_ONLINE')}
            isGift={false}
            isAbo={false}
          />
          <Route
            path="/plant3"
            component={CustomPlantPage}
            updatePlantBag={this.updatePlantBag.bind(this)}
          
            header={counterpart.translate('PLANT_ONLINE')}
            isGift={false}
            isAbo={false}
          />
          <Route
            path="/plantGift/:amount"
            component={ProposalPlantPage}
            updatePlantBag={this.updatePlantBag.bind(this)}
          
            header={counterpart.translate('CREATE_GIFT')}
            isGift={true}
            isAbo={false}
          />
          <Route
            path="/plantGift2"
            component={CustomPlantPage}
            updatePlantBag={this.updatePlantBag.bind(this)}
          
            header={counterpart.translate('CREATE_GIFT')}
            isGift={true}
            isAbo={false}
          />
          <Route path="/projects" component={ProjectsPage} />
          <Route path="/projects/:projectName" component={ProjectDetailsPage} updatePlantBag={this.updatePlantBag.bind(this)} />
          <Route
            path="/user/:userName"
            component={ProfilePage}
          
            logout={this.logout.bind(this)}
            updateLanguage={this.updateLanguage.bind(this)}
            loadUserDetails={this.loadUserDetails.bind(this)}
          />
          <Route path="/tools/:username" component={ToolsPage} />
          <Route path="/receipts/:username" component={ReceiptsPage} />
          <Route path="/ranking" component={RankingPage} />
          <Route path="/projectOffer" component={ProjectOfferPage} />
          <Route path="/selfPlant" component={SelfPlantPage} loadUserDetails={this.loadUserDetails.bind(this)} />
          <Route path="/selfPlants/:treeId" component={SelfPlantOverviewPage} />
          <Route
            path="/plantBag"
            component={PlantBagPage}
          
            updatePlantBag={this.updatePlantBagFromLocaleStorage.bind(this)}
            showLoginSlide={this.showLoginSlide.bind(this)}
          />
          <Route
            path="/payCart/:cartId"
            component={PaymentPage}
          
            updateComponents={this.updateNavbarComponents.bind(this)}
            resetPlantBag={this.resetPlantBag.bind(this)}
            loadUserDetails={this.loadUserDetails.bind(this)}
          />
          <Route
            path="/payGift/:cartId/:giftId"
            component={PaymentPage}
          
            updateComponents={this.updateNavbarComponents.bind(this)}
            resetPlantBag={this.resetPlantBag.bind(this)}
            loadUserDetails={this.loadUserDetails.bind(this)}
          />
          <Route path="/registration" component={RegistrationPage} />
          <Route path="/userActivation" component={ActivationPage} />
          <Route path="/forgotPassword" component={ForgotPasswordPage} />
          <Route path="/password_reset" component={ResetPasswordPage} showLoginSlide={this.showLoginSlide.bind(this)} />
          <Route path="/gifts/:userName" component={GiftOverview} redeemGift={this.redeemGift.bind(this)} updatePlantBag={this.updatePlantBag.bind(this)} />
          <Route path="/gift/redeem" component={RedeemGiftPage} redeemGift={this.redeemGift.bind(this)} showLoginSlide={this.showLoginSlide.bind(this)} />
          <Route path="/certificate/find" component={FindTreePage} />
          <Route path="/statistics" component={StatisticsPage} />
          <Route path="/team/:teamName" component={TeamPage} />
          <Route path="/blog/:articleId" component={BlogPage} />
          <Route path="/blog" component={BlogOverviewPage} />
          <Route path="/payCC/succes/:cartId" component={SuccessCC} />
          <Route path="/payCC/error/:cartId" component={ErrorCC} />
          <Route path="/co2Calculator" component={LoadableCo2Calculator} />
          <Route path="/faq" component={FAQ} />
          <Route path="/AboutUs" component={AboutUs} />
          <Route path="/awards" component={Award} />
          <Route path="/links" component={Links} />
          <Route path="/disclaimer" component={Disclaimer} />
          <Route path="/financials" component={Financial} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/imprint" component={Imprint} />
          <Route path="/contact" component={Contact} />
          <Route path="/partner" component={Partner} />
          <Route path="/newsletter" component={Social} />
          <Route path="/terms" component={Terms} />
          <Route path="/backOffice" component={LoadableBackOfficeOverview} />
          <Route path="/article-manager" component={LoadableArticleManager} />
          <Route path="/article-create" component={ArticleCreater} />
          <Route path="/article-edit/:articleId" component={ArticleEditor} />
          <Route path="/cart-manager" component={CartOverview} />
          <Route path="/user-manager" component={UserOverview} />
          <Route path="/project-manager" component={ProjectOverview} />
          <Route path="/project-edit/:projectId" component={ProjectEditor} />
          <Route path="/treeType-manager" component={TreeTypeOverview} />
          <Route path="/plant-manager" component={PlantManager} updatePlantBag={this.updatePlantBag.bind(this)} />
          <Route path="/slider-image-manager" component={SliderImageManager} />
          <Route path="/event-manager" component={EventOverview} />
          <Route path="/event/:eventId" component={EventEditor} updatePlantBag={this.updatePlantBag.bind(this)} />
          <Route path="/transform-trees" component={TransformTreesPage} />
          <Route path="/forbidden" component={ForbiddenPage} />
          <Route path="*" component={NotFoundPage} updatePlantBag={this.updatePlantBag.bind(this)} isGift={false} isAbo={false} />
        </Router>
        <Footer />
        <Notification ref="notification" />
      </div>
    );
  }
}

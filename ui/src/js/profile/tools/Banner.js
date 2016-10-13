import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import {
  Link
} from 'react-router';
import Boostrap from 'bootstrap';
import axios from 'axios';

import Notification from '../../common/components/Notification';
import IconButton from '../../common/components/IconButton';
import ButtonBar from './ButtonBar';

export default class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'white',
      format: 'high',
      chosen: -1,
      htmlCode: '',
      width: 100,
      height: 0
    }
  }

  updateBannerHeight(event) {
    this.state.height = event.target.value;
    this.forceUpdate();
    this.generateHtmlCode();
  }

  updateType(event) {
    this.setState({
      type: event.target.value
    });
  }

  updateFormat(event) {
    this.setState({
      format: event.target.value
    });
    if (this.state.format == 'high') {
      this.setState({
        width: 100
      });
    } else {
      this.setState({
        height: 100
      });
    }

  }

  generateHtmlCode() {
    var that = this;
    axios.get('http://localhost:8081/banner/code?type=' + this.state.type + '&width=' + this.state.width + '&height=' + this.state.height).then(function(response) {
      var result = response.data;
      that.setState({htmlCode: result});
    }).catch(function(response) {
      if (response instanceof Error) {
        console.error('Error', response.message);
      } else {
        console.error(response.data);
        console.error(response.status);
        console.error(response.headers);
        console.error(response.config);
      }
    });
  }

  render() {
    var banner1;
    var banner2;
    var banner3;
    var banner4;
    var bannerImages;

    if (this.state.format == 'high') {
      banner1 = 'http://localhost:8081/banner?type=' + this.state.type + '&width=100&height=100';
      banner2 = 'http://localhost:8081/banner?type=' + this.state.type + '&width=100&height=200';
      banner3 = 'http://localhost:8081/banner?type=' + this.state.type + '&width=100&height=300';
      banner4 = 'http://localhost:8081/banner?type=' + this.state.type + '&width=100&height=400';
      bannerImages = <div className="bannerImages">
        <div>
          <img src={banner1} /><br/>
          <input type="radio" name="100" checked={this.state.height == 100} id="radio-100" value="100" onChange={this.updateBannerHeight.bind(this)}/>
          <label htmlFor="radio-100">&nbsp;100&nbsp;x&nbsp;100&nbsp;px</label>
        </div>
        <div>
          <img src={banner2} /><br/>
          <input type="radio" name="200" checked={this.state.height == 200} id="radio-200" value="200" onChange={this.updateBannerHeight.bind(this)}/>
          <label htmlFor="radio-200">&nbsp;100&nbsp;x&nbsp;200&nbsp;px</label>
        </div>
        <div>
          <img src={banner3} /><br/>
          <input type="radio" name="300" checked={this.state.height == 300} id="radio-300" value="300" onChange={this.updateBannerHeight.bind(this)}/>
          <label htmlFor="radio-300">&nbsp;100&nbsp;x&nbsp;300&nbsp;px</label>
        </div>
        <div>
          <img src={banner4} /><br/>
          <input type="radio" name="400" checked={this.state.height == 400} id="radio-400" value="400" onChange={this.updateBannerHeight.bind(this)} />
          <label htmlFor="radio-400">&nbsp;100&nbsp;x&nbsp;400&nbsp;px</label>
        </div>
      </div>;
    } else {
      bannerImages = '';
    }

    return (
      <div className="col-md-12">
        <h2>Tools&nbsp;/&nbsp;Banner</h2>
        <div className="content">
          <div className="banner">
            <div className="typeChoser">
              <div><p>Farbe:&nbsp;</p>
                <select onChange={this.updateType.bind(this)} >
                  <option value="white">weiß</option>
                  <option value="green">grün</option>
                </select>
              </div>
              <div><p>Format:&nbsp;</p>
                <select onChange={this.updateFormat.bind(this)} >
                  <option value="high">hoch</option>
                  <option value="cross">quer</option>
                </select>
              </div>
            </div>
            {bannerImages}
            <div className="codeSnippet">
              <p>Einbettungs-Code:</p>
              <textarea rows="4" cols="50" maxLength="250" value={this.state.htmlCode} />
            </div>
          </div>
        </div>
        <ButtonBar switchTo={this.props.switchTo.bind(this)} chosen={this.props.view} />
        <Notification ref="notification"/>
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */

import React, {
  Component
} from 'react';
import Boostrap from 'bootstrap';
import axios from 'axios';

import {getTextForSelectedLanguage} from '../common/language/LanguageHelper';

export default class Carousel extends Component {
  constructor() {
    super();
    this.state = {slides : []};
  }

  componentDidMount() {
    var that = this;
    axios.get('http://localhost:8081/reports/activeProjects?page=0&size=10').then(function(response) {
      var result = response.data.content;
      that.setState({slides: result});
    }).catch(function (response) {
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
    return (<div id="carousel-example-generic" className="carousel slide" data-ride="carousel">
              <ol className="carousel-indicators">
                {this.state.slides.map(function (slide, index) {
                  var activeItem = '';
                  if (0 === index) {
                    activeItem = 'active';
                  }
                  return (<li data-target="#carousel-example-generic" data-slide-to="{index}" className={activeItem} key={index}></li>);
                })}
              </ol>
              <div className="carousel-inner" role="listbox">
                {this.state.slides.map(function (slide, index) {
                  var activeItem = 'item';
                  if (0 === index) {
                    activeItem = 'item active';
                  }
                  let imageUrl = 'http://localhost:8081/project/image/' + slide.projectName + '/'+ slide.projectImageFileName + '/1140/1140';
                  return (<div className={activeItem} key={index}>
                    <img src={imageUrl} width="1140" height="400" alt={slide.projectName} />
                    <div className="carousel-caption">
                      {getTextForSelectedLanguage(slide.description)}
                    </div>
                  </div>);
                })}
              </div>
              <a className="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
                <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
                <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </a>
            </div>);
  }
}

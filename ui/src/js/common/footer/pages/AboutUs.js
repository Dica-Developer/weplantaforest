import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';
import axios from 'axios';
import counterpart from 'counterpart';

import EditLink from '../../../common/components/EditLink';

require('./aboutUs.less');

export default class aboutUs extends Component {

  constructor() {
    super();
    this.state = {
      aboutUs: []
    };
  }

  componentDidMount() {
    var that = this;
    axios.get('http://localhost:8082/articles?articleType=ABOUT_US&language=' + localStorage.getItem('language')).then(function(response) {
      that.setState({
        aboutUs: response.data
      });
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
    var that = this;
    return (
      <div className="container paddingTopBottom15 aboutUs">
          <div className="row">
            <div className="col-md-12">
              <h1>{counterpart.translate('FOOTER_PAGES.ABOUT_US')}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div>
                {this.state.aboutUs.map(function(about, i) {
                  if (about.imageFileName != '') {
                    let aboutImageUrl = 'http://localhost:8082/article/image/' + about.id + '/' + about.imageFileName + '/986/657';
                    return ( <div key={i}><p className="title">{about.title}</p><EditLink articleId={about.id}/>
                              <div className="article-img">
                                <div className="article-img-div">
                                  <img src={aboutImageUrl}/>
                                </div>
                              </div>
                              <p dangerouslySetInnerHTML={{__html: about.intro}}></p>
                            </div>);
                  }else{
                    return ( <div key={i}><p className="title">{about.title}</p><EditLink articleId={about.id}/>
                              <p dangerouslySetInnerHTML={{__html: about.intro}}></p>
                            </div>);
                  }
                })}
              </div>
            </div>
          </div>
        </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

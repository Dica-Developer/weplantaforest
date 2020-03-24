import axios from 'axios';
import counterpart from 'counterpart';
import React, { Component } from 'react';
import EditLink from '../../../common/components/EditLink';

require('./financial.less');

export default class financial extends Component {
  constructor() {
    super();
    this.state = {
      financial: []
    };
  }

  componentDidMount() {
    var that = this;
    axios
      .get('http://localhost:8082/articles?articleType=FINANCIALS&language=' + localStorage.getItem('language'))
      .then(function(response) {
        that.setState({
          financial: response.data
        });
      })
      .catch(function(response) {
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
      <div className="container paddingTopBottom15 financial">
        <div className="row">
          <div className="col-md-12">
            <h1>{counterpart.translate('FOOTER_PAGES.FINANCE')}</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div>
              {this.state.financial.map(function(about, i) {
                return (
                  <div key={i}>
                    <EditLink articleId={about.id} />
                    <p className="title">{about.title}</p>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: about.intro
                      }}
                    ></div>
                    {about.paragraphs.map(function(paragraph, index) {
                      return (
                        <div key={index}>
                          <p className="title">{paragraph.title}</p>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: paragraph.text
                            }}
                          ></div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

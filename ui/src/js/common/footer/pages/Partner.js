import axios from 'axios';
import counterpart from 'counterpart';
import React, { Component } from 'react';
import EditLink from '../../../common/components/EditLink';

require('./partner.less');

export default class Partner extends Component {
  constructor() {
    super();
    this.state = {
      partners: []
    };
  }

  componentDidMount() {
    var that = this;
    axios
      .get('http://localhost:8082/articles?articleType=PARTNER&language=' + localStorage.getItem('language'))
      .then(function(response) {
        that.setState({ partners: response.data });
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
      <div className="container paddingTopBottom15 partner">
        <div className="row">
          <div className="col-md-12">
            <h1>{counterpart.translate('FOOTER_PAGES.PARTNER')}</h1>
          </div>
        </div>

        {this.state.partners.map(function(partner, i) {
          let imageUrl = 'http://localhost:8082/article/image/' + partner.id + '/' + partner.imageFileName + '/200/200';
          return (
            <div>
              <div className="row display-flex">
                <div className="col-sm-3 image-middle-wrapper">
                  <img src={imageUrl} />
                </div>
                <div className="col-sm-9">
                  <EditLink articleId={partner.id} />
                  <p className="title">{partner.title}</p>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: partner.intro
                    }}
                  ></p>
                </div>
              </div>
              <div className="row">
                <hr />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

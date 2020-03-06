import axios from 'axios';
import counterpart from 'counterpart';
import React, { Component } from 'react';
import EditLink from '../common/components/EditLink';

require('./faq.less');

export default class FaqView extends Component {
  constructor() {
    super();
    this.state = {
      faqs: []
    };
  }

  componentDidMount() {
    var that = this;
    axios
      .get('http://localhost:8082/articles?articleType=FAQ&language=' + localStorage.getItem('language'))
      .then(function(response) {
        that.sortByNumberIntTitle(response.data);
        that.setState({
          faqs: response.data
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

  sortByNumberIntTitle(data) {
    for (let entry of data) {
      let index = entry.title.substring(0, entry.title.indexOf('.'));
      if (index == '') {
        index = 0;
      }
      entry.index = parseInt(index);
    }
    data.sort(function(a, b) {
      return a.index > b.index ? 1 : b.index > a.index ? -1 : 0;
    });
  }

  scrollTo(hash) {
    location.hash = '#' + hash;
    window.scrollTo(window.scrollX, window.scrollY - 330);
  }

  render() {
    var that = this;
    return (
      <div className="container paddingTopBottom15 faq">
        <div className="row">
          <div className="col-md-12">
            <h1>{counterpart.translate('FOOTER.FAQ')}</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            {this.state.faqs.map(function(question, i) {
              if (question.index != 0) {
                return (
                  <div key={i}>
                    <a
                      href={'#question-' + i}
                      className="question"
                      onClick={() => {
                        that.scrollTo('#question-' + i);
                      }}
                    >
                      {question.title}
                    </a>
                  </div>
                );
              } else {
                return '';
              }
            })}
          </div>
          <div className="col-md-8">
            <div className="answers">
              {this.state.faqs.map(function(question, i) {
                if (question.index != 0) {
                  return (
                    <div key={i}>
                      <a name={'#question-' + i} className="box-question">
                        {question.title}
                      </a>{' '}
                      <EditLink articleId={question.id} />
                      <p
                        className="box-answer"
                        dangerouslySetInnerHTML={{
                          __html: question.intro
                        }}
                      ></p>
                    </div>
                  );
                } else {
                  return '';
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

import axios from 'axios';
import React, { Component } from 'react';
import Article from './Article';
import ArticleDesc from './ArticleDesc';

export default class Project extends Component {
  constructor() {
    super();
    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    var that = this;
    axios
      .get('http://localhost:8081/project/articles?projectName=' + this.props.project.projectName)
      .then(function(response) {
        let articles = [];
        for (let article of response.data) {
          if (article.amount - article.alreadyPlanted > 0) {
            articles.push(article);
          }
        }
        that.setState({
          articles: articles
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

  getArticleValue(article) {
    return this.refs['article_' + article].getAmount();
  }

  getArticles() {
    return this.state.articles;
  }

  getPrice() {
    var price = 0;
    for (var article in this.state.articles) {
      price = price + parseInt(this.refs['article_' + article].getAmount() * this.state.articles[article].price.priceAsLong);
    }
    return price;
  }
  render() {
    var that = this;
    return (
      <div className={'project ' + (this.state.articles.length > 0 ? '' : 'no-display')}>
        <h2>{this.props.project.projectName}</h2>
        <ArticleDesc />
        {this.state.articles.map(function(article, i) {
          return <Article article={article} key={i} ref={'article_' + i} sliderIndex={i} updatePrice={that.props.updatePrice.bind(this)} />;
        })}
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

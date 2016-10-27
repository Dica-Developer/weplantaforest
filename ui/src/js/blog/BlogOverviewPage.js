import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';
import {
  browserHistory
} from 'react-router';
import axios from 'axios';
import moment from 'moment';
import {
  getTextForSelectedLanguage,
  getShortText
} from '../common/language/LanguageHelper';

require("./blogOverviewPage.less");

class Article extends Component {
  constructor(props) {
    super(props);
  }

  switchToBlogEntry(){
    browserHistory.push('/blog/' + this.props.content.id);
  }

  render() {
    let imageUrl = 'http://localhost:8082/article/image/' + this.props.content.id + '/' + this.props.content.imageFileName + '/150/150';
    return (
      <div className="article-entry">
        <a role="button" onClick={this.switchToBlogEntry.bind(this)}>
          <h4>{getTextForSelectedLanguage(this.props.content.title)}</h4>
          <span>{moment(this.props.content.createdOn).format("DD.MM.YYYY")}{" von "}{this.props.content.ownerName}</span>
          <div className="article-content">
            <img src={imageUrl}/>
            <p dangerouslySetInnerHTML={{
              __html: getTextForSelectedLanguage(this.props.content.intro)
            }}/>
          </div>
        </a>
      </div>
    );
  }
}
export default class BlogOverviewPage extends Component {

  constructor() {
    super();
    this.state = {
      articles: {
        content: []
      }
    }
  }

  componentDidMount() {
    var that = this;
    axios.get('http://localhost:8082/articles/BLOG?page=0&size=5').then(function(response) {
      var result = response.data;
      that.setState({
        articles: result
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
    console.log(this.state.articles);
    return (
      <div className="container paddingTopBottom15 ">
        <div className="row blogOverviewPage">
          <div className={"col-md-12 "}>
            <h2>Blog</h2>
            {this.state.articles.content.map(function(article, i) {
              return (<Article content={article} key={i}/>);
            })}
          </div>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

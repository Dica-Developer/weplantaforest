import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';
import axios from 'axios';
import counterpart from 'counterpart';

require('./treeService.less');

export default class treeService extends Component {

  constructor() {
    super();
    this.state = {
      treeService: []
    };
  }

  componentDidMount() {
    var that = this;
    axios.get('http://localhost:8082/articles?articleType=TREE_SERVICE&language=' + localStorage.getItem('language')).then(function(response) {
      that.setState({
        treeService: response.data
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
      <div className="container paddingTopBottom15 treeService">
          <div className="row">
            <div className="col-md-12">
              <h1>{counterpart.translate('BUTTONBAR.TREE_SERVICE')}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div>
                {this.state.treeService.map(function(treeServiceArticle, i) {
                  let articleImageUrl = '';
                  var imageDesc;
                  if (treeServiceArticle.imageFileName != '') {
                    articleImageUrl = 'http://localhost:8082/article/image/' + treeServiceArticle.id + '/' + treeServiceArticle.imageFileName + '/986/657';
                  }
                  if(treeServiceArticle.imageDescription != null){
                    imageDesc = <p className="img-desc">{treeServiceArticle.imageDescription}</p>;
                  }else{
                    imageDesc = '';
                  }
                return ( <div key={i}><p className="title">{treeServiceArticle.title}</p>
                <div className="article-img">
                  <div className="article-img-div">
                    <img src={articleImageUrl}/>
                    {imageDesc}
                  </div>
                </div>
                <p dangerouslySetInnerHTML={{
                  __html: treeServiceArticle.intro
                }}></p></div>);
                })}
              </div>
            </div>
          </div>
        </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

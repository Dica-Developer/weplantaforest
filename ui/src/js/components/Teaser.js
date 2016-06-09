import React, {
  Component
} from 'react';
import Boostrap from 'bootstrap';
import axios from 'axios';

export default class Teaser extends Component {
  constructor() {
    super();
    this.state = {teaser: {content: []}};
  }

  componentDidMount() {
    var that = this;
    axios.get('http://localhost:8083/articles/BLOG?page=0&size=3').then(function(response) {
      var result = response.data;
      that.setState({teaser: result});
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
    return (<div className="row">
    {this.state.teaser.content.map(function (teaser) {
      return (
        <div className="col-md-4">
          <div className="thumbnail">
            <img src="" alt="" />
            <div className="caption">
              <h3>{teaser.title}</h3>
              <p>{teaser.intro}</p>
              <p><span className="label label-info">{new Date(teaser.createdOn) + ''}</span></p>
            </div>
          </div>
        </div>);
    })}
  </div>);
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

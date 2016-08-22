import React, {
  Component
} from 'react';
import Boostrap from 'bootstrap';
import axios from 'axios';
import LoadingItem from '../../components/LoadingItem';

export default class ArticleTeaser extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var content = {};

    if (this.props.content) {
      let imageUrl = 'http://localhost:8083/article/image/' + this.props.content.id + '/' + this.props.content.imageFileName + '/380/380';

      content["1"] = <div>
      <img src={imageUrl} alt={this.props.content.title}/>
        <h3><i>{this.props.content.title}</i></h3>
        <p>{this.props.content.intro}</p>
      </div>
    } else {
      content["1"] = <LoadingItem/>;
    }

    return (
      <div className="col-md-4">
        {content["1"]}
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

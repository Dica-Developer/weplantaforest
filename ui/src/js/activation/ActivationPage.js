import React, {
  Component
} from 'react';
import axios from 'axios';
import counterpart from 'counterpart';

require('./activationPage.less');

export default class ActivationPage extends Component {

  constructor() {
    super();
    this.state = {
      headLine: '',
      text: ''
    };
  }

  componentDidMount() {
    var that = this;
    axios.post('http://localhost:8081/user/activation' + this.props.location.search + '&language=' + localStorage.getItem('language')).then(function(response) {
      that.setState({
        headLine: counterpart.translate('WELCOME') + ' ' + response.data + '!',
        text: counterpart.translate('ACTIVATION_DONE_TEXT')
      });
    }).catch(function(response) {
      that.setState({
        headLine: response.data
      });
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
    return (
        <div className="container paddingTopBottom15">
          <div className="row activationPage">
            <div className="col-md-12">
              <h1>{this.state.headLine}</h1>
              {this.state.text}
            </div>
          </div>
        </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

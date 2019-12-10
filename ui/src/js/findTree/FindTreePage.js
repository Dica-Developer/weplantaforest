import axios from 'axios';
import counterpart from 'counterpart';
import React, { Component } from 'react';
import Notification from '../common/components/Notification';
import FindTrees from './FindTrees';
import TreeItem from './TreeItem';
import TreesFound from './TreesFound';


require('./findTreePage.less');

export default class FindTreePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      treesFound: false,
      certificateId: '',
      trees: [],
      certificate: {}
    };
  }

  findCertificate(certificateId) {
    var that = this;
    this.setState({
      certificateId: certificateId
    });
    axios.get('http://localhost:8081/certificate/search/' + encodeURIComponent(certificateId)).then(function(response) {
      var result = response.data;
      that.setState({
        trees: result
      });
      axios.get('http://localhost:8081/certificate/summary/' + encodeURIComponent(certificateId)).then(function(response) {
        var result = response.data;
        that.setState({
          certificate: result,
          treesFound: true
        });
      });
    }).catch(function(response) {
      that.refs.notification.addNotification(counterpart.translate('CERTIFICATE.NOT_EXISTS'), counterpart.translate('CERTIFICATE.NOT_EXISTS_TEXT'), 'error');
    });
  }

  render() {
    var content;
    if (this.state.treesFound) {
      content = <TreesFound certificateId={this.state.certificateId} certificate={this.state.certificate}>
                {this.state.trees.map(function(tree, i) {
                  let imageUrl = 'http://localhost:8081/treeType/image/' + tree.treeType.imageFile + '/60/60';
                  return (<TreeItem imageUrl={imageUrl} content={tree} key={i}/>);
                })}
              </TreesFound>;
    } else {
      content = <FindTrees findCertificate={this.findCertificate.bind(this)}/>;
    }
    return (
      <div className="container paddingTopBottom15">
        <div className="row findTree">
          {content}
        </div>
        <Notification ref="notification"/>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

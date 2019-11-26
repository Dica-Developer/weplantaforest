import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import IconButton from './IconButton';


require('./editLink.less');

export default class EditLink extends Component {

  constructor() {
    super();
  }

  render() {
    let editLink;
    if(localStorage.getItem('isAdmin') == 'true'){
      editLink = <IconButton text="" glyphIcon="glyphicon-pencil" onClick={ () => {browserHistory.push('/article-edit/' + this.props.articleId); }}/>;
    }else{
      editLink = '';
    }
    return (
      <div className="edit-link">
        {editLink}
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

import React, { Component } from 'react';

export default class NotFoundPage extends Component {
  render() {
    return (
      <div>
        <div className="container paddingTopBottom15">
          <img width="100%" height="100%" src="/assets/images/404.jpg" style={{position:'relative'}}/>
          <h1 style={{position:'absolute', bottom:'53%', backgroundColor: '#4F3A2C', color: 'white'}}>Die Seite existiert nicht.<br /><a style={{color: 'white'}} href="/">Fang doch nochmal von vorn an.</a></h1>
        </div>
      </div>
    );
  }
}

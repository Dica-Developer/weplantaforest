import React, {Component} from 'react';
import {render} from 'react-dom';
import NotificationSystem from 'react-notification-system';
import Boostrap from 'bootstrap';
import counterpart from 'counterpart';

import MultiLineErrorObject from './MultiLineErrorObject';

export default class Notification extends Component {

  addNotification(title, message, type) {
    this.refs.notificationSystem.addNotification({title: title, position: 'tc', autoDismiss: 0, message: message, level: type});
  }

  addMultilineNotification(title, multilines, type) {
    this.refs.notificationSystem.addNotification({
      title: title,
      position: 'tc',
      autoDismiss: 0,
      message: '',
      level: type,
      children: (<MultiLineErrorObject lines={multilines}/>)
    });
  }

  addNotificationAtDifferentPos(title, message, type, position) {
    this.refs.notificationSystem.addNotification({title: title, position: position, autoDismiss: 0, message: message, level: type});
  }

  handleError(error) {
    if (error.data.errorInfos) {
      this.addMultilineNotification(counterpart.translate('ERROR'), error.data.errorInfos, 'error');
    } else {
      //TODO: implement some kind of error report possibility
      this.refs.notificationSystem.addNotification({title: 'Ein unerwarter Fehler ist aufgetreten!', position: 'tc', autoDismiss: 0, message: '', level: 'error'});
      if (response instanceof Error) {
        console.error('Error', error.message);
      } else {
        console.error(error.data);
        console.error(error.status);
        console.error(error.headers);
        console.error(error.config);
      }
    }
  }

  render() {
    var style = {
      Containers: {
        DefaultStyle: {
          zIndex: 11000
        },
        tc: {
          top: '50%',
          bottom: 'auto',
          margin: '0 auto',
          left: '50%'
        }
      }
    };
    return (
      <div>
        <NotificationSystem ref="notificationSystem" style={style}/>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

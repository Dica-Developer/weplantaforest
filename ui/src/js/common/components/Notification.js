import counterpart from 'counterpart';
import React, { Component } from 'react';
import NotificationSystem from 'react-notification-system';
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
    if (error instanceof Error) {
      if (!error.response) {
        this.refs.notificationSystem.addNotification({title: 'Der Server kann nicht erreicht werden.', position: 'tc', autoDismiss: 0, message: error.message, level: 'error'});
        console.error('Error', error.message, error);
      } else if (error.response.data && error.response.data.errorInfos) {
        this.addMultilineNotification(counterpart.translate('ERROR'), error.response.data.errorInfos, 'error');
      } else {
        this.refs.notificationSystem.addNotification({title: 'Ein unerwarter Fehler ist aufgetreten!', position: 'tc', autoDismiss: 0, message: error.message, level: 'error'});
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

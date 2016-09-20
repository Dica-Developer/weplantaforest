import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import NotificationSystem from 'react-notification-system';
import Boostrap from 'bootstrap';

export default class Notification extends Component {

  addNotification(title, message, type){
    this.refs.notificationSystem.addNotification({
      title: title,
      position: 'tc',
      autoDismiss: 0,
      message: message,
      level: type
    });
  }

  addNotificationAtDifferentPos(title, message, type, position){
    this.refs.notificationSystem.addNotification({
      title: title,
      position: position,
      autoDismiss: 0,
      message: message,
      level: type
    });
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

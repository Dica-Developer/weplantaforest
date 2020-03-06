import counterpart from 'counterpart';
import React, { Component } from 'react';
import DatePicker from 'react-16-bootstrap-date-picker';
import Notification from './Notification';

require('./dateField.less');

export default class DateField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Date().toISOString(),
      weekStartsOn: counterpart.translate('WEEK_STARTS_ON'),
      dateFormat: counterpart.translate('DATEFORMAT')
    };
  }

  componentWillReceiveProps() {
    if (this.props.date) {
      this.setState({ value: new Date(this.props.date).toISOString() });
    }
  }

  updateValue(value) {
    if (this.props.noFuture == 'true') {
      var dateValue = new Date(Date.parse(value));
      if (isNaN(dateValue.getTime())) {
        dateValue = new Date();
      }

      if (this.validateNoFutureValue(dateValue)) {
        this.setState({
          value: dateValue.toISOString()
        });
        this.props.updateDateValue(Date.parse(dateValue));
      } else {
        this.setState({
          value: new Date().toISOString()
        });
        this.refs.notification.addNotification(counterpart.translate('DATE_IN_FUTURE_ERROR.TITLE'), counterpart.translate('DATE_IN_FUTURE_ERROR.TEXT'), 'error');
      }
    } else {
      this.setState({
        value: value
      });
      this.props.updateDateValue(Date.parse(value));
    }
  }

  resetDate() {
    this.updateValue(new Date().toISOString());
  }

  validateNoFutureValue(value) {
    var dateNow = new Date();
    if (value.getTime() <= dateNow.getTime()) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <div className="dateField">
        <DatePicker
          value={this.state.value}
          onChange={this.updateValue.bind(this)}
          onClear={this.resetDate.bind(this)}
          dateFormat={this.state.dateFormat}
          calendarPlacement="right"
          weekStartsOn={this.state.weekStartsOn}
        />
        <Notification ref="notification" />
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

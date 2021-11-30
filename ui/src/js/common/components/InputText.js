import React, { Component } from 'react';
import counterpart from 'counterpart';

export default class InputText extends Component {
  constructor() {
    super();
    this.state = {
      showPassword: false,
    };
  }

  updateValue(event) {
    this.props.updateValue(this.props.toUpdate, event.target.value);
  }

  togglePasswordVisibility(elem) {
    if ('password' === document.getElementById(this.props.id).type) {
      this.setState({ showPassword: true });
      document.getElementById(this.props.id).type = 'text';
    } else {
      this.setState({ showPassword: false });
      document.getElementById(this.props.id).type = 'password';
    }
  }

  render() {
    return (
      <div>
        <input
          id={this.props.id}
          value={this.props.value}
          className={this.props.cssclass}
          placeholder={this.props.placeholderText}
          type={this.props.type ? this.props.type : 'text'}
          onChange={this.updateValue.bind(this)}
          disabled={this.props.disabled}
        />
        {this.props.showhide ? (
          this.state.showPassword ? (
            <span title={counterpart.translate('HIDE_PASSWORD')} className="password-icon glyphicon glyphicon-eye-close" onClick={this.togglePasswordVisibility.bind(this)}></span>
          ) : (
            <span title={counterpart.translate('SHOW_PASSWORD')} className="password-icon glyphicon glyphicon-eye-open" onClick={this.togglePasswordVisibility.bind(this)}></span>
          )
        ) : null}
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

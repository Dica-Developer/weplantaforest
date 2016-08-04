import React, {
  Component
} from 'react';

export default class LoginMenuItem extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="login-menu-item">
        <input type="text" placeholder="BENUTZERNAME"/>
        <input type="password" placeholder="PASSWORD"/>
        <button type="submit" className="btn btn-default">LOGIN </button>
      </div>);
  }
}

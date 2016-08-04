import React, {
  Component
} from 'react';
import {
  Link
} from 'react-router';

export default class ButtonBar extends Component {

  constructor() {
    super();

  }

  render() {
    return (
      <div className="buttonBar">
      <table>
        <tr>
          <td>
            <Link to="/" >
              <img src="/assets/images/Spaten.png" alt="selbst pflanzen" width="25" height="50"/>
            </Link>
          </td>
          <td>
            <Link to="/plant" >
              <span className="no-link-deco">SELBST PFLANZEN</span>
            </Link>
          </td>
        </tr>
        <tr>
          <td>
            <Link to="/plant" >
              <img src="/assets/images/Maus.png" alt="online pflanzen" width="50" height="50"/>
            </Link>
          </td>
          <td>
            <Link to="/plant" >
              <span className="no-link-deco">ONLINE PFLANZEN</span>
            </Link>
          </td>
        </tr>
        <tr>
          <td>
            <Link to="/" >
              <img src="/assets/images/SCHERE.png" alt="selbst pflanzen" width="50" height="50"/>
            </Link>
          </td>
          <td>
            <Link to="/plant" >
              <span className="no-link-deco">BAUMSERVICE</span>
            </Link>
          </td>
        </tr>
      </table>
    </div>);
  }
}

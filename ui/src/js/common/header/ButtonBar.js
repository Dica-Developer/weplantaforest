import React, {Component} from 'react';
import {Link} from 'react-router';

export default class ButtonBar extends Component {

  constructor() {
    super();

  }

  render() {
    return (
      <div className="buttonBar">
        <table>
          <tbody>
            <tr>
              <td>
                <Link to="/">
                  <img src="/assets/images/Spaten.png" alt="selbst pflanzen" width="25" height="50"/>
                </Link>
              </td>
              <td>
                <Link to="/selfPlant">
                  SELBST PFLANZEN
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/plant">
                  <img src="/assets/images/Maus.png" alt="online pflanzen" width="50" height="50"/>
                </Link>
              </td>
              <td>
                <Link to="/plant">
                  ONLINE PFLANZEN
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/">
                  <img src="/assets/images/SCHERE.png" alt="selbst pflanzen" width="50" height="50"/>
                </Link>
              </td>
              <td>
                <Link to="/plant">
                  BAUMSERVICE
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

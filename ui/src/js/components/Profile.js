import axios from 'axios';
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';
import Boostrap from 'bootstrap';
import moment from 'moment';
import Accounting from 'accounting';

export default class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {
        userName: '',
        imageFileName: '',
        regdate: 0,
        lastVisit: 0,
        organizationType: '',
        co2Data: {
          treesCount: 0,
          co2: 0.0
        }
      }
    };
  }

  componentDidMount() {
    var that = this;
    axios.get('http://localhost:8081/user?userName=' + encodeURIComponent(this.props.userName)).then(function(response) {
      var result = response.data;
      that.setState({user: result});
    }).catch(function(response) {
      if (response instanceof Error) {
        console.error('Error', response.message);
      } else {
        console.error(response.data);
        console.error(response.status);
        console.error(response.headers);
        console.error(response.config);
      }
    });
  }

  render() {
    let user = this.state.user;
    let imageUrl = 'http://localhost:8081/user/image/' + user.imageFileName + '/150/150';
    return (
      <div className="row profile">
        <div className="col-md-6 userDetails">
          <h2>Profil</h2>
          <div className="imageDiv">
            <img src={imageUrl} alt="profile"/>
          </div>
          <p className="userName">{user.userName}</p>
          <div className="details">
            <table>
              <tbody>
                <tr>
                  <td>
                    <span className="bold">Rang:&nbsp;</span>
                  </td>
                  <td>
                    <span className="bold">Mitglied seit:&nbsp;</span>{moment(user.regDate).format("DD.MM.YYYY")}</td>
                </tr>
                <tr>
                  <td>
                    <span className="bold">B&auml;ume gepflanzt:&nbsp;</span>{Accounting.formatNumber(user.co2Data.treesCount, 0, ".", ",")}</td>
                  <td>
                    <span className="bold">letzter Besuch:&nbsp;</span>{moment(user.lastVisit).format("DD.MM.YYYY")}</td>
                </tr>
                <tr>
                  <td>
                    <span className="bold">CO<sub>2</sub>&nbsp;gebunden:&nbsp;</span>{Accounting.formatNumber(user.co2Data.co2, 3, ".", ",")}&nbsp;t</td>
                  <td>
                    <span className="bold">Typ:&nbsp;</span>{user.organizationType}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-md-4 userDetails"></div>
          <div className="col-md-4 userDetails">
            <Link to="/" className="editLink">
              <div>
                <img src="/assets/images/edit.jpg" alt="editieren" width="45" height="45"/>
                <span className="no-link-deco">BEARBEITEN</span>
              </div>
            </Link>
          </div>
          <div className="col-md-4 userDetails"></div>
        </div>
        <div className="col-md-6 teamDetails">
          <h2>Team</h2>
        </div>
      </div>
    );
  }
}

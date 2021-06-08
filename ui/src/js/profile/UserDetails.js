import Accounting from 'accounting';
import axios from 'axios';
import counterpart from 'counterpart';
import moment from 'dayjs';
import he from 'he';
import React, { Component } from 'react';
import NotificationSystem from 'react-notification-system';
import { browserHistory } from 'react-router';
import IconButton from '../common/components/IconButton';
import Notification from '../common/components/Notification';
import { createProfileImageUrl } from '../common/ImageHelper';
import { getConfig } from '../common/RestHelper';

export default class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restConfig: getConfig(),
      imgUrl: '/assets/images/default_user.jpg'
    };
  }

  showEditUser() {
    this.props.showEditUser();
  }

  createConfirmation(id) {
    this.refs.notificationSystem.addNotification({
      title: counterpart.translate('WARNING') + '!',
      position: 'tc',
      autoDismiss: 0,
      message: counterpart.translate('USER_DELETE_WARNING'),
      level: 'warning',
      children: (
        <div className="delete-confirmation align-center">
          <button>{counterpart.translate('ABORT')}</button>
          <button
            onClick={() => {
              this.anonymizeUser(id);
            }}
          >
            OK
          </button>
        </div>
      )
    });
  }

  anonymizeUser(userId) {
    var that = this;
    axios
      .post('http://localhost:8081/user/anonymize?userName=' + encodeURIComponent(this.props.user.userName), {}, this.state.restConfig)
      .then(function(response) {
        localStorage.setItem('jwt', '');
        localStorage.setItem('username', '');
        localStorage.setItem('isAdmin', false);
        localStorage.setItem('userDetails', '');
        browserHistory.push('/');
        window.location.reload();
      })
      .catch(function(response) {
        that.refs.notification.addNotification(counterpart.translate('ERROR'), counterpart.translate('USER_DELETE_ERROR'), 'error');
      });
  }

  render() {
    var editLink;
    if (this.props.user.editAllowed) {
      editLink = (
        <div>
          <IconButton text={counterpart.translate('EDIT')} glyphIcon="glyphicon-cog" onClick={this.showEditUser.bind(this)} />
          <div className="anonymize-button">
            <a role="button" title={counterpart.translate('ANONYMIZE_ACCOUNT')} onClick={this.createConfirmation.bind(this)}>
              <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
            </a>
          </div>
        </div>
      );
    }

    let imgUrl = createProfileImageUrl(this.props.user.imageFileName, 150, 150);
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
        <h1>{counterpart.translate('PROFILE')}</h1>
        <div className="imageDiv">
          <img id="logo-img" src={imgUrl} alt="profile" width="150" height="150" />
        </div>
        <p className="userName">{this.props.user.userName ? he.decode(this.props.user.userName) : ''}</p>
        <div className="stats">
          <table>
            <tbody>
              <tr>
                <td>
                  <span className="bold">{counterpart.translate('RANK')}:&nbsp;</span>
                  {this.props.user.rank}
                </td>
                <td>
                  <span className="bold">{counterpart.translate('MEMBER_SINCE')}:&nbsp;</span>
                  {moment(this.props.user.regDate).format('DD.MM.YYYY')}
                </td>
              </tr>
              <tr>
                <td>
                  <span className="bold">{counterpart.translate('TREES_PLANTED')}:&nbsp;</span>
                  {Accounting.formatNumber(this.props.user.co2Data.treesCount, 0, '.', ',')}
                </td>
                <td>
                  <span className="bold">{counterpart.translate('TYPE')}:&nbsp;</span>
                  {this.props.user.organizationType ? counterpart.translate(this.props.user.organizationType) : ''}
                </td>
              </tr>
              <tr>
                <td>
                  <span
                    className="bold"
                    dangerouslySetInnerHTML={{
                      __html: counterpart.translate('CO2_BOUND_WITHOUT_TONS') + ':'
                    }}
                  ></span>
                  &nbsp;{Accounting.formatNumber(this.props.user.co2Data.co2, 3, '.', ',')}&nbsp;t
                </td>
                <td>
                  <span className="bold">{counterpart.translate('ORGANISATION')}:&nbsp;</span>
                  {this.props.user.organisation}
                </td>
              </tr>
              <tr>
                <td>
                  <span className="bold">{counterpart.translate('WEBSITE')}:&nbsp;</span>
                  <a href={(this.props.user.homepage && this.props.user.homepage.startsWith('http') ? '' : 'http://') + this.props.user.homepage} target="blank" rel="nofollow">
                    {this.props.user.homepage}
                  </a>
                </td>
                <td>
                  <span className="bold"></span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="bold">{counterpart.translate('LOCATION')}:&nbsp;</span>
                  {this.props.user.location}
                </td>
                <td>
                  <span className="bold"></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="userDesc">
          <p>
            <i>{this.props.user.aboutMe ? he.decode(this.props.user.aboutMe) : ''}</i>
          </p>
        </div>
        <div className="align-center bottomButton">{editLink}</div>
        <NotificationSystem ref="notificationSystem" style={style} />
        <Notification ref="notification" />
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */

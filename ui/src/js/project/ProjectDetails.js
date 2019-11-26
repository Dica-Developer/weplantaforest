import Accounting from 'accounting';
import counterpart from 'counterpart';
import React, { Component } from 'react';
import PieChart from 'react-simple-pie-chart';
import { getTextForSelectedLanguage } from '../common/language/LanguageHelper';


export default class ProjectDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fade: false
    };
    this.fadingDone = this.fadingDone.bind(this);
  }

  componentDidMount() {
    const elm = this.refs.details;
    elm.addEventListener('animationend', this.fadingDone);
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    const elm = this.refs.details;
    elm.removeEventListener('animationend', this.fadingDone);
  }

  fadingDone() {
    this.setState({fade: false});
  }

  render() {
    var percent = 0;
    if (this.props.project.projectReportData.amountOfMaximumTreesToPlant != 0) {
      percent = this.props.project.projectReportData.amountOfPlantedTrees / this.props.project.projectReportData.amountOfMaximumTreesToPlant * 100;
    }
    var formattedPercent = Accounting.formatNumber(percent, 0, '.', ',');

    return (
      <div ref="details" className={(this.state.fade
        ? 'fadeOut'
        : 'fadeIn') + ' projectDetails'}>
        <h1>{counterpart.translate('PROJECT') + ': '}
          <i>{this.props.project.projectReportData.projectName}</i>
        </h1>
        <table>
          <tbody>
            <tr>
              <td>
                <div className="floatRight">
                  <span className="greenValue">{formattedPercent}%</span><br/>
                  <span className="tableText">
                    <i>{counterpart.translate('PLANTED')}</i>
                  </span>
                </div>
              </td>
              <td className="midTd">
                <PieChart slices={[
                  {
                    color: '#82ab1f',
                    value: percent
                  }, {
                    color: '#fff',
                    value: 100 - percent
                  }
                ]}/>
              </td>
              <td >
                <span className="greenValue">{Accounting.formatNumber(this.props.project.projectReportData.amountOfPlantedTrees, 0, '.', ',')}</span><br/>
                <span className="tableText">
                  <i>{counterpart.translate('OF')}&nbsp;{Accounting.formatNumber(this.props.project.projectReportData.amountOfMaximumTreesToPlant, 0, '.', ',')}&nbsp;{counterpart.translate('TREES')}</i>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="description">
          <p dangerouslySetInnerHTML={{
            __html: getTextForSelectedLanguage(this.props.project.projectReportData.description)
          }}/>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

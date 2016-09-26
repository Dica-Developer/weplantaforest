import React, {Component} from 'react';
import {render} from 'react-dom';
import Boostrap from 'bootstrap';
import Accounting from 'accounting';
import PieChart from 'react-simple-pie-chart';
import {Link} from 'react-router';

import ImageButton from '../common/components/ImageButton';

export default class ProjectDetails extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var percent = 0;
    var plantButton;
    if (this.props.project.projectReportData.amountOfMaximumTreesToPlant != 0) {
      percent = this.props.project.projectReportData.amountOfPlantedTrees / this.props.project.projectReportData.amountOfMaximumTreesToPlant * 100;
    }

    if(this.props.project.projectReportData.active){
      plantButton =   <ImageButton text="HIER PFLANZEN" onClick={this.props.showPlanting.bind(this)} imagePath="/assets/images/Maus.png" imageWidth="50" imageHeight="50"/>;
    }else{
      plantButton = '';
    }

    var formattedPercent = Accounting.formatNumber(percent, 0, ".", ",")
    return (
      <div className="projectDetails">
        <h2>Projektfläche:&nbsp;
          <i>{this.props.project.projectReportData.projectName}</i>
        </h2>
        <table>
          <tbody>
            <tr>
              <td>
                <div className="floatRight">
                  <span className="greenValue">{formattedPercent}%</span><br/>
                  <span className="tableText">
                    <i>bepflanzt</i>
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
                <span className="greenValue">{Accounting.formatNumber(this.props.project.projectReportData.amountOfPlantedTrees, 0, ".", ",")}</span><br/>
                <span className="tableText">
                  <i>von {Accounting.formatNumber(this.props.project.projectReportData.amountOfMaximumTreesToPlant, 0, ".", ",")}&nbsp;Bäumen</i>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="description">
          <p>{this.props.project.projectReportData.description}</p>
        </div>
        <div className="align-center">
          {plantButton}
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

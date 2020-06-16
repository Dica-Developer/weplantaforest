import Accounting from 'accounting';
import counterpart from 'counterpart';
import React, { Component } from 'react';

require('./co2Calculator.less');

export default class Co2Calculator extends Component {
  constructor() {
    super();
    this.state = {
      foodResult: 0,
      foodMessage: counterpart.translate('FILL_IN_FIELDS'),
      mobilityResult: 0,
      mobilityMessage: counterpart.translate('FILL_IN_FIELDS'),
      mobilityProduction: 0,
      mobilityProductionMessage: counterpart.translate('FILL_IN_FIELDS'),
      flightResult: 0,
      flightMessage: counterpart.translate('FILL_IN_FIELDS'),
      homeResult: 0,
      homeMessage: counterpart.translate('FILL_IN_FIELDS'),
      overallResult: 0,
      overallMessage: '-'
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  calcFoodResult() {
    let feedingResult = parseFloat(this.refs['feeding'].value);
    let foodAmountResult = parseFloat(this.refs['food-amount'].value);
    let foodLocalResult = parseFloat(this.refs['food-local'].value);
    let foodFrozenResult = parseFloat(this.refs['food-frozen'].value);
    let foodSaisonResult = parseFloat(this.refs['food-saison'].value);
    let foodBioResult = parseFloat(this.refs['food-bio'].value);
    let foodResult = feedingResult * foodAmountResult * foodLocalResult * foodFrozenResult * foodSaisonResult * foodBioResult;
    if (feedingResult !== 0 && foodAmountResult !== 0 && foodLocalResult !== 0 && foodFrozenResult !== 0 && foodSaisonResult !== 0 && foodBioResult !== 0) {
      this.state.foodMessage = '';
      this.state.foodResult = foodResult;
      this.forceUpdate();
      this.calcOverallResult();
    }
  }

  calcMobilityResult() {
    let mobilityResult = 0.01 * parseFloat(this.refs['fuel'].value) * parseFloat(this.refs['consumption'].value) * parseFloat(this.refs['range'].value);
    let mobilityProduction = 0.01 * parseFloat(this.refs['fuel'].value) * parseFloat(this.refs['consumption'].value) * 30000;
    this.state.mobilityMessage = '';
    this.state.mobilityProductionMessage = '';
    this.state.mobilityResult = isNaN(mobilityResult) ? 0 : mobilityResult;
    this.state.mobilityProduction = isNaN(mobilityProduction) ? 0 : mobilityProduction;
    this.forceUpdate();
    this.calcOverallResult();
  }

  calcFlightResult() {
    let flightResult = 0.38 * parseFloat(this.refs['flight-range'].value);
    this.state.flightMessage = '';
    this.state.flightResult = isNaN(flightResult) ? 0 : flightResult;
    this.forceUpdate();
    this.calcOverallResult();
  }

  calcHomeResult() {
    let houseTypeResult = parseFloat(this.refs['house-type'].value);
    let livingSpaceResult = parseFloat(this.refs['living-space'].value);
    let energyTypeResult = parseFloat(this.refs['energy-type'].value);
    let houseMemberCountResult = parseFloat(this.refs['house-member-count'].value);
    let powerTypeResult = parseFloat(this.refs['power-type'].value);
    let powerConsumptionResult = parseFloat(this.refs['power-consumption'].value);

    let homeResult = (houseTypeResult * livingSpaceResult * energyTypeResult) / houseMemberCountResult + (powerTypeResult * powerConsumptionResult) / houseMemberCountResult;
    if (!isNaN(houseTypeResult) && !isNaN(livingSpaceResult) && !isNaN(energyTypeResult) && !isNaN(houseMemberCountResult) && !isNaN(powerTypeResult) && !isNaN(powerConsumptionResult)) {
      this.state.homeMessage = '';
      this.state.homeResult = homeResult;
      this.forceUpdate();
      this.calcOverallResult();
    }
  }

  calcOverallResult() {
    let foodResult = parseFloat(this.state.foodResult);
    let mobilityResult = parseFloat(this.state.mobilityResult);
    let mobilityProduction = parseFloat(this.state.mobilityProduction);
    let flightResult = parseFloat(this.state.flightResult);
    let homeResult = parseFloat(this.state.homeResult);
    let overallResult = foodResult + mobilityResult + mobilityProduction + flightResult + homeResult;
    if (overallResult !== 0) {
      this.setState({
        overallMessage: ''
      });
      this.setState({
        overallResult: overallResult
      });
    }
  }

  render() {
    return (
      <div className="container paddingTopBottom15 co2Calculator">
        <div className="row">
          <div className="col-md-12 item-align-start">
            <h1
              dangerouslySetInnerHTML={{
                __html: counterpart.translate('CO2_CALCULATOR')
              }}
            ></h1>
          </div>
          <div className="col-md-12 item-align-start">
            <h2>1. {counterpart.translate('FOOD')}</h2>
          </div>
          <div className="col-md-6 item-align-start">
            <p> {counterpart.translate('FOOD_Q')}</p>
          </div>
          <div className="col-md-6 item-align-start">
            <select className="form-control" ref="feeding" defaultValue={0} onChange={this.calcFoodResult.bind(this)}>
              <option value={0}>{counterpart.translate('SELECT')}</option>
              <option value={1}>{counterpart.translate('VEGAN')}</option>
              <option value={1.167}>{counterpart.translate('VEGETARIAN')}</option>
              <option value={1.334}>{counterpart.translate('LESS_MEAT')}</option>
              <option value={1.666}>{counterpart.translate('MIXED_MEALS')}</option>
              <option value={2.167}>{counterpart.translate('MUCH_MEAT')}</option>
            </select>
          </div>
          <div className="col-md-6 item-align-start">
            <p>{counterpart.translate('HOW_MANY_EAT_Q')}</p>
          </div>
          <div className="col-md-6 item-align-start">
            <select className="form-control" ref="food-amount" defaultValue={0} onChange={this.calcFoodResult.bind(this)}>
              <option value={0}>{counterpart.translate('SELECT')}</option>
              <option value={1}>{counterpart.translate('LESS')}</option>
              <option value={1.25}>{counterpart.translate('NORMAL')}</option>
              <option value={1.625}>{counterpart.translate('MUCH')}</option>
            </select>
          </div>
          <div className="col-md-6 item-align-start">
            <p>{counterpart.translate('WHERE_BUY_Q')}</p>
          </div>
          <div className="col-md-6 item-align-start">
            <select className="form-control" ref="food-local" defaultValue={0} onChange={this.calcFoodResult.bind(this)}>
              <option value={0}>{counterpart.translate('SELECT')}</option>
              <option value={1}>{counterpart.translate('YES')}</option>
              <option value={1.111}>{counterpart.translate('NO')}</option>
            </select>
          </div>
          <div className="col-md-6 item-align-start">
            <p>{counterpart.translate('OFTEN_FROZEN_Q')}</p>
          </div>
          <div className="col-md-6 item-align-start">
            <select className="form-control" ref="food-frozen" defaultValue={0} onChange={this.calcFoodResult.bind(this)}>
              <option value={0}>{counterpart.translate('SELECT')}</option>
              <option value={1}>{counterpart.translate('NEVER')}</option>
              <option value={1.1}>{counterpart.translate('RARELY')}</option>
              <option value={1.2}>{counterpart.translate('OFTEN')}</option>
            </select>
          </div>
          <div className="col-md-6 item-align-start">
            <p>{counterpart.translate('SEASONALITY_Q')}</p>
          </div>
          <div className="col-md-6 item-align-start">
            <select className="form-control" ref="food-saison" defaultValue={0} onChange={this.calcFoodResult.bind(this)}>
              <option value={0}>{counterpart.translate('SELECT')}</option>
              <option value={0.95}>{counterpart.translate('YES')}</option>
              <option value={1}>{counterpart.translate('NO')}</option>
            </select>
          </div>
          <div className="col-md-6 item-align-start">
            <p>{counterpart.translate('ORGANIC_Q')}</p>
          </div>
          <div className="col-md-6 item-align-start">
            <select className="form-control" ref="food-bio" defaultValue={0} onChange={this.calcFoodResult.bind(this)}>
              <option value={0}>{counterpart.translate('SELECT')}</option>
              <option value={0.94}>{counterpart.translate('YES')}</option>
              <option value={1}>{counterpart.translate('NO')}</option>
            </select>
          </div>
          <div className="col-md-6 item-align-start results">
            <div className="bold">{counterpart.translate('RESULT')}:</div>
          </div>
          <div className="col-md-6 item-align-start results">
            <div className="bold">
              {this.state.foodMessage}
              {this.state.foodResult !== 0 && (
                <span>
                  {Accounting.formatNumber(this.state.foodResult, 3, '.', ',')}kg CO<sub>2</sub>
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 item-align-start">
            <h2>2. {counterpart.translate('MOBILITY')}</h2>
          </div>
          <div className="col-md-6 item-align-start">
            <p>{counterpart.translate('FUEL_Q')}</p>
          </div>
          <div className="col-md-6 item-align-start">
            <select className="form-control" ref="fuel" defaultValue={0} onChange={this.calcFoodResult.bind(this)}>
              <option value={0}>{counterpart.translate('SELECT')}</option>
              <option value={2.33}>{counterpart.translate('PETROL')}</option>
              <option value={2.64}>{counterpart.translate('DIESEL')}</option>
              <option value={2.79}>{counterpart.translate('NATURAL_GAS')}</option>
              <option value={1.64}>{counterpart.translate('LIQUID_GAS')}</option>
              <option value={0.6}>{counterpart.translate('ELECTRIC')}</option>
            </select>
          </div>
          <div className="col-md-6 item-align-start">
            <p>{counterpart.translate('CONSUMPTION_Q')}</p>
          </div>
          <div className="col-md-6 item-align-start">
            <input className="form-control" ref="consumption" type="text" placeholder={counterpart.translate('ENTER_CONSUMPTION')} onBlur={this.calcMobilityResult.bind(this)}></input>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 item-align-start">
            <p>{counterpart.translate('HOW_MANY_KM_Q')}</p>
          </div>
          <div className="col-md-6 item-align-start">
            <input className="form-control" ref="range" type="text" placeholder={counterpart.translate('ENTER_KM')} onBlur={this.calcMobilityResult.bind(this)}></input>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 item-align-start">
            <p>{counterpart.translate('HOW_MANY_KM_FLY_Q')}</p>
          </div>
          <div className="col-md-6 item-align-start">
            <input className="form-control" ref="flight-range" type="text" placeholder={counterpart.translate('ENTER_FLY_KM')} onBlur={this.calcFlightResult.bind(this)}></input>
          </div>
          <div className="col-md-6 item-align-start results">
            <div className="bold">{counterpart.translate('RESULT')}:</div>
          </div>
          <div className="col-md-6 item-align-start results">
            <div className="bold">
              {this.state.flightMessage !== 0 && (
                <span>
                  {Accounting.formatNumber(this.state.mobilityResult + this.state.mobilityProduction + this.state.flightResult, 3, '.', ',')} kg CO<sub>2</sub>
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 item-align-start">
            <h2>3. {counterpart.translate('LIVING')}:</h2>
          </div>
          <div className="col-md-6 item-align-start">
            <p>{counterpart.translate('HOUSE_Q')}:</p>
          </div>
          <div className="col-md-6 item-align-start">
            <select className="form-control" ref="house-type" defaultValue={0} onChange={this.calcHomeResult.bind(this)}>
              <option value={0}>{counterpart.translate('SELECT')}</option>
              <option value={280}>{counterpart.translate('SINGLE_HOUSE_UNRENOVATED')}</option>
              <option value={170}>{counterpart.translate('SINGLE_HOUSE_RENOVATED')}</option>
              <option value={110}>{counterpart.translate('SINGLE_HOUSE_INSULATED')}</option>
              <option value={200}>{counterpart.translate('APARTMENT_HOUSE_UNRENOVATED')}</option>
              <option value={120}>{counterpart.translate('APARTMENT_HOUSE_RENOVATED')}</option>
              <option value={90}>{counterpart.translate('APARTMENT_HOUSE_INSULATED')}</option>
              <option value={250}>{counterpart.translate('TERRACE_HOUSE_UNRENOVATED')}</option>
              <option value={150}>{counterpart.translate('TERRACE_HOUSE_RENOVATED')}</option>
              <option value={95}>{counterpart.translate('TERRACE_HOUSE_INSULATED')}</option>
            </select>
          </div>
          <div className="col-md-6 item-align-start">
            <p>{counterpart.translate('ENERGY_SOURCE_Q')}:</p>
          </div>
          <div className="col-md-6 item-align-start">
            <select className="form-control" ref="energy-type" defaultValue={0} onChange={this.calcHomeResult.bind(this)}>
              <option value={0}>{counterpart.translate('SELECT')}</option>
              <option value={0.13}>{counterpart.translate('DISTRICT_HEAT')}</option>
              <option value={0.24}>{counterpart.translate('GAS')}</option>
              <option value={0.302}>{counterpart.translate('HEATING_OIL')}</option>
              <option value={0.014}>{counterpart.translate('WOOD')}</option>
              <option value={0.395}>{counterpart.translate('COAL')}</option>
              <option value={0.481}>{counterpart.translate('BROWN_COAL')}</option>
            </select>
          </div>
          <div className="col-md-6 item-align-start">
            <p>{counterpart.translate('LIVING_SPACE')}:</p>
          </div>
          <div className="col-md-6 item-align-start">
            <input className="form-control" ref="living-space" type="text" placeholder={counterpart.translate('ENETER_LIVING_SPACE')} onBlur={this.calcHomeResult.bind(this)}></input>
          </div>
          <div className="col-md-6 item-align-start">
            <p>{counterpart.translate('HOW_MANY_PEOPLE_Q')}</p>
          </div>
          <div className="col-md-6 item-align-start">
            <select className="form-control" ref="house-member-count" defaultValue={0} onChange={this.calcHomeResult.bind(this)}>
              <option value={0}>{counterpart.translate('SELECT')}</option>
              <option value={1}>1</option>
              <option value={1.55}>2</option>
              <option value={1.954}>3</option>
              <option value={2.252}>4</option>
              <option value={2.629}>5</option>
              <option value={2.882}>6 {counterpart.translate('OR_MORE')}</option>
            </select>
          </div>
          <div className="col-md-6 item-align-start">
            <p>{counterpart.translate('CURRENT_TYPE_Q')}</p>
          </div>
          <div className="col-md-6 item-align-start">
            <select className="form-control" ref="power-type" defaultValue={0} onChange={this.calcHomeResult.bind(this)}>
              <option value={0}>{counterpart.translate('SELECT')}</option>
              <option value={0.04}>{counterpart.translate('GREEN_POWER')}</option>
              <option value={0.59}>{counterpart.translate('MIXED_POWER')}</option>
            </select>
          </div>
          <div className="col-md-6 item-align-start">
            <p>{counterpart.translate('POWER_CONSUMPTION')}:</p>
          </div>
          <div className="col-md-6 item-align-start">
            <input className="form-control" ref="power-consumption" placeholder={counterpart.translate('ENTER_POWER_CONSUMPTION')} onBlur={this.calcHomeResult.bind(this)}></input>
          </div>
          <div className="col-md-6 item-align-start results">
            <div className="bold">{counterpart.translate('RESULT')}:</div>
          </div>
          <div className="col-md-6 item-align-start results">
            <div className="bold">
              {this.state.homeMessage}
              {this.state.homeResult !== 0 && (
                <span>
                  {Accounting.formatNumber(this.state.homeResult, 3, '.', ',')}kg CO<sub>2</sub>
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="row overall-result">
          <div className="col-md-12 item-align-start">
            <h3>{counterpart.translate('TOTAL_RESULT')}</h3>
          </div>
          <div className="col-md-12 item-align-start results">
            <div className="bold">
              {this.state.overallMessage}
              {this.state.overallResult !== 0 && (
                <span>
                  {Accounting.formatNumber(this.state.overallResult, 3, '.', ',')}kg CO<sub>2</sub>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

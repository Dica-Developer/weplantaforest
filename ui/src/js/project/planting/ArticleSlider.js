import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';
import Accounting from 'accounting';

require("./articleSlider.less");

export default class ArticleSlider extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      overallPrice: this.props.article.price.amount,
      treeCount: 1
    })
  }

  updateValue(event) {
    this.setState({
      overallPrice: event.target.value,
      treeCount: event.target.value/this.props.article.price.amount
    });
  }

  render() {
    let imageUrl = 'http://localhost:8081/treeType/image/' + this.props.article.treeType.imageFile + '/60/60';
    return (
      <div className="articleSlider">
        <table>
          <tbody>
            <tr>
              <td>
                <img src={imageUrl} className="treeImg"/>
                  <div>
                    <span className="bold"> {this.props.article.treeType.name}</span><br/>
                      Stk.&nbsp;<span className="bold">{this.props.article.price.amount}&nbsp;€</span><br/>
                  </div>
                </td>
                <td>
                  <div>
                    <input type="range" min="0" max="1000" step={this.props.article.price.amount} stepUp="5" defaultValue={this.props.article.price.amount} onChange={this.updateValue.bind(this)}/>
                  </div>
                  <div>
                    <span className="price">{this.state.overallPrice}&nbsp;€</span><br/>
                    <span className="treeCount">{Accounting.formatNumber(this.state.treeCount, 0, ".", ",")}&nbsp;</span><span className="glyphicon glyphicon-tree-deciduous" aria-hidden="true"></span>
                  </div>
                </td>
              </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

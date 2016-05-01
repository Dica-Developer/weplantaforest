var axios = require('axios');
var React = require('react');
var ReactDOM = require('react-dom');
import { Router, Route, Link, browserHistory } from 'react-router'


class Application extends React.Component {

}

class Co2Bar extends React.Component {

    constructor() {
        super();
        this.state = {co2: 0, treesCount: 0.0};
    }

    componentDidMount() {
        var that = this;
        axios.get('http://localhost:8081/reports/co2').then(function(co2) {
            that.setState(co2.data);
        });
        window.setInterval(function () {
            axios.get('http://localhost:8081/reports/co2').then(function(co2) {
                that.setState(co2.data);
            })
        }, 10000);
    }

    render() {
        return (<div><div className="col-md-6"><h3>{this.state.co2} <small>t CO2 gebunden</small></h3></div><div className="col-md-6"><h3>{this.state.treesCount} <small>Bäume gepflanzt</small></h3></div></div>);
    }
}

ReactDOM.render(<Co2Bar/>, document.getElementById('co2Bar'));
/*ReactDOM.render((
     <Router history={browserHistory}>
         <Route path="/" component={App}>
             <Route path="plant" component={Plant}>
         </Route>
         <Route path="*" component={NoMatch}/>
         </Route>
     </Router>
), document.getElementById('test'))
*/

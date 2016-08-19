import React, {
  Component
} from 'react';
import Boostrap from 'bootstrap';
import axios from 'axios';
import moment from 'moment';

export default class ProjectCarousel extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var that = this;
  }

  render() {
    var projectName = this.props.projectName;

    return (
      <div id="carousel-example-generic" className="carousel slide" data-ride="carousel">


        <div className="carousel-inner" role="listbox">
          {this.props.slides.map(function(slide, index) {
            var activeItem = 'item';
            if (0 === index) {
              activeItem = 'item active';
            }
            let imageUrl = 'http://localhost:8081/project/image/' + projectName + '/' + slide.imageFileName + '/1140/1140';
            return (
              <div className={activeItem}>
                <img src={imageUrl} width="1140" height="400" alt={slide.imageFileName}/>
                <div className="imageDescription">
                  <span className="date"><i>{moment(slide.date).format("DD.MM.YYYY")}</i>&nbsp;/&nbsp;</span><span className="text" >{slide.description}</span>
                </div>
              </div>
            );
          })}
        </div>
        <a className="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
          <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
          <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    );
  }
}

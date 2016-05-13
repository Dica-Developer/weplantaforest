import React, {Component} from 'react';
import Boostrap from 'bootstrap';

export default class Carousel extends Component {
  constructor() {
    super();
    this.slides = [
      {
        'image': 'http://www.iplantatree.org/img/plantImage/96/width/1140/max',
        'title': 'Projektfläche: Kobschütz',
        'text': 'Projektfläche: Kobschütz',
        'className': 'item active'
      },
      {
        'image': 'http://www.iplantatree.org/img/plantImage/114/width/1140/max',
        'title': 'Projektfläche: Berlin Mittelheide',
        'text': 'Projektfläche: Berlin Mittelheide',
        'className': 'item'
      }
    ];
  }

  render() {
    return (<div id="carousel-example-generic" className="carousel slide" data-ride="carousel">
              <ol className="carousel-indicators">
                <li data-target="#carousel-example-generic" data-slide-to="0" className="active"></li>
                <li data-target="#carousel-example-generic" data-slide-to="1"></li>
              </ol>
              <div className="carousel-inner" role="listbox">
                {this.slides.map(function (slide) {
                    return (<div className={slide.className}>
                        <img src={slide.image} width="1140" height="400" alt={slide.title} />
                        <div className="carousel-caption">
                        {slide.text}
                        </div>
                      </div>);
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
            </div>);
  }
}


import React, {Component} from 'react';
import Boostrap from 'bootstrap';

export default class Teaser extends Component {
  constructor() {
    super();
    this.teaser = [
      {
        'image': {
          'src': 'https://placeholdit.imgix.net/~text?txtsize=26&w=350&h=350&txttrack=0&txt=',
          'alt': ''
        },
        'title': 'MAIN.TEASER.1.TITLE',
        'text': 'MAIN.TEASER.1.TEXT'
      },
      {
        'image': {
          'src': 'https://placeholdit.imgix.net/~text?txtsize=26&w=350&h=350&txttrack=0&txt=',
          'alt': ''
        },
        'title': 'MAIN.TEASER.2.TITLE',
        'text': 'MAIN.TEASER.2.TEXT'
      },
      {
        'image': {
          'src': 'https://placeholdit.imgix.net/~text?txtsize=26&w=350&h=350&txttrack=0&txt=',
          'alt': ''
        },
        'title': 'MAIN.TEASER.3.TITLE',
        'text': 'MAIN.TEASER.3.TEXT'
      }
    ];
  }

  render() {
    return (<div className="row">
    {this.teaser.map(function (teaser) {
      return (
        <div className="col-md-4">
          <div className="thumbnail">
            <img src={teaser.image.src} alt={teaser.image.alt} />
            <div className="caption">
              <h3>{teaser.title}</h3>
              <p>{teaser.text}</p>
            </div>
          </div>
        </div>);
    })}
  </div>);
  }
}


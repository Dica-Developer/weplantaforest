import React, {
  Component
} from 'react';
import Boostrap from 'bootstrap';

export default class Teaser extends Component {
  constructor() {
    super();
    this.teaser = [{
      'image': {
        'src': 'http://www.iplantatree.org/img/article/1676/width/305',
        'alt': ''
      },
      'title': 'Praktikant für die neue Website ist da',
      'text': 'Gabor hat sein halbjährliches Praktikum bei uns angefangen. Er wird sich in dieser Zeit um den Website Relaunch kümmern. Dann wollen wir ihn mal ausquetschen:'
    }, {
      'image': {
        'src': 'http://www.iplantatree.org/img/article/1675/width/305',
        'alt': ''
      },
      'title': 'Baum des Jahres ist die Winterlinde',
      'text': 'Das Wetter wird wieder besser und heute ist der Tag des Baumes, also unternehmt etwas, was euch Bäumen näher bringt. Ihr könnt selber Bäume pflanzen, wandern gehen oder ein Picknick'
    }, {
      'image': {
        'src': 'http://www.iplantatree.org/img/article/1674/width/305',
        'alt': ''
      },
      'title': 'Der Traktor ist da',
      'text': 'Dank eurer Hilfe konnten wir per Crowdfunding einen kleinen Traktor knapp zur Hälfte finanzieren. Diesen haben wir in der letzten Woche abgeholt. Seinen ersten Einsatz wird er Ende April in Wallendorf haben.'
    }];
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

/* vim: set softtabstop=2:shiftwidth=2:expandtab */

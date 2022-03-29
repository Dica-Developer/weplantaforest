import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as L from 'leaflet';
import { tileLayer, polygon, latLng, Map } from 'leaflet';

@Component({
  selector: 'app-project-edit-location',
  templateUrl: './project-edit-location.component.html',
  styleUrls: ['./project-edit-location.component.scss'],
})
export class ProjectEditLocationComponent implements OnInit {
  control: FormControl;

  map: Map;
  coords;

  @Input()
  set positions(control: FormControl) {
    this.control = control;
    this.coords = this.createPolygonPoints();
  }

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...',
      }),
    ],
    zoom: 2,
  };

  constructor() {}

  ngOnInit(): void {}

  onMapReady(map: Map): void {
    console.log('map ready');
    this.map = map;
    console.log(map);

    setTimeout(() => {
      var polygon = L.polygon(this.coords, { color: '#82ab1f' }).addTo(
        this.map
      );
      this.map.fitBounds(polygon.getBounds());
      map.invalidateSize();
    });
  }

  createPolygonPoints() {
    const coords = [];
    for (let cnt = 0; cnt < this.control.value.length; cnt++) {
      for (let point of this.control.value) {
        if (cnt === point.order) {
          coords.push([point.lat, point.lng]);
        }
      }
    }
    return coords;
  }
}

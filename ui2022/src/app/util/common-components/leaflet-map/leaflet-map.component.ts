import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import * as L from 'leaflet';
import { tileLayer, latLng, Map } from 'leaflet';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss'],
})
export class LeafletMapComponent implements OnInit {
  map: Map;
  coords = [];
  polygon;
  control: UntypedFormControl;

  @Input() positions: any[];
  @Input() mapHeight: string = '600px';

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...',
      }),
    ],
    drawControl: false,
    zoom: 2,
  };

  constructor() {}

  ngOnInit(): void {
    if (this.positions) {
      this.coords = this.createPolygonPoints();
    }
  }

  onMapReady(map: Map): void {
    this.map = map;
    setTimeout(() => {
      if (this.coords.length > 0) {
        this.polygon = L.polygon(this.coords, { color: '#82ab1f' });
        map.addLayer(this.polygon);
        this.map.fitBounds(this.polygon.getBounds());
      } else {
        map.setView(new L.LatLng(51.482814, 11.969977), 13);
      }
      map.invalidateSize();
      // this.addDrawOptions(map);
    });
  }

  createPolygonPoints() {
    const coords = [];
    for (let cnt = 0; cnt < this.positions?.length; cnt++) {
      for (let point of this.positions) {
        if (cnt === point.order) {
          coords.push([point.lat, point.lng]);
        }
      }
    }
    return coords;
  }
}

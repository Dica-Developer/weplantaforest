import { Component, HostListener, Input, OnInit } from '@angular/core';
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
  screenWidth;

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

  @HostListener('window:load', ['$event'])
  getScreenSize(event?) {
    this.screenWidth = window.innerWidth;
  }

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
        // adjust zoom if mobile view
        if (this.screenWidth < 764) {
          map.setView(new L.LatLng(51.9481, 10.26517), 5);
        } else {
          map.setView(new L.LatLng(51.9481, 10.26517), 6);
        }
      }
      map.invalidateSize();
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
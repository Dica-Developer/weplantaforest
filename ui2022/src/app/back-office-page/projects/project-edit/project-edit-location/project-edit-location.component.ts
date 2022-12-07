import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import * as L from 'leaflet';
import { tileLayer, latLng, Map } from 'leaflet';
import { ProjectPositionPoint } from '../../../../store/project.store';

@Component({
  selector: 'app-project-edit-location',
  templateUrl: './project-edit-location.component.html',
  styleUrls: ['./project-edit-location.component.scss'],
})
export class ProjectEditLocationComponent implements OnInit {
  control: UntypedFormControl;

  map: Map;
  coords;
  polygon;

  @Input()
  set positions(control: UntypedFormControl) {
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
    drawControl: false,
    zoom: 2,
  };

  constructor() {}

  ngOnInit(): void {}

  onMapReady(map: Map): void {
    this.map = map;
    setTimeout(() => {
      if (this.coords.length > 0) {
        this.polygon = L.polygon(this.coords, { color: '#82ab1f' });
        map.addLayer(this.polygon);
        this.map.fitBounds(this.polygon.getBounds());
      }else {
        map.setView(new L.LatLng(51.482814, 11.969977), 13);
      }
      map.invalidateSize();
      this.addDrawOptions(map);
    });
  }

  addClickListener(map: Map) {
    this.map.on('click', (e) => {});
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

  resetPolygon() {
    this.map.removeLayer(this.polygon);
    this.control.setValue([]);
    this.polygon = null;
  }

  addDrawOptions(map: Map) {
    let drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);
    let drawControl = new L.Control.Draw({
      position: 'topright',
      draw: {
        polygon: {
          allowIntersection: false, // Restricts shapes to simple polygons
          shapeOptions: {
            color: '#82ab1f',
          },
        },
        // disable toolbar item by setting it to false
        polyline: false,
        circle: false,
        rectangle: false,
        marker: false,
        circlemarker: false,
      },
      edit: {
        featureGroup: drawnItems,
      },
    });
    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, (e) => {
      if(this.polygon) {
        this.map.removeLayer(this.polygon);
      }
      this.polygon = e.layer;
      this.map.addLayer(this.polygon);
      this.createNewProjectPositionPoints(e.layer.editing.latlngs[0][0]);
    });
  }

  createNewProjectPositionPoints(points: latLng[]) {
    const mapPoints: ProjectPositionPoint[] = [];
    let cnt = 0;
    for (let p of points) {
      mapPoints.push({ lat: p.lat, lng: p.lng, order: cnt });
      cnt++;
    }
    this.control.setValue(mapPoints);
  }
}

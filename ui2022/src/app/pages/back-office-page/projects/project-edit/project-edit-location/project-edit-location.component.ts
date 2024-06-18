import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ProjectPositionPoint } from '../../../../../store/project.store';
import { LeafletHelper } from 'src/app/util/helper/leaflet.helper';
declare const L: any; // --> Works

@Component({
  selector: 'app-project-edit-location',
  templateUrl: './project-edit-location.component.html',
  styleUrls: ['./project-edit-location.component.scss'],
  standalone: true,
  imports: [],
})
export class ProjectEditLocationComponent implements OnInit {
  control: UntypedFormControl;

  lib: typeof L;
  draw: any;
  map: L.Map;
  coords;
  polygon;
  drawControl;
  drawnItems

  @Input()
  set positions(control: UntypedFormControl) {
    this.control = control;
    this.coords = this.createPolygonPoints();
  }

  mapOptions: any

  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object,
    private leafletHelper: LeafletHelper,
  ) {}

  ngOnInit(): void {
    if (this._platformId === 'browser') {
      this.leafletHelper.loadLeaflet().then((lib) => {
        this.lib = lib;
        this.mapOptions = this.createDefaultMapOptions(lib);
        this.map = lib.map('map', this.mapOptions);
        this.onMapReady(this.map);
      })
    }
  }

  onMapReady(leafletMap: any): void {
    if (this._platformId === 'browser') {
      this.map = leafletMap;
      setTimeout(() => {
        if (this.coords.length > 0) {
          this.polygon = this.lib.polygon(this.coords, { color: '#82ab1f' });
          this.map.addLayer(this.polygon);
          this.map.fitBounds(this.polygon.getBounds());
        } else {
          this.map.setView([51.482814, 11.969977], 13);
        }
        this.map.invalidateSize();
        this.addDrawOptions(this.map);
      });
    }
  }

  addClickListener(map: L.Map) {
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

  createDefaultMapOptions(leafletLib: any) {
    return {
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '...',
        }),
      ],
      drawControl: false,
      zoom: 2,
    };
  }

  resetPolygon() {
    this.map.removeLayer(this.polygon);
    this.control.setValue([]);
    this.polygon = null;
  }

  addDrawOptions(map: L.Map) {
    if (this.drawControl) {
      map.removeControl(this.drawControl);
    }
    if (this.drawnItems) {
      map.removeLayer(this.drawnItems);
    }
    this.drawnItems = new L.FeatureGroup();
    map.addLayer(this.drawnItems);
    this.drawControl = new L.Control.Draw({
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
        featureGroup: this.drawnItems,
      },
    });
    map.addControl(this.drawControl);
    map.on(L.Draw.Event.CREATED, (e) => {
      if (this.polygon) {
        this.map.removeLayer(this.polygon);
      }
      this.polygon = e.layer;
      this.map.addLayer(this.polygon);
      this.createNewProjectPositionPoints(e.layer.editing.latlngs[0][0]);
    });
  }

  createNewProjectPositionPoints(points: any[]) {
    const mapPoints: ProjectPositionPoint[] = [];
    let cnt = 0;
    for (let p of points) {
      mapPoints.push({ lat: p.lat, lng: p.lng, order: cnt });
      cnt++;
    }
    this.control.setValue(mapPoints);
  }
}

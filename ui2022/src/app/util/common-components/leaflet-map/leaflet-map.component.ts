import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import * as L from 'leaflet';
import { tileLayer, marker, icon, Map } from 'leaflet';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss'],
})
export class LeafletMapComponent implements OnInit, OnDestroy {
  map: Map;
  coords = [];
  polygon;
  control: UntypedFormControl;
  screenWidth;

  @Input() showMarker: boolean = false;
  @Input() positions: any[];
  @Input() mapHeight: string = '600px';
  @Input() disabledMap: boolean = false;
  @Output() markerSet = new EventEmitter();

  mapSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  projectAreasSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  combinedSub: Subscription;

  projectAreasInternal: any[][];

  @Input('projectAreas')
  set projectAreas(areas: any[][]) {
    this.projectAreasInternal = areas;
    this.projectAreasSubject.next(true);
  }

  treeMarker: any[];

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...',
      }),
    ],
    drawControl: false,
    dragging: !L.Browser.mobile,
    // touchZoom: L.Browser.mobile,
    zoom: 2,
  };

  @HostListener('window:load', ['$event'])
  getScreenSize(event?) {
    this.screenWidth = window.innerWidth;
  }

  constructor() {}
  ngOnInit(): void {
    if (this.positions) {
      this.coords = this.createPolygonPoints(this.positions);
    }

    this.combinedSub = combineLatest([this.mapSubject, this.projectAreasSubject]).subscribe(
      (res) => {
        if (res[0] && res[1]) {
          // map and area points are loaded, now start adding marker and polygons
          this.treeMarker = [];
          for (let area of this.projectAreasInternal) {
            const coords = this.createPolygonPoints(area);
            const polygon = L.polygon(coords, { color: '#82ab1f' });
            this.map.addLayer(polygon);
            const marker = this.createMarker(polygon.getCenter().lat, polygon.getCenter().lng);
            marker.on('click', (event) => {
              event.target._map.setView(event.latlng, 14);
            });
            this.treeMarker.push(marker);
          }
        }
      },
    );
  }

  ngOnDestroy(): void {
    this.combinedSub?.unsubscribe();
  }

  onMapReady(map: Map): void {
    this.map = map;
    this.map.scrollWheelZoom.disable();
    if (this.disabledMap) {
    }
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
      this.mapSubject.next(true);
    });
  }

  createPolygonPoints(positions: any[]) {
    const coords = [];
    for (let cnt = 0; cnt < positions.length; cnt++) {
      for (let point of positions) {
        if (cnt === point.order) {
          coords.push([point.lat, point.lng]);
        }
      }
    }
    return coords;
  }

  mapClicked(event: any) {
    if (!this.showMarker) {
      return;
    }
    this.treeMarker = [];
    this.treeMarker.push(this.createMarker(event.latlng.lat, event.latlng.lng));
    this.markerSet.emit({ lat: event.latlng.lat, lng: event.latlng.lng });
  }

  createMarker(lat: number, lng: number) {
    return marker([lat, lng], {
      icon: icon({
        iconAnchor: [17, 35],
        iconUrl: '/assets/treeIconBrown.png',
        iconRetinaUrl: '/assets/treeIconBrown.png',
      }),
    });
  }
}

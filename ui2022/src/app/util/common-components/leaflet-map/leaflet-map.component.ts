import {
  Component,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { tileLayer, marker, icon, Map } from 'leaflet';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { LeafletHelper } from '../../helper/leaflet.helper';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss'],
  standalone: true,
  imports: [],
})
export class LeafletMapComponent implements OnInit, OnDestroy {
  @Output() markerSet = new EventEmitter();
  @Input() showMarker: boolean = false;
  @Input() positions: any[];
  @Input() mapHeight: string = '600px';
  @Input() disabledMap: boolean = false;
  @Input('projectAreas')
  set projectAreas(areas: any[][]) {
    this.projectAreasInternal = areas;
    this.projectAreasSubject.next(true);
  }

  mapSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  map: Map;
  coords = [];
  polygon;
  control: UntypedFormControl;
  screenWidth;
  projectAreasSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  combinedSub: Subscription;
  projectAreasInternal: any[][];
  mapOptions = this.createDefaultMapOptions();
  treeMarker: any[];

  @HostListener('window:load', ['$event'])
  getScreenSize() {
    this.screenWidth = window.innerWidth;
  }

  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object,
    private leafletHelper: LeafletHelper
  ) {}

  ngOnInit(): void {
    if (this._platformId === 'browser') {
      this.leafletHelper.loadLeaflet().then((lib) => {
        this.combineSubscriptions(lib);
        this.map = lib.map('map', this.mapOptions);
        this.onMapReady(this.map);
        this.map.on('click', this.mapClicked.bind(this));
      })
    }
    if (this.positions) {
      this.coords = this.createPolygonPoints(this.positions);
    }
  }

  combineSubscriptions(leaflet:any) {
    this.combinedSub = combineLatest([this.mapSubject, this.projectAreasSubject]).subscribe(
      (res) => {
        if (res[0] && res[1]) {
          // map and area points are loaded, now start adding marker and polygons
          this.treeMarker = [];
          for (let area of this.projectAreasInternal) {
            const coords = this.createPolygonPoints(area);

            const polygon = leaflet.polygon(coords, { color: '#82ab1f' });
            this.map.addLayer(polygon);
            const marker = this.createMarker(polygon.getCenter().lat, polygon.getCenter().lng);
            this.map.addLayer(marker);
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

  createDefaultMapOptions() {
    return {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '...',
        }),
      ],
      drawControl: false,
      dragging: true,
      zoom: 6,
      center: [51.9481, 10.26517],
    }
  }

  async onMapReady(leaflet: any) {
    console.log('onMapReady')
    this.map = leaflet
    this.map.scrollWheelZoom.disable();
    if (this.disabledMap) {
    }
    if (this._platformId === 'browser') {
      this.leafletHelper.loadLeaflet().then((lib) => {
        setTimeout(() => {
          if (this.coords.length > 0) {
            this.polygon = lib.polygon(this.coords, { color: '#82ab1f' });
            this.map.addLayer(this.polygon);
            this.map.fitBounds(this.polygon.getBounds());
          } else {
            // adjust zoom if mobile view
            if (this.screenWidth < 764) {
              this.map.setView([51.9481, 10.26517], 5);
            } else {
              this.map.setView([51.9481, 10.26517], 6);
            }
          }
          this.map.invalidateSize();
          this.mapSubject.next(true);
        });
      })
    }
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
    this.resetTreeMarkerForSelfPlant()
    this.treeMarker = [];
    this.treeMarker.push(this.createMarker(event.latlng.lat, event.latlng.lng));
    this.markerSet.emit({ lat: event.latlng.lat, lng: event.latlng.lng });
    this.map.addLayer(this.treeMarker[0]);
  }

  resetTreeMarkerForSelfPlant() {
    if (this.treeMarker?.length > 0) {
      this.map.removeLayer(this.treeMarker[0]);
    }
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

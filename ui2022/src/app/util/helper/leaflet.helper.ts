
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LeafletHelper {
  public Leaflet = null;
  public draw = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (this.platformId === 'browser') {
      this.Leaflet = import('leaflet');
      this.draw = import('leaflet-draw');
    }
  }

  async loadLeaflet() {
    this.Leaflet = await this.Leaflet;
    return this.Leaflet;
  }

  async loadLeafletDraw() {
    this.draw = await this.draw;
    return this.draw;
  }
}

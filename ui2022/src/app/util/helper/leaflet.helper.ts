
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LeafletHelper {
  public L = null;
  public draw = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }

  async loadLeaflet() {
    if (this.platformId === 'browser' && !this.L) {
      this.L = await import('leaflet');
      await import('leaflet-draw');
    }
    return this.L;
  }

  async loadLeafletDraw() {
    this.draw = await this.draw;
    return this.draw;
  }
}

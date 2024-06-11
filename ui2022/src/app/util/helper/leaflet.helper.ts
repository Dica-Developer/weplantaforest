
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LeafletHelper {
  public L = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (this.platformId === 'browser') {
      this.L = import('leaflet');
    }
  }

  async loadLeaflet() {
    this.L = await this.L;
    return this.L;
  }
}

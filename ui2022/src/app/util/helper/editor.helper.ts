import { Injectable, PLATFORM_ID, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EditorHelper {
  public editor;
  ckEditorLoaded = false;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }

  async loadCkEditor() {
    if (this.platformId === 'browser') {
      const jsElmCK = document.createElement('script');
      jsElmCK.type = 'application/javascript';
      jsElmCK.src = 'https://cdn.ckeditor.com/ckeditor5/11.2.0/classic/ckeditor.js';
      document.body.appendChild(jsElmCK);
      jsElmCK.onload = () => {
        this.editor = (window as any).ClassicEditor;
        this.ckEditorLoaded = true;
        return this.editor;
      };
    }
  }

  async loadEditor() {
    this.editor = await this.editor;
    return this.editor;
  }
}

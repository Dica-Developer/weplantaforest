import { Injectable, afterNextRender } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EditorHelper {
  editor: any = null;
  windowAvailable: boolean = false;

  constructor(){
  }

  async loadCkEditor() {
    if (typeof window !== 'undefined') {
    //  const ClassicEditor = await import('@ckeditor/ckeditor5-build-classic')
     // this.editor = ClassicEditor.default;
      this.windowAvailable = true;
      return this.editor
    } else {
      this.windowAvailable = false;
    }
  }
}

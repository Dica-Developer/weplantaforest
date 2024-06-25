import { Component, Inject, Input, OnDestroy, OnInit, PLATFORM_ID, Renderer2, afterNextRender } from '@angular/core';
import { FormControl, UntypedFormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SafeHtmlPipe } from '../safehtml.pipe';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab,
    FormsModule,
    ReactiveFormsModule,
    SafeHtmlPipe,
    CommonModule
  ],
})
export class TextEditorComponent implements OnInit, OnDestroy {
  controlInternal: UntypedFormControl;
  rawHTMLControl = new FormControl('');

  text: string;
  public editor = null;

  rawControlSub: Subscription;

  selectedTab: number = 0;

  changeFromEditor: boolean = true;
  changeFromRawHtml: boolean = false;

  @Input()
  set control(controlObj: UntypedFormControl) {
    this.text = controlObj.value;
    this.controlInternal = controlObj;
    this.rawHTMLControl.setValue(controlObj.value);
  }
  windowAvailable: boolean = false;

  ckEditorData;
  ckEditorLoaded = false;
  isBrowser
  Editor;

  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document,
  ) {
    this.isBrowser = isPlatformBrowser(_platformId);
  }

  ngOnInit() {
    this.createRawControlSub();
  }

  loadCkEditor() {
    if ((window as any).ClassicEditor) {
      this.initializeEditor();
    } else {
      const script = this._renderer2.createElement('script');
      script.type = 'application/javascript';
      script.src = 'https://cdn.ckeditor.com/ckeditor5/41.4.2/classic/ckeditor.js';

      script.onload = () => {
        this.initializeEditor();
      };

      this._renderer2.appendChild(this._document.body, script);
    }
  }

  async initializeEditor() {
    try {
      const CKEditor = (window as any).ClassicEditor;
      console.log(CKEditor);
      if (CKEditor) {
        const editor = await CKEditor.create(document.querySelector('#editor'));
        editor.model.document.on('change', () => {
          this.ckEditorData = JSON.stringify(editor.getData());
        });
      } else {
        console.error('CKEditor is not available.');
      }
    } catch (error) {
      console.error(error);
    }
  }

  ngOnDestroy(): void {
    this.rawControlSub?.unsubscribe();
  }

  onChange(event: any) {
    this.controlInternal.setValue(event.editor.getData());
    if (this.changeFromEditor) {
      this.rawHTMLControl.setValue(event.editor.getData());
    }
  }

  createRawControlSub() {
    this.rawControlSub = this.rawHTMLControl.valueChanges.subscribe((value) => {
      this.controlInternal.setValue(value);
      if (this.changeFromRawHtml) {
        this.text = value;
      }
    });
  }

  tabChanged(event: any) {
    if (event.index === 0) {
      this.changeFromEditor = true;
      this.changeFromRawHtml = false;
    } else if (event.index === 1) {
      this.changeFromEditor = false;
      this.changeFromRawHtml = true;
    }
  }
}

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Editor, toHTML } from 'ngx-editor';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
})
export class TextEditorComponent implements OnInit, OnDestroy {
  editorControl: FormControl;
  text: string;

  @Input()
  set control(controlObj: FormControl) {
    this.editorControl = controlObj;
    this.text = this.editorControl.value;
  }

  editor: Editor;

  valueChangeSub: Subscription;

  constructor() {}

  ngOnInit(): void {
    this.editor = new Editor();
    this.valueChangeSub = this.editor.valueChanges.subscribe((res) => {
      if (res && res.type === 'doc') {
        this.editorControl.setValue(toHTML(res));
      }
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
    this.valueChangeSub.unsubscribe();
  }
}
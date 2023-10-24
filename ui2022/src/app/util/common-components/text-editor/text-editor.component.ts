import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
})
export class TextEditorComponent implements OnInit {
  controlInternal: UntypedFormControl;

  text: string;
  public editor = ClassicEditor;

  @Input()
  set control(controlObj: UntypedFormControl) {
    this.text = controlObj.value;
    this.controlInternal = controlObj;
  }

  constructor() {}

  ngOnInit(): void {}

  onChange(event: any) {
    this.controlInternal.setValue(event.editor.getData());
  }
}

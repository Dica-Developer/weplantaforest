import { Component, Input, OnInit } from '@angular/core';
import { FormControl, UntypedFormControl } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
})
export class TextEditorComponent implements OnInit {
  controlInternal: UntypedFormControl;

  rawHTMLControl = new FormControl('');

  text: string;
  public editor = ClassicEditor;

  rawControlSub: Subscription;

  @Input()
  set control(controlObj: UntypedFormControl) {
    this.text = controlObj.value;
    this.controlInternal = controlObj;
    this.rawHTMLControl.setValue(controlObj.value);
  }

  constructor() {}

  ngOnInit(): void {
    this.rawControlSub = this.rawHTMLControl.valueChanges.subscribe((value) => {
      this.controlInternal.setValue(value);
      this.text = value;
    });
  }

  onChange(event: any) {
    this.controlInternal.setValue(event.editor.getData());
    this.rawHTMLControl.setValue(event.editor.getData());
  }
}

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, UntypedFormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SafeHtmlPipe } from '../safehtml.pipe';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { EditorHelper } from '../../helper/editor.helper';

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

  constructor(
    private editorHelper: EditorHelper
  ) {}

  ngOnInit(): void {
    this.createRawControlSub();
    this.editor = this.editorHelper.loadCkEditor();
    console.log(this.editor);
    this.editor.setData(this.text);
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

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Editor } from "ngx-editor";

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit, OnDestroy {

  @Input()
  html: string;

  editor: Editor;

  constructor() { }

  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

}

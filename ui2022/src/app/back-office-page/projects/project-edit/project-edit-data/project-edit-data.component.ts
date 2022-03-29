import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-project-edit-data',
  templateUrl: './project-edit-data.component.html',
  styleUrls: ['./project-edit-data.component.scss'],
})
export class ProjectEditDataComponent implements OnInit {
  @Input()
  projectForm: FormGroup;

  constructor() {
  }

  ngOnInit(): void {}

}

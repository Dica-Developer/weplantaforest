import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CertificateIconComponent } from '../icons/certificate-icon/certificate-icon.component';
import { ShovelIconComponent } from '../icons/shovel-icon/shovel-icon.component';
import { BarrelIconComponent } from '../icons/barrel-icon/barrel-icon.component';
import { TreeIconComponent } from '../icons/tree-icon/tree-icon.component';

@Component({
    selector: 'app-planting-process',
    templateUrl: './planting-process.component.html',
    styleUrls: ['./planting-process.component.scss'],
    standalone: true,
    imports: [TreeIconComponent, BarrelIconComponent, ShovelIconComponent, CertificateIconComponent, TranslateModule]
})
export class PlantingProcessComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

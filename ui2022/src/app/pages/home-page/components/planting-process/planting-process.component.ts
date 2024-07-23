import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BarrelIconComponent } from 'src/app/util/common-components/icons/barrel-icon/barrel-icon.component';
import { CertificateIconComponent } from 'src/app/util/common-components/icons/certificate-icon/certificate-icon.component';
import { ShovelIconComponent } from 'src/app/util/common-components/icons/shovel-icon/shovel-icon.component';
import { TreeIconComponent } from 'src/app/util/common-components/icons/tree-icon/tree-icon.component';

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

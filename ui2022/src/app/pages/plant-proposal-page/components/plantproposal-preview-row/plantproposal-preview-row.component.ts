import { Component, Input, OnInit } from '@angular/core';
import { TextHelper } from 'src/app/util/text.helper';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-plantproposal-preview-row',
  templateUrl: './plantproposal-preview-row.component.html',
  styleUrls: ['./plantproposal-preview-row.component.scss'],
})
export class PlantproposalPreviewRowComponent implements OnInit {
  @Input() plantItem: any;

  imageUrl: string;
  sum: number = 0;

  constructor(private textHelper: TextHelper) {}

  ngOnInit(): void {
    this.imageUrl =
      environment.backendUrl + '/treeType/image/' + this.plantItem.imageFile + '/100/100';
    this.calcSum(this.plantItem.amount);
  }

  getGerman(text: string) {
    return this.textHelper.getTextForLanguage(text, 'de');
  }

  calcSum(amount: number) {
    this.sum = (amount * this.plantItem.treePrice) / 100;
  }
}

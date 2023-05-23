import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { TreeType } from 'src/app/store/project.store';
import { loadTreeTypes, selectTreeTypes } from 'src/app/store/treeType.store';
import { selectProfileDetails } from 'src/app/store/profile.store';
import { TextHelper } from 'src/app/util/text.helper';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-explore-page',
  templateUrl: './explore-page.component.html',
  styleUrls: ['./explore-page.component.scss'],
})
export class ExplorePageComponent implements OnInit {
  currentTree: TreeType = null;
  selectedInfoType: string = 'leaf';
  currentImageUrl: string = '';
  currentFruitUrl: string = '';
  combinedSub: Subscription;
  trees: TreeType[] = [];

  constructor(private store: Store<AppState>, private textHelper: TextHelper) {
    this.store.dispatch(loadTreeTypes());
  }

  ngOnInit(): void {
    const profileDetails$ = this.store.select(selectProfileDetails);
    const treeTypeSelect$ = this.store.select(selectTreeTypes);

    this.combinedSub = combineLatest([profileDetails$, treeTypeSelect$]).subscribe((res) => {
      let lang = 'de';
      if (res[0]?.lang && res[0].lang === 'DEUTSCH') {
        lang = 'de';
      } else if (res[0]?.lang && res[0].lang === 'ENGLISH') {
        lang = 'en';
      }
      this.trees = [];
      for (let tt of res[1]) {
        this.trees.push({
          id: tt.id,
          treeImageColor: tt.treeImageColor,
          treeImageBW: tt.treeImageBW,
          fruitImageColor: tt.fruitImageColor,
          fruitImageBW: tt.fruitImageBW,
          description: this.textHelper.getTextForLanguage(tt.description, lang),
          leaf: this.textHelper.getTextForLanguage(tt.leaf, lang),
          fruit: this.textHelper.getTextForLanguage(tt.fruit, lang),
          trunk: this.textHelper.getTextForLanguage(tt.trunk, lang),
          name: this.textHelper.getTextForLanguage(tt.name, lang),
        });
      }
    });
  }

  selectTree(tree: TreeType) {
    this.currentTree = tree;
    this.currentImageUrl =
      environment.backendUrl + '/treeType/image/' + tree.treeImageBW + '/1000/1000';
    this.currentFruitUrl =
      environment.backendUrl + '/treeType/image/' + this.currentTree.fruitImageBW + '/250/250';
    window.scrollTo(0, 0);
  }

  selectInfoType(infoType: string) {
    this.setImageColors(infoType);
    this.selectedInfoType = infoType;
  }

  setImageColors(infoType: string) {
    if (infoType === 'leaf') {
      this.currentImageUrl =
        environment.backendUrl +
        '/treeType/image/' +
        this.currentTree.treeImageColor +
        '/1000/1000';
      this.currentFruitUrl =
        environment.backendUrl + '/treeType/image/' + this.currentTree.fruitImageBW + '/250/250';
    } else if (infoType === 'fruit') {
      this.currentFruitUrl =
        environment.backendUrl + '/treeType/image/' + this.currentTree.fruitImageColor + '/250/250';
      this.currentImageUrl =
        environment.backendUrl + '/treeType/image/' + this.currentTree.treeImageBW + '/1000/1000';
    } else {
      this.currentImageUrl =
        environment.backendUrl + '/treeType/image/' + this.currentTree.treeImageBW + '/1000/1000';
      this.currentFruitUrl =
        environment.backendUrl + '/treeType/image/' + this.currentTree.fruitImageBW + '/250/250';
    }
  }
}

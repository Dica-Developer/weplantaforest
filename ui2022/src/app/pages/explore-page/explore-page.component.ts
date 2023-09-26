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
  selectedInfoType: string = 'help';
  currentImageUrl: string = '';
  currentFruitUrl: string = '';
  currenttrunkUrl: string = '';
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
          trunkImageColor: tt.trunkImageColor,
          description: this.textHelper.getTextForLanguage(tt.description, lang),
          leaf: this.textHelper.getTextForLanguage(tt.leaf, lang),
          fruit: this.textHelper.getTextForLanguage(tt.fruit, lang),
          trunk: this.textHelper.getTextForLanguage(tt.trunk, lang),
          name: this.textHelper.getTextForLanguage(tt.name, lang),
        });
      }
      this.trees = this.trees.filter((tree) => !tree.name.includes('Strauch'));
      this.trees = this.trees.filter((tree) => !tree.name.includes('Default'));
    });
  }

  selectTree(tree: TreeType) {
    this.currentTree = tree;
    this.currentImageUrl =
      environment.backendUrl + '/treeType/image/' + tree.treeImageBW + '/750/750';
    this.currentFruitUrl =
      environment.backendUrl + '/treeType/image/' + this.currentTree.fruitImageBW + '/250/250';
    window.scrollTo(0, 0);
  }

  selectInfoType(infoType: string) {
    this.setImages(infoType);
    this.selectedInfoType = infoType;
  }

  setImages(infoType: string) {
    let coloredTreeUrl =
      environment.backendUrl + '/treeType/image/' + this.currentTree.treeImageColor + '/750/750';
    let bwTreeUrl =
      environment.backendUrl + '/treeType/image/' + this.currentTree.treeImageBW + '/750/750';
    let coloredFruitUrl =
      environment.backendUrl + '/treeType/image/' + this.currentTree.fruitImageColor + '/250/250';
    let bwFruitUrl =
      environment.backendUrl + '/treeType/image/' + this.currentTree.fruitImageBW + '/250/250';
    let coloredLeafUrl =
      environment.backendUrl + '/treeType/image/' + this.currentTree.fruitImageColor + '/250/250';
    let bwLeafUrl =
      environment.backendUrl + '/treeType/image/' + this.currentTree.fruitImageBW + '/250/250';
    let coloredTrunkUrl =
      environment.backendUrl + '/treeType/image/' + this.currentTree.trunkImageColor + '/250/250';
    // let bwTrunkUrl =
    //   environment.backendUrl + '/treeType/image/' + this.currentTree.trunkImageBW + '/250/250';

    if (infoType === 'leaf') {
      this.currentImageUrl = coloredTreeUrl;
      this.currentFruitUrl = bwFruitUrl;
      // this.currentLeafUrl = coloredLeafUrl
    } else if (infoType === 'fruit') {
      this.currentImageUrl = bwTreeUrl;
      this.currentFruitUrl = coloredFruitUrl;
      // this.currentLeafUrl = bwLeafUrl
    } else if (infoType === 'trunk') {
      this.currentImageUrl = bwTreeUrl;
      this.currentFruitUrl = coloredTrunkUrl;
      // this.currentLeafUrl = bwLeafUrl
    } else {
      this.currentImageUrl = bwTreeUrl;
      this.currentFruitUrl = bwFruitUrl;
      // this.currentLeafUrl = bwLeafUrl
    }
  }
}

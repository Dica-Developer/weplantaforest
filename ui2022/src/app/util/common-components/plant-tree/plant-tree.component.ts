import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { AppState } from '../../../store/app.state';
import { selectProjectsForCustomPlanting } from '../../../store/plant.store';
import { environment } from '../../../../environments/environment';
import {
  ProfileDetails,
  selectProfileDetails,
  selectUserLanguage,
} from '../../../store/profile.store';
import { TextHelper } from '../../text.helper';
import { ActiveProjectArticle } from '../../../store/project.store';
import { addPlantbagItem, resetPlantbag } from '../../../store/plantbag.store';

@Component({
  selector: 'app-plant-tree',
  templateUrl: './plant-tree.component.html',
  styleUrls: ['./plant-tree.component.scss'],
})
export class PlantTreeComponent implements OnInit, OnDestroy {
  hover: boolean;
  trees: { article: ActiveProjectArticle; name: string; urlColor: string; urlBW: string }[] = [];

  activeProjects$: Observable<any> = this.store.select(selectProjectsForCustomPlanting);
  profileDetails$: Observable<ProfileDetails> = this.store.select(selectProfileDetails);
  language$: Observable<string> = this.store.select(selectUserLanguage);

  combinedSub: Subscription;

  constructor(private store: Store<AppState>, private textHelper: TextHelper) {}

  ngOnInit(): void {
    this.combinedSub = combineLatest([
      this.activeProjects$,
      this.profileDetails$,
      this.language$,
    ]).subscribe(([activeProjects, profileDetails, language]) => {
      this.trees = [];
      if (activeProjects && activeProjects.length > 0) {
        for (const project of activeProjects) {
          if (!project.articles || project.articles.length === 0) {
            // only start creating trees if there are articles laoded in every project
            return;
          }
        }
        const projectCount = activeProjects.length;

        for (let i = 0; i < 3; i++) {
          const randomProjectIndex = Math.floor(Math.random() * projectCount);
          const articleCount = activeProjects[randomProjectIndex].articles.length;
          const randomArticleIndex = Math.floor(Math.random() * articleCount);
          const article = activeProjects[randomProjectIndex].articles[randomArticleIndex];
          this.trees.push({
            article,
            name: this.textHelper.getTextForLanguage(
              article.treeType.name,
              profileDetails?.lang ?? language,
            ),
            urlColor:
              environment.backendUrl +
              '/treeType/image/' +
              article.treeType.treeImageColor +
              '/1000/1000',
            urlBW:
              environment.backendUrl +
              '/treeType/image/' +
              article.treeType.treeImageBW +
              '/1000/1000',
          });
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.combinedSub?.unsubscribe();
  }

  addTreeToPlantBag(tree: {
    article: ActiveProjectArticle;
    name: string;
    urlColor: string;
    urlBW: string;
  }) {
    this.store.dispatch(resetPlantbag());
    const item = { article: tree.article, amount: 5 };
    this.store.dispatch(addPlantbagItem({ item }));
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { AppState } from '../../../store/app.state';
import { selectProjectsForCustomPlanting } from '../../../store/plant.store';
import { environment } from '../../../../environments/environment';
import {
  ProfileDetails,
  selectProfileDetails,
} from '../../../store/profile.store';
import { TextHelper } from 'src/app/util/helper/text.helper';
import { ActiveProjectArticle } from '../../../store/project.store';
import { addPlantbagItem, resetPlantbag } from '../../../store/plantbag.store';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { LanguageHelper } from '../../helper/language.helper';
import { getAllTrees, selectAllTreeCount } from 'src/app/store/tree.store';
import { TreeIconComponent } from '../icons/tree-icon/tree-icon.component';

@Component({
  selector: 'app-plant-tree',
  templateUrl: './plant-tree.component.html',
  styleUrls: ['./plant-tree.component.scss'],
  standalone: true,
  imports: [
    ButtonComponent,
    RouterLink,
    NgFor,
    TranslateModule,
    TreeIconComponent,
    AsyncPipe
  ],
})
export class PlantTreeComponent implements OnInit, OnDestroy {
  hover: boolean;
  trees: { article: ActiveProjectArticle; name: string; urlColor: string; urlBW: string }[] = [];

  activeProjects$: Observable<any> = this.store.select(selectProjectsForCustomPlanting);
  profileDetails$: Observable<ProfileDetails> = this.store.select(selectProfileDetails);

  combinedSub: Subscription;
  treeCount$ = this.store.select(selectAllTreeCount);


  constructor(
    private store: Store<AppState>,
    private textHelper: TextHelper,
    private router: Router,
    private lanugageHelper: LanguageHelper,
  ) {
    this.store.dispatch(getAllTrees());
  }

  ngOnInit(): void {
    this.combinedSub = combineLatest([
      this.activeProjects$,
      this.profileDetails$,
    ]).subscribe(([activeProjects, profileDetails]) => {
        this.trees = [];
        const projects = [];
        if (activeProjects && activeProjects.length > 0) {
          for (const project of activeProjects) {
            if (!project.articles || project.articles.length === 0) {
              // only start creating trees if there are articles loaded in every project
              return;
            }
          }

          // shallow copies of the projects and their articles are needed in order to remove them later
          for (const project of activeProjects) {
            const articles = [...project.articles];
            projects.push({ ...project, articles });
          }

          for (let i = 0; i < 3; i++) {
            const projectCount = projects.length;
            const randomProjectIndex = Math.floor(Math.random() * projectCount);
            const articleCount = projects[randomProjectIndex].articles.length;
            const randomArticleIndex = Math.floor(Math.random() * articleCount);
            const article = projects[randomProjectIndex].articles[randomArticleIndex];
            if (article.amount - article.alreadyPlanted > 0) {
              this.trees.push({
                article,
                name: this.textHelper.getTextForLanguage(
                  article.treeType.name,
                  profileDetails?.lang ?? this.lanugageHelper.getUserLanguage(),
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
            // remove article from project so it can't be selected again
            projects[randomProjectIndex].articles.splice(randomArticleIndex, 1);
            if(projects[randomProjectIndex].articles.length === 0) {
              // remove project if all articles have been used
              projects.splice(randomProjectIndex, 1);
            }
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
    this.router.navigate(['/plantbag']);
  }
}

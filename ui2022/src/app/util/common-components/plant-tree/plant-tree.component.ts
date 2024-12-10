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
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { LanguageHelper } from '../../helper/language.helper';
import { getAllTrees, selectAllTreeCount } from 'src/app/store/tree.store';
import { TreeIconComponent } from '../icons/tree-icon/tree-icon.component';
import { PlatformHelper } from '../../helper/platform.helper';

@Component({
  selector: 'app-plant-tree',
  templateUrl: './plant-tree.component.html',
  styleUrls: ['./plant-tree.component.scss'],
  standalone: true,
  imports: [
    ButtonComponent,
    RouterLink,
    NgFor,
    NgIf,
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
    private platformHelper: PlatformHelper,
    private lanugageHelper: LanguageHelper,
  ) {
    if (this.platformHelper.isBrowser) {
      this.store.dispatch(getAllTrees());
    }
  }

  ngOnInit(): void {
    this.combinedSub = combineLatest([
      this.activeProjects$,
      this.profileDetails$,
    ]).subscribe(([activeProjects, profileDetails]) => {
        this.trees = [];
        const projects = [];
        if (activeProjects && activeProjects.length > 0) {
          for (let project of activeProjects) {
            if (this.checkIfTreesAreAvailable(project)) {
              projects.push(project)
            }
          }
          // sort projects by trees available
          projects.sort((a, b) => {
            const availableTreesA = a.amountOfMaximumTreesToPlant - a.amountOfPlantedTrees;
            const availableTreesB = b.amountOfMaximumTreesToPlant - b.amountOfPlantedTrees;
            return availableTreesB - availableTreesA; // Descending order
          });

          if (projects.length < 3) {
            for (let i = 0; i < projects.length; i++) {
              this.createTree(projects, profileDetails, i)
            }
          } else {
            for (let i = 0; i < 3; i++) {
              this.createTree(projects, profileDetails, i)
            }
          }
        }
      });
  }

  checkIfTreesAreAvailable(project) {
    const availableTrees = project.amountOfMaximumTreesToPlant - project.amountOfPlantedTrees
    if (availableTrees === 0) {
      return false
    } else {
      return true
    }
  }

  createTree(projects, profileDetails, i) {
    if (projects[i]?.articles) {
      for (let article of projects[i]?.articles) {
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
          break;
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.combinedSub?.unsubscribe();
  }

  routeToPlanting() {
    this.router.navigate(['/plant'])
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

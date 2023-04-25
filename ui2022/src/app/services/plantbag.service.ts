import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {
  ProjectArticleForCustomPlanting,
  ProjectForCustomPlanting,
  SimplePlantProposal,
} from '../store/plant.store';

@Injectable({
  providedIn: 'root',
})
export class PlantbagService {
  constructor(private http: HttpClient) {}

  validatePlantbag(request: any) {
    return this.http.post(environment.backendUrl + '/validatePlantBag', request);
  }

  plantForUser(request: any) {
    return this.http.post(environment.backendUrl + '/plantForUser/', request);
  }

  plantSelf(request: any) {
    return this.http.post(environment.backendUrl + '/plantSelf/', request);
  }

  uploadPlantSelfImage(treeId: number, image: any) {
    const formData = new FormData();
    formData.append('treeId', treeId + '');
    formData.append('file', image);
    return this.http.post(environment.backendUrl + '/plantSelf/upload', formData);
  }

  getPlantProposal(amountOfTrees: number) {
    return this.http.get<SimplePlantProposal>(
      environment.backendUrl + '/simplePlantProposalForTrees/' + amountOfTrees,
    );
  }

  getProjectsForCustomPlanting() {
    return this.http.get<ProjectForCustomPlanting[]>(
      environment.backendUrl + '/reports/activeProjects',
    );
  }

  getArticlesForCustomPlantProject(projectName: string) {
    return this.http.get<ProjectArticleForCustomPlanting[]>(
      environment.backendUrl + '/project/articles?projectName=' + projectName,
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SimplePlantProposal } from '../store/plant.store';

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

  getPlantProposal(amountOfTrees: number) {
    return this.http.get<SimplePlantProposal>(
      environment.backendUrl + '/simplePlantProposalForTrees/' + amountOfTrees,
    );
  }
}

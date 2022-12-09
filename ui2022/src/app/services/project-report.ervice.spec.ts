import { TestBed } from '@angular/core/testing';
import { ProjectReportService } from './project-report.service';

describe('ProjectReportService', () => {
  let service: ProjectReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

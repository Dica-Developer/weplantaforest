package org.dicadeveloper.weplantaforest.reports.projects;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProjectReportData {

    long projectId;

    String projectName;
    String projectImageFileName;
    String description;

    Float longitude;
    Float latitude;

    long amountOfMaximumTreesToPlant;
    long amountOfPlantedTrees;

    boolean active;

}

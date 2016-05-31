package org.dicadeveloper.weplantaforest.reports.projects;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProjectReportData {

    String projectName;
    String description;

    Float longitude;
    Float latitude;

    long amountOfMaximumTreesToPlant;
    long amountOfPlantedTrees;
    
    boolean active;

}

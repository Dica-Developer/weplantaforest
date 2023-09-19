package org.dicadeveloper.weplantaforest.reports.projects;

import java.util.SortedSet;

import org.dicadeveloper.weplantaforest.projects.AreaPositions;

import lombok.Getter;

@Getter
public class ProjectReportData {

    public ProjectReportData(long projectId, String projectName, String projectImageFileName, String description, Float longitude, Float latitude, long amountOfMaximumTreesToPlant,
            long amountOfPlantedTrees, boolean active) {
        this.projectId = projectId;
        this.projectName = projectName;
        this.projectImageFileName = projectImageFileName;
        this.description = description;
        this.longitude = longitude;
        this.latitude = latitude;
        this.amountOfMaximumTreesToPlant = amountOfMaximumTreesToPlant;
        if (amountOfPlantedTrees > amountOfMaximumTreesToPlant) {
            this.amountOfPlantedTrees = amountOfMaximumTreesToPlant;
        } else {
            this.amountOfPlantedTrees = amountOfPlantedTrees;
        }
        this.active = active;
    }

    long projectId;

    String projectName;
    String projectImageFileName;
    String description;

    Float longitude;
    Float latitude;

    long amountOfMaximumTreesToPlant;
    long amountOfPlantedTrees;

    boolean active;

    SortedSet<AreaPositions> positions;
}

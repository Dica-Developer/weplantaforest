package org.dicadeveloper.weplantaforest.reports.projects;

import java.util.ArrayList;
import java.util.List;

import org.dicadeveloper.weplantaforest.projects.ProjectImage;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectReportExtendedData {

    public ProjectReportExtendedData() {
        images = new ArrayList<ProjectReportExtendedData.ProjectImageData>();
    }

    ProjectReportData projectReportData;

    List<ProjectImageData> images;

    protected void setImages(List<ProjectImage> imageEntities) {
        for (ProjectImage projectImage : imageEntities) {
            ProjectImageData projectImageData = new ProjectImageData(projectImage.getTitle(), projectImage.getDescription(), projectImage.getImageFileName(), projectImage.getDate());
            images.add(projectImageData);
        }
    }

    @Getter
    @AllArgsConstructor
    public static class ProjectImageData {

        String title;
        String description;
        String imageFileName;
        long date;

    }

}

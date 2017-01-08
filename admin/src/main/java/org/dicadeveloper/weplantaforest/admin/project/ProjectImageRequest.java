package org.dicadeveloper.weplantaforest.admin.project;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ProjectImageRequest {
    
    public ProjectImageRequest(){
        
    }
    
    private Long imageId; 
    private String title;
    private String description;    
    private Long projectId;

}

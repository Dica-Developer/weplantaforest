package org.dicadeveloper.weplantaforest.reports.articles;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ArticleData {
    
    long id;

    String title;

    String intro;
    
    long createdOn;
    
    long ownerId;
    
    String ownerName;

}

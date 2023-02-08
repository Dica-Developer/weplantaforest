package org.dicadeveloper.weplantaforest.search;


import java.util.ArrayList;
import java.util.List;

import lombok.Getter;

@Getter
public class SearchResponseDto {
  public List<IdName> teams;
  public List<IdName> user;
  public List<IdName> projects;

  SearchResponseDto() {
    this.teams = new ArrayList<IdName>();
    this.user = new ArrayList<IdName>();
    this.projects = new ArrayList<IdName>();
  }
}

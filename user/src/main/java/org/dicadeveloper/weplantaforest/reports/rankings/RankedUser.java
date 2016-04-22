package org.dicadeveloper.weplantaforest.reports.rankings;

import org.springframework.hateoas.ResourceSupport;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RankedUser extends ResourceSupport{

    String name;
    Long amount;
    Double co2Saved;

}

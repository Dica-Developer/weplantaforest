package org.dicadeveloper.weplantaforest.admin.views;

import org.springframework.orm.jpa.support.OpenEntityManagerInViewFilter;
import org.springframework.stereotype.Component;

@Component
public class ViewSessionFilter extends OpenEntityManagerInViewFilter {

}

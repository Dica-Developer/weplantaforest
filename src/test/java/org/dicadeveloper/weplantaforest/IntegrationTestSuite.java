package org.dicadeveloper.weplantaforest;

import org.dicadeveloper.weplantaforest.reports.co2.Co2ServiceIntegrationTest;
import org.dicadeveloper.weplantaforest.trees.TreeControllerIntegrationTest;
import org.dicadeveloper.weplantaforest.treetypes.TreeTypeControllerIntegrationTest;
import org.dicadeveloper.weplantaforest.treetypes.TreeTypeServiceImplIntegrationTest;
import org.junit.experimental.categories.Categories;
import org.junit.experimental.categories.Categories.IncludeCategory;
import org.junit.runner.RunWith;
import org.junit.runners.Suite.SuiteClasses;

@RunWith(Categories.class)
@IncludeCategory(CategoryIntegration.class)
@SuiteClasses({ TreeTypeControllerIntegrationTest.class, TreeControllerIntegrationTest.class, TreeTypeServiceImplIntegrationTest.class, Co2ServiceIntegrationTest.class })
public class IntegrationTestSuite {

}

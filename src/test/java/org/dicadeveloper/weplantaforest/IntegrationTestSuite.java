package org.dicadeveloper.weplantaforest;

import org.dicadeveloper.weplantaforest.controller.TreeTypesControllerIntegrationTest;
import org.dicadeveloper.weplantaforest.controller.TreesControllerIntegrationTest;
import org.dicadeveloper.weplantaforest.services.TreeTypeServiceImplIntegrationTest;
import org.junit.experimental.categories.Categories;
import org.junit.experimental.categories.Categories.IncludeCategory;
import org.junit.runner.RunWith;
import org.junit.runners.Suite.SuiteClasses;

@RunWith(Categories.class)
@IncludeCategory(CategoryIntegration.class)
@SuiteClasses({ TreeTypesControllerIntegrationTest.class, TreesControllerIntegrationTest.class, TreeTypeServiceImplIntegrationTest.class })
public class IntegrationTestSuite {

}

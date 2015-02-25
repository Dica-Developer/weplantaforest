package org.dicadeveloper.weplantaforest;

import org.dicadeveloper.weplantaforest.reports.co2.Co2ServiceTest;
import org.junit.experimental.categories.Categories;
import org.junit.experimental.categories.Categories.ExcludeCategory;
import org.junit.runner.RunWith;
import org.junit.runners.Suite.SuiteClasses;

@RunWith(Categories.class)
@ExcludeCategory(CategoryIntegration.class)
@SuiteClasses({ Co2ServiceTest.class })
public class UnitTestSuite {

}

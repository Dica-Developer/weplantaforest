package org.dicadeveloper.weplantaforest.planting.self;

import static org.assertj.core.api.Assertions.assertThat;

import org.dicadeveloper.weplantaforest.common.support.TimeConstants;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
import org.dicadeveloper.weplantaforest.trees.Tree;
import org.dicadeveloper.weplantaforest.user.UserRepository;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class SelfPlantDataToTreeConverterTest {

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private DbInjecter _dbInjecter;

    @Autowired
    private SelfPlantDataToTreeConverter _selfPlantDataToTreeConverter;
    
    @Autowired
    private UserRepository _userRepository;

    @Test
    public void convertFromSelfPantDataToTree() {
        _dbInjecter.injectUser("Adam");
        _dbInjecter.injectTreeType("wood", "this is wood", 0.5);
        long plantedOn = System.currentTimeMillis() - TimeConstants.YEAR_IN_MILLISECONDS;

        SelfPlantData selfPlantData = new SelfPlantData();

//        selfPlantData.setOwner("Adam");
        selfPlantData.setPlantedOn(plantedOn);
        selfPlantData.setAmount(10);
        selfPlantData.setTreeTypeId(1L);
        selfPlantData.setDescription("I planted a tree by myself in my garden.");
        selfPlantData.setLongitude(1.0f);
        selfPlantData.setLatitude(2.0f);

        long timeNow = System.currentTimeMillis();
        Tree tree = _selfPlantDataToTreeConverter.convertSelfPlantDataToTree(selfPlantData, _userRepository.findById(1L).orElse(null));

        assertThat(tree.getOwner().getName()).isEqualTo("Adam");
        assertThat(tree.getAmount()).isEqualTo(10);
        assertThat(tree.getPlantedOn()).isEqualTo(plantedOn);
        assertThat(tree.getSubmittedOn()).isStrictlyBetween(timeNow - 10000, timeNow + 10000);
        assertThat(tree.getDescription()).isEqualTo("I planted a tree by myself in my garden.");
        assertThat(tree.getTreeType().getName()).isEqualTo("wood");
        assertThat(tree.getLongitude()).isEqualTo(1.0f);
        assertThat(tree.getLatitude()).isEqualTo(2.0f);
    }

}
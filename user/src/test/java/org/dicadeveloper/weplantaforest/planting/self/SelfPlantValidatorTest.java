package org.dicadeveloper.weplantaforest.planting.self;

import static org.assertj.core.api.Assertions.assertThat;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = WeplantaforestApplication.class)
@IntegrationTest({ "spring.profiles.active=test" })
public class SelfPlantValidatorTest {

    @Autowired
    private SelfPlantValidator _selfPlantValidator;

    @Test
    public void testValidateSelfPlantDataToTrue() {
        SelfPlantData selfPlantData = new SelfPlantData();
        selfPlantData.setAmount(10);

        boolean isValid = _selfPlantValidator.isSelfPlantDataValid(selfPlantData);

        assertThat(isValid).isTrue();
    }

    @Test
    public void testValidateSelfPlantDataToFalse() {
        SelfPlantData selfPlantData = new SelfPlantData();
        selfPlantData.setAmount(11);

        boolean isValid = _selfPlantValidator.isSelfPlantDataValid(selfPlantData);

        assertThat(isValid).isFalse();
    }
}

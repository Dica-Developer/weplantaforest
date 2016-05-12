package org.dicadeveloper.weplantaforest.admin.codes;

import static org.assertj.core.api.Assertions.assertThat;

import java.math.BigDecimal;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.testsupport.CleanDbRule;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@SpringApplicationConfiguration(classes = WeplantaforestApplication.class)
@IntegrationTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class CartItemTest {

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Test
    public void testBigDecimalObjectsNotNull() {
        CartItem cartItem = new CartItem();

        assertThat(cartItem.getBasePricePerPiece()).isNotNull();
        assertThat(cartItem.getBasePricePerPiece()).isEqualTo(BigDecimal.ZERO);
        assertThat(cartItem.getScontoPerPiece()).isNotNull();
        assertThat(cartItem.getScontoPerPiece()).isEqualTo(BigDecimal.ZERO);
        assertThat(cartItem.getFundingPerPiece()).isNotNull();
        assertThat(cartItem.getFundingPerPiece()).isEqualTo(BigDecimal.ZERO);
        assertThat(cartItem.getTotalPrice()).isNotNull();
        assertThat(cartItem.getTotalPrice()).isEqualTo(BigDecimal.ZERO);
    }

    @Test
    public void testBigDecimalObjectsNoDefaultWhenSetAnotherValue() {
        CartItem cartItem = new CartItem();

        cartItem.setBasePricePerPiece(BigDecimal.TEN);
        cartItem.setFundingPerPiece(BigDecimal.TEN);
        cartItem.setScontoPerPiece(BigDecimal.TEN);
        cartItem.setTotalPrice(BigDecimal.TEN);

        assertThat(cartItem.getBasePricePerPiece()).isEqualTo(BigDecimal.TEN);
        assertThat(cartItem.getScontoPerPiece()).isEqualTo(BigDecimal.TEN);
        assertThat(cartItem.getFundingPerPiece()).isEqualTo(BigDecimal.TEN);
        assertThat(cartItem.getTotalPrice()).isEqualTo(BigDecimal.TEN);
    }

}

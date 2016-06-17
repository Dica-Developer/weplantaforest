package org.dicadeveloper.weplantaforest.gift;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.gift.Gift.Status;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
import org.junit.Before;
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
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@SpringApplicationConfiguration(classes = WeplantaforestApplication.class)
@IntegrationTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class GiftControllerTest {
    private MockMvc mockMvc;

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private DbInjecter _dbInjecter;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Before
    public void setup() {
        this.mockMvc = webAppContextSetup(this.webApplicationContext).build();
    }

    @Test
    public void testFindGiftsByConsignor() throws Exception {
        _dbInjecter.injectUser("Consignore");
        _dbInjecter.injectUser("otherUser");

        String code1 = _dbInjecter.injectGiftWithCode("Consignore", Status.NEW);
        String code2 = _dbInjecter.injectGiftWithCode("Consignore", "otherUser", Status.REDEEMED);
        String code3 = _dbInjecter.injectGiftWithCode("Consignore", Status.UNREDEEMED);

        _dbInjecter.injectGiftWithCode("otherUser", Status.UNREDEEMED);

        this.mockMvc.perform(get((Uris.GIFTS_BY_CONSIGNOR + "{id}"), 1).accept("application/json"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.[0].consignor.name").value("Consignore"))
                    .andExpect(jsonPath("$.[0].recipient").isEmpty())
                    .andExpect(jsonPath("$.[0].code.code").value(code1))
                    .andExpect(jsonPath("$.[0].status").value("NEW"))
                    .andExpect(jsonPath("$.[1].consignor.name").value("Consignore"))
                    .andExpect(jsonPath("$.[1].recipient.name").value("otherUser"))
                    .andExpect(jsonPath("$.[1].code.code").value(code2))
                    .andExpect(jsonPath("$.[1].status").value("REDEEMED"))
                    .andExpect(jsonPath("$.[2].consignor.name").value("Consignore"))
                    .andExpect(jsonPath("$.[2].recipient").isEmpty())
                    .andExpect(jsonPath("$.[2].code.code").value(code3))
                    .andExpect(jsonPath("$.[2].status").value("UNREDEEMED"));
    }

    @Test
    public void testFindGiftsByRecipient() throws Exception {
        _dbInjecter.injectUser("Consignore");
        _dbInjecter.injectUser("otherUser");

        String code1 = _dbInjecter.injectGiftWithCode("Consignore", "otherUser", Status.REDEEMED);

        _dbInjecter.injectGiftWithCode("Consignore", Status.NEW);
        _dbInjecter.injectGiftWithCode("Consignore", Status.UNREDEEMED);
        _dbInjecter.injectGiftWithCode("otherUser", Status.UNREDEEMED);

        this.mockMvc.perform(get((Uris.GIFTS_BY_RECIPIENT + "{id}"), 2).accept("application/json"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.[0].consignor.name").value("Consignore"))
                    .andExpect(jsonPath("$.[0].recipient.name").value("otherUser"))
                    .andExpect(jsonPath("$.[0].code.code").value(code1))
                    .andExpect(jsonPath("$.[0].status").value("REDEEMED"));
    }

}

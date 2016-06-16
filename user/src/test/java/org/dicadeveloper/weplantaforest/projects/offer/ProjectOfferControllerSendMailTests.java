package org.dicadeveloper.weplantaforest.projects.offer;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import java.util.Date;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.common.testSupport.TestUtil;
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
public class ProjectOfferControllerSendMailTests {
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
    public void testSendprojectOffer() throws Exception {
        ProjectOfferData offer = new ProjectOfferData();
        offer.first = "Hans";
        offer.name = "Wurst";
        offer.isAfforestation = true;
        offer.isLeasing = false;
        offer.isSelling = true;
        offer.Lease = "";
        offer.location = "da und dort";
        offer.mail = "hans.wurst@daundort.de";
        offer.owner = "Wurst Hans";
        offer.purpose = "liegt brach";
        offer.size = "1m²";
        offer.comment = "test on" + new Date(System.currentTimeMillis());

        this.mockMvc.perform(post("/project/offer").contentType(TestUtil.APPLICATION_JSON_UTF8)
                                                   .content(TestUtil.convertObjectToJsonBytes(offer)))
                    .andExpect(status().isOk());
    }
    
    @Test
    public void testSendprojectOfferWithUserId() throws Exception {
        _dbInjecter.injectUser("Adam");
        
        ProjectOfferData offer = new ProjectOfferData();
        offer.userId = 1L;
        offer.first = "Hans";
        offer.name = "Wurst";
        offer.isAfforestation = true;
        offer.isLeasing = false;
        offer.isSelling = true;
        offer.Lease = "";
        offer.location = "da und dort";
        offer.mail = "hans.wurst@daundort.de";
        offer.owner = "Wurst Hans";
        offer.purpose = "liegt brach";
        offer.size = "1m²";
        offer.comment = "test on" + new Date(System.currentTimeMillis());

        this.mockMvc.perform(post("/project/offer").contentType(TestUtil.APPLICATION_JSON_UTF8)
                                                   .content(TestUtil.convertObjectToJsonBytes(offer)))
                    .andExpect(status().isOk());
    }
}

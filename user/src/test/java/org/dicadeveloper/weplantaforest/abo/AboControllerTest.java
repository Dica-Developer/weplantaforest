package org.dicadeveloper.weplantaforest.abo;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import java.io.IOException;

import org.dicadeveloper.weplantaforest.abo.Abo.Period;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.common.testSupport.TestUtil;
import org.dicadeveloper.weplantaforest.planting.plantbag.PlantBag;
import org.dicadeveloper.weplantaforest.security.TokenAuthenticationService;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
import org.dicadeveloper.weplantaforest.testsupport.PlantBagBuilder;
import org.dicadeveloper.weplantaforest.user.UserRepository;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@SpringBootTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_CLASS)
public class AboControllerTest {
    private static MockMvc mockMvc;

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private DbInjecter _dbInjecter;

    @Autowired
    private WebApplicationContext webApplicationContext;

    static long createdOn;
    static boolean entitiesInjected = false;

    @Autowired
    private AboRepository _aboRepository;

    @Autowired
    private TokenAuthenticationService _tokenAuthenticationService;

    @Autowired
    private UserRepository _userRepository;

    PlantBagBuilder plantBagBuilder = new PlantBagBuilder();

    @Before
    public void setup() {
        if (!entitiesInjected) {
            mockMvc = webAppContextSetup(this.webApplicationContext).build();

            createdOn = System.currentTimeMillis();
            _dbInjecter.injectUser("Adam");
            _dbInjecter.injectUser("Bert");
            _dbInjecter.injectUser("AboEditor");

            _dbInjecter.injectTreeType("wood", "this is wood", 0.5);
            _dbInjecter.injectProject("Project A", "Adam", "desc", true, 1.0f, 1.0f);
            _dbInjecter.injectProjectArticle("wood", "Project A", 10, 3.0, 0.5);

            _dbInjecter.injectAbo("Adam", true, 1, Period.WEEKLY, createdOn);
            _dbInjecter.injectAbo("AboEditor", true, 1, Period.WEEKLY, createdOn);
            _dbInjecter.injectAbo("AboEditor", true, 1, Period.WEEKLY, createdOn);

            entitiesInjected = true;
        }
    }

    @Test
    public void testGetAbosByUserId() throws Exception {
        mockMvc.perform(get((Uris.ABOS_BY_USER + "{userId}"), 1).accept("application/json"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.[0].id").value(1))
               .andExpect(jsonPath("$.[0].amount").value(1))
               .andExpect(jsonPath("$.[0].period").value("WEEKLY"))
               .andExpect(jsonPath("$.[0].timeStamp").value(createdOn))
               .andExpect(jsonPath("$.[0].last").isEmpty())
               .andExpect(jsonPath("$.[0].active").value(true));
    }

    @Test
    public void testCreateAboStatusOk() throws IOException, Exception {
        String userToken = _tokenAuthenticationService.getTokenFromUser(_userRepository.findByName("Bert"));

        AboRequestData aboRequest = new AboRequestData();
        aboRequest.amount = 1;
        aboRequest.period = "WEEKLY";

        PlantBag plantBag = plantBagBuilder.initializeProjectDataAndAddToPlantBag("Project A")
                                           .createPlantItemAndAddToPlantBag(3, 300, "wood", "Project A")
                                           .build();

        aboRequest.plantBag = plantBag;

        mockMvc.perform(post(Uris.ABO_CREATE).contentType(TestUtil.APPLICATION_JSON_UTF8)
                                             .header("X-AUTH-TOKEN", userToken)
                                             .content(TestUtil.convertObjectToJsonBytes(aboRequest)))
               .andExpect(status().isOk());
    }

    @Test
    public void testCreateAboStatusBadRequestCauseOfNotEnoughTreesToPlant() throws IOException, Exception {
        String userToken = _tokenAuthenticationService.getTokenFromUser(_userRepository.findByName("Bert"));
        AboRequestData aboRequest = new AboRequestData();
        aboRequest.amount = 1;
        aboRequest.period = "WEEKLY";

        PlantBag plantBag = plantBagBuilder.initializeProjectDataAndAddToPlantBag("Project A")
                                           .createPlantItemAndAddToPlantBag(11, 300, "wood", "Project A")
                                           .build();

        aboRequest.plantBag = plantBag;

        mockMvc.perform(post(Uris.ABO_CREATE).contentType(TestUtil.APPLICATION_JSON_UTF8)
                                             .header("X-AUTH-TOKEN", userToken)
                                             .content(TestUtil.convertObjectToJsonBytes(aboRequest)))
               .andExpect(status().isBadRequest());
    }

    @Test
    public void testEditAbo() throws IOException, Exception {
        AboEditData aboEditData = new AboEditData();
        aboEditData.aboId = 2;
        aboEditData.amount = 3;
        aboEditData.period = "MONTHLY";

        mockMvc.perform(post(Uris.ABO_EDIT).contentType(TestUtil.APPLICATION_JSON_UTF8)
                                           .content(TestUtil.convertObjectToJsonBytes(aboEditData)))
               .andExpect(status().isOk());

        Abo editedAbo = _aboRepository.findOne(2L);

        assertThat(editedAbo.getAmount()).isEqualTo(3);
        assertThat(editedAbo.getPeriod()).isEqualTo(Period.MONTHLY);

    }

    @Test
    public void testCancelAbo() throws IOException, Exception {
        mockMvc.perform(post(Uris.ABO_CANCEL).contentType(TestUtil.APPLICATION_JSON_UTF8)
                                             .param("aboId", "3"))
               .andExpect(status().isOk());

        Abo editedAbo = _aboRepository.findOne(3L);
        assertThat(editedAbo.isActive()).isFalse();
    }
}

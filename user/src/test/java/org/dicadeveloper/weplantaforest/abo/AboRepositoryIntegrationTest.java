package org.dicadeveloper.weplantaforest.abo;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.abo.Abo.Period;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = WeplantaforestApplication.class)
@IntegrationTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class AboRepositoryIntegrationTest {
    
    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    public DbInjecter _dbInjecter;
    
    @Autowired
    public AboRepository _aboRepository;
    
    
    @Test
    public void testFindAbosByUserId(){
        long createdOn = System.currentTimeMillis();
        _dbInjecter.injectUser("Adam");
        _dbInjecter.injectAbo("Adam", true, 1, Period.WEEKLY, createdOn);
        
        List<Abo> savedAbos = _aboRepository.findAbosByUserId(1L);
        
        assertThat(savedAbos.get(0).getAmount()).isEqualTo(1);
        assertThat(savedAbos.get(0).isActive()).isEqualTo(true);
        assertThat(savedAbos.get(0).getPeriod()).isEqualTo(Period.WEEKLY);
        assertThat(savedAbos.get(0).getTimeStamp()).isEqualTo(createdOn);
        assertThat(savedAbos.get(0).getUser().getName()).isEqualTo("Adam");
    }
    
    @Test
    public void testFindActiveAbos(){
        long createdOn = System.currentTimeMillis();
        _dbInjecter.injectUser("Adam");
        _dbInjecter.injectAbo("Adam", true, 1, Period.WEEKLY, createdOn);
        _dbInjecter.injectAbo("Adam", true, 1, Period.WEEKLY, createdOn);
        _dbInjecter.injectAbo("Adam", false, 1, Period.WEEKLY, createdOn);
        
        List<Abo> activeAbos = _aboRepository.findAllActiveAbos();
        
        assertThat(activeAbos.size()).isEqualTo(2);
    }

}

package org.dicadeveloper.weplantaforest.reports.rankings;

import static org.assertj.core.api.Assertions.assertThat;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.testsupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
import org.dicadeveloper.weplantaforest.trees.Tree;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = WeplantaforestApplication.class)
@IntegrationTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class TreeRankingRepositoryIntegrationTest {

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;
    
    @Autowired
    private DbInjecter dbInjecter;

    @Autowired
    private TreeRankingRepository _treeRankingRepository;
    
    @Test
    public void testGetLastPlantedTrees() {
        dbInjecter.injectUser("Bert");
        dbInjecter.injectUser("Horst");
        dbInjecter.injectUser("Franz");
        
        dbInjecter.injectTreeType("wood", "desc", 0.5);
       
        dbInjecter.injectTree("wood", "Bert", 10, 30000L);
        dbInjecter.injectTree("wood", "Horst", 10, 20000L);
        dbInjecter.injectTree("wood", "Franz", 10, 10000L);

        final PageRequest page1 = new PageRequest(0, 20);
        Page<Tree> trees = _treeRankingRepository.findLastPlantedTrees(page1);

        assertThat(trees).isNotNull();
        assertThat(trees.getTotalElements()).isEqualTo(3);
        assertThat(trees.getContent().get(0).getPlantedOn()).isEqualTo(30000L);
        assertThat(trees.getContent().get(1).getPlantedOn()).isEqualTo(20000L);
        assertThat(trees.getContent().get(2).getPlantedOn()).isEqualTo(10000L);
    }
    
}

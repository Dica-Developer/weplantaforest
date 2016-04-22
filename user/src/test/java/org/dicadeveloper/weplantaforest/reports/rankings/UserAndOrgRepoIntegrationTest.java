package org.dicadeveloper.weplantaforest.reports.rankings;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Date;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.testsupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.trees.Tree;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.dicadeveloper.weplantaforest.trees.User;
import org.dicadeveloper.weplantaforest.trees.UserRepository;
import org.dicadeveloper.weplantaforest.treetypes.TreeType;
import org.dicadeveloper.weplantaforest.treetypes.TreeTypeRepository;
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
public class UserAndOrgRepoIntegrationTest {

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private UserRepository _uUserRepository;

    @Autowired
    private TreeTypeRepository _treeTypeRepository;

    @Autowired
    private TreeRepository _treeRepository;

    @Autowired
    private UserAndOrgRankingRepository userAndOrgRankingRepo;

    @Test
    public void testGetBestUserRanking() {
        TreeType treeTypeDto = new TreeType();
        treeTypeDto.setName("wood");
        treeTypeDto.setDescription("description");
        treeTypeDto.setAnnualCo2SavingInTons(0.5);
        _treeTypeRepository.save(treeTypeDto);

        User userDto = new User();
        userDto.setName("Bert");
        _uUserRepository.save(userDto);

        long timeOfPlanting = System.currentTimeMillis();
        Tree tree = new Tree();
        tree.setLatitude(0);
        tree.setLongitude(0);
        tree.setAmount(10);
        tree.setTreeType(treeTypeDto);
        tree.setPlantedOn(new Date(timeOfPlanting).getTime());
        tree.setSubmittedOn(new Date(timeOfPlanting).getTime());
        tree.setOwner(userDto);
        _treeRepository.save(tree);

        Page<RankedUser> ruList = userAndOrgRankingRepo.getBestUser(System.currentTimeMillis(), new PageRequest(0, 5));

        assertThat(ruList).isNotNull();
        assertThat(ruList.getContent().get(0).getName()).isEqualTo("Bert");
        assertThat(ruList.getContent().get(0).getAmount()).isEqualTo(10);
        assertThat(ruList.getContent().get(0).getCo2Saved()).isGreaterThan(0);
    }
}

package org.dicadeveloper.weplantaforest.inject;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.fail;

import java.io.File;

import javax.transaction.Transactional;

import org.dicadeveloper.weplantaforest.FileSystemInjector;
import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.abo.AboRepository;
import org.dicadeveloper.weplantaforest.admin.codes.TeamRepository;
import org.dicadeveloper.weplantaforest.cart.CartRepository;
import org.dicadeveloper.weplantaforest.certificate.CertificateRepository;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.dev.inject.DatabasePopulator;
import org.dicadeveloper.weplantaforest.gift.GiftRepository;
import org.dicadeveloper.weplantaforest.projects.ProjectArticleRepository;
import org.dicadeveloper.weplantaforest.projects.ProjectImageRepository;
import org.dicadeveloper.weplantaforest.projects.ProjectRepository;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.dicadeveloper.weplantaforest.treetypes.TreeTypeRepository;
import org.dicadeveloper.weplantaforest.user.UserRepository;
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
public class DatabasePopulatorTest {

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private DatabasePopulator _databasePopulator;

    @Autowired
    private TreeTypeRepository _treeTypeRepository;

    @Autowired
    private TreeRepository _treeRepository;

    @Autowired
    private UserRepository _userRepository;

    @Autowired
    private ProjectArticleRepository _projectArticleRepository;

    @Autowired
    private ProjectRepository _projectRepository;

    @Autowired
    private ProjectImageRepository _projectImageRepository;

    @Autowired
    private TeamRepository _teamRepository;

    @Autowired
    private CartRepository _cartRepository;

    @Autowired
    private CertificateRepository _certificateRepository;

    @Autowired
    private GiftRepository _giftRepository;

    @Autowired
    private AboRepository _aboRepository;

    @Test
    public void testInsertUsers() throws Exception {
        _databasePopulator.insertUsers();
        assertThat(_userRepository.count()).isEqualTo(16);
    }

    @Test
    public void testInsertDefaultTreeTypes() throws Exception {
        _databasePopulator.insertDefaultTreeTypes();
        assertThat(_treeTypeRepository.count()).isEqualTo(11);
    }

    @Test
    public void testInsertTrees_noTypes() throws Exception {
        try {
            _databasePopulator.insertTrees(10);
            fail("should throw exception");
        } catch (Exception e) {
            assertThat(e.getMessage()).isEqualTo("No ProjectArticles set up!");
        }
    }

    @Test
    public void testInsertTrees() throws Exception {
        _databasePopulator.insertUsers();
        _databasePopulator.insertDefaultTreeTypes();
        _databasePopulator.insertProjects();
        _databasePopulator.insertProjectArticles();
        _databasePopulator.insertTrees(1000);
        assertThat(_treeRepository.count()).isEqualTo(1000);
    }

    @Test
    public void testInsertProjectArticles() throws Exception {
        _databasePopulator.insertUsers();
        _databasePopulator.insertDefaultTreeTypes();
        _databasePopulator.insertProjects();
        _databasePopulator.insertProjectArticles();

        long activeProjectCount = _projectRepository.count();

        assertThat(_projectArticleRepository.count()).isEqualTo(activeProjectCount * 5);

    }

    @Test
    public void testInsertProjectImages() {
        _databasePopulator.insertUsers();
        _databasePopulator.insertDefaultTreeTypes();
        _databasePopulator.insertProjects();
        _databasePopulator.insertProjectImages();

        assertThat(_projectImageRepository.count()).isEqualTo(50);
    }

    @Test
    public void testInsertTeams() {
        _databasePopulator.insertUsers();
        _databasePopulator.insertTeams();

        assertThat(_teamRepository.count()).isEqualTo(5);
    }

    @Test
    public void testcreateProjectFoldersAndInsertMainImages() {
        _databasePopulator.insertUsers();
        _databasePopulator.insertProjects();
        _databasePopulator.createProjectImageFoldersAndAddMainImages();

        File projectTopFolder = new File(FileSystemInjector.getImageFolderForProjects());

        int projectFolderCount = projectTopFolder.listFiles().length;

        assertThat(_projectRepository.count()).isEqualTo(projectFolderCount);
    }
    
    @Test
    public void testAddUserImages() {
        _databasePopulator.addUserAndTeamImages();

        File userImageFolder = new File(FileSystemInjector.getUserFolder());

        int imageCount = userImageFolder.listFiles().length;

        assertThat(imageCount).isEqualTo(4);
    }

    @Test
    public void testCopyAndRenameProjectImagesToProjectFolders() {
        _databasePopulator.insertUsers();
        _databasePopulator.insertProjects();
        _databasePopulator.createProjectImageFoldersAndAddMainImages();
        _databasePopulator.copyAndRenameProjectImagesToProjectFolders();

        File projectTopFolder = new File(FileSystemInjector.getImageFolderForProjects());

        File[] projectFolders = projectTopFolder.listFiles();

        for (int i = 0; i < projectFolders.length; i++) {
            assertThat(projectFolders[i].listFiles().length).isEqualTo(6);
        }
    }

    @Test
    @Transactional
    public void testInsertCartAndCertificateToCart() {
        _databasePopulator.insertUsers();
        _databasePopulator.insertDefaultTreeTypes();
        _databasePopulator.insertProjects();
        _databasePopulator.insertProjectArticles();
        _databasePopulator.insertCartAndCertificateToCart();

        assertThat(_cartRepository.count()).isEqualTo(1L);
        assertThat(_certificateRepository.count()).isEqualTo(1L);
    }

    @Test
    public void testInsertGifts() {
        _databasePopulator.insertUsers();
        _databasePopulator.insertGifts();

        assertThat(_giftRepository.count()).isEqualTo(10);
    }

    @Test
    public void testInsertAbo() {
        _databasePopulator.insertUsers();
        _databasePopulator.insertAbo();

        assertThat(_aboRepository.count()).isEqualTo(1);
    }

}

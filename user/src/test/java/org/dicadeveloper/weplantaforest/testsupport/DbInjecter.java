package org.dicadeveloper.weplantaforest.testsupport;

import java.math.BigDecimal;
import java.util.Date;

import org.dicadeveloper.weplantaforest.admin.codes.Team;
import org.dicadeveloper.weplantaforest.admin.codes.TeamRepository;
import org.dicadeveloper.weplantaforest.projects.Price;
import org.dicadeveloper.weplantaforest.projects.Price.ScontoType;
import org.dicadeveloper.weplantaforest.projects.PriceRepository;
import org.dicadeveloper.weplantaforest.projects.Project;
import org.dicadeveloper.weplantaforest.projects.ProjectArticle;
import org.dicadeveloper.weplantaforest.projects.ProjectArticleRepository;
import org.dicadeveloper.weplantaforest.projects.ProjectRepository;
import org.dicadeveloper.weplantaforest.trees.Tree;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.dicadeveloper.weplantaforest.trees.User;
import org.dicadeveloper.weplantaforest.trees.UserRepository;
import org.dicadeveloper.weplantaforest.treetypes.TreeType;
import org.dicadeveloper.weplantaforest.treetypes.TreeTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository("dbInjecter")
public class DbInjecter {

    @Autowired
    private ProjectRepository _projectRepository;

    @Autowired
    private UserRepository _userRepository;

    @Autowired
    private TreeTypeRepository _treeTypeRepository;

    @Autowired
    private TreeRepository _treeRepository;

    @Autowired
    private ProjectArticleRepository _projectArticleRepository;

    @Autowired
    private PriceRepository _priceRepository;

    @Autowired
    private TeamRepository _teamRepository;

    public void injectProject(String pName, String mName, String desc, boolean shopActive, float latitude,
            float longitude) {
        Project project = new Project();
        String projectName = pName;
        project.setName(projectName);
        project.setManager(_userRepository.findByName(mName));
        project.setDescription(desc);
        project.setImageFileName(projectName);
        project.setShopActive(shopActive);
        project.setLatitude(latitude);
        project.setLongitude(longitude);
        _projectRepository.save(project);
    }

    public void injectUser(String userName) {
        User userDto = new User();
        userDto.setName(userName);
        _userRepository.save(userDto);
    }

    public void injectUser(String userName, Long regDate) {
        User userDto = new User();
        userDto.setName(userName);
        userDto.setRegDate(regDate);
        _userRepository.save(userDto);
    }

    public void injectUser(String userName, Long regDate, int organizationType) {
        User userDto = new User();
        userDto.setName(userName);
        userDto.setRegDate(regDate);
        userDto.setOrganizationType(organizationType);
        _userRepository.save(userDto);
    }

    public void injectTreeType(String name, String desc, double co2) {
        TreeType treeTypeDto = new TreeType();
        treeTypeDto.setName(name);
        treeTypeDto.setDescription(desc);
        treeTypeDto.setAnnualCo2SavingInTons(co2);
        _treeTypeRepository.save(treeTypeDto);
    }

    public void injectTree(String treeType, String owner, int amount, long timeOfPlanting) {
        Tree tree = new Tree();
        tree.setLatitude(0);
        tree.setLongitude(0);
        tree.setAmount(amount);
        tree.setTreeType(_treeTypeRepository.findByName(treeType));
        tree.setPlantedOn(new Date(timeOfPlanting).getTime());
        tree.setSubmittedOn(new Date(timeOfPlanting).getTime());
        tree.setOwner(_userRepository.findByName(owner));
        _treeRepository.save(tree);

    }

    public void injectTreeToProject(String treeType, String owner, int amount, long timeOfPlanting, String pName) {
        Tree tree = new Tree();
        tree.setLatitude(0);
        tree.setLongitude(0);
        tree.setAmount(amount);
        tree.setTreeType(_treeTypeRepository.findByName(treeType));
        tree.setPlantedOn(new Date(timeOfPlanting).getTime());
        tree.setSubmittedOn(new Date(timeOfPlanting).getTime());
        tree.setOwner(_userRepository.findByName(owner));
        tree.setProjectArticle(_projectArticleRepository.findByProjectAndTreeType(_projectRepository.findByName(pName),
                _treeTypeRepository.findByName(treeType)));
        _treeRepository.save(tree);
    }

    public void injectPlantArticle(String treeType, String pName, double priceAmount) {
        ProjectArticle plantArticle = new ProjectArticle();
        Price price = new Price();

        price.setAmount(new BigDecimal(5.0));
        price.setScontoType(ScontoType.NONE);
        _priceRepository.save(price);

        plantArticle.setTreeType(_treeTypeRepository.findByName(treeType));
        plantArticle.setProject(_projectRepository.findByName(pName));
        plantArticle.setPrice(price);
        _projectArticleRepository.save(plantArticle);
    }

    public void injectTeam(String tName, String admin) {
        Team team = new Team();
        team.setName(tName);
        team.setAdmin(_userRepository.findByName(admin));
        _teamRepository.save(team);
        addUserToTeam(tName, admin);
    }

    public void addUserToTeam(String tName, String userName) {
        User user = _userRepository.findByName(userName);
        user.setTeam(_teamRepository.findByName(tName));
        _userRepository.save(user);
    }

}

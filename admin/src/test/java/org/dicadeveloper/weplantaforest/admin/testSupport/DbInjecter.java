package org.dicadeveloper.weplantaforest.admin.testSupport;

import java.math.BigDecimal;
import java.util.Date;

import org.dicadeveloper.weplantaforest.admin.project.Price;
import org.dicadeveloper.weplantaforest.admin.project.Price.ScontoType;
import org.dicadeveloper.weplantaforest.admin.project.PriceRepository;
import org.dicadeveloper.weplantaforest.admin.project.Project;
import org.dicadeveloper.weplantaforest.admin.project.ProjectArticle;
import org.dicadeveloper.weplantaforest.admin.project.ProjectArticleRepository;
import org.dicadeveloper.weplantaforest.admin.project.ProjectImage;
import org.dicadeveloper.weplantaforest.admin.project.ProjectImageRepository;
import org.dicadeveloper.weplantaforest.admin.project.ProjectRepository;
import org.dicadeveloper.weplantaforest.admin.tree.Tree;
import org.dicadeveloper.weplantaforest.admin.tree.TreeRepository;
import org.dicadeveloper.weplantaforest.admin.treeType.TreeType;
import org.dicadeveloper.weplantaforest.admin.treeType.TreeTypeRepository;
import org.dicadeveloper.weplantaforest.admin.user.User;
import org.dicadeveloper.weplantaforest.admin.user.UserRepository;
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
    private ProjectImageRepository _projectImageRepository;

    @Autowired
    private PriceRepository _priceRepository;

    public void injectProject(String pName, String mName, String desc, boolean shopActive, float latitude, float longitude) {
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

    public Tree injectTreeToProject(String treeType, String owner, int amount, long timeOfPlanting, String pName) {
        Tree tree = new Tree();
        tree.setLatitude(0);
        tree.setLongitude(0);
        tree.setAmount(amount);
        tree.setTreeType(_treeTypeRepository.findByName(treeType));
        tree.setPlantedOn(new Date(timeOfPlanting).getTime());
        tree.setSubmittedOn(new Date(timeOfPlanting).getTime());
        tree.setOwner(_userRepository.findByName(owner));
        tree.setProjectArticle(_projectArticleRepository.findByProjectAndTreeType(_projectRepository.findByName(pName), _treeTypeRepository.findByName(treeType)));
        _treeRepository.save(tree);

        return tree;
    }

    public void injectProjectArticle(String treeType, String pName, double priceAmount) {
        ProjectArticle plantArticle = new ProjectArticle();
        Price price = new Price();

        price.setAmount(new BigDecimal(priceAmount));
        price.setScontoType(ScontoType.NONE);
        _priceRepository.save(price);

        plantArticle.setTreeType(_treeTypeRepository.findByName(treeType));
        plantArticle.setProject(_projectRepository.findByName(pName));
        plantArticle.setPrice(price);
        _projectArticleRepository.save(plantArticle);
    }

    public void injectProjectArticle(String treeType, String pName, long amount, double priceAmount, double priceMarge) {
        ProjectArticle plantArticle = new ProjectArticle();
        Price price = new Price();

        price.setAmount(new BigDecimal(priceAmount));
        price.setScontoType(ScontoType.NONE);
        price.setMarge(new BigDecimal(priceMarge));
        _priceRepository.save(price);

        plantArticle.setTreeType(_treeTypeRepository.findByName(treeType));
        plantArticle.setProject(_projectRepository.findByName(pName));
        plantArticle.setPrice(price);
        plantArticle.setAmount(amount);
        _projectArticleRepository.save(plantArticle);
    }

    public void injectProjectImage(String title, String description, Long projectId, Long date) {
        ProjectImage image = new ProjectImage();
        image.setDate(date);
        image.setDescription(description);
        image.setProject(_projectRepository.findOne(projectId));
        image.setTitle(title);

        _projectImageRepository.save(image);
    }

}

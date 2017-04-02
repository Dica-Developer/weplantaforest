package org.dicadeveloper.weplantaforest.admin.testSupport;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.dicadeveloper.weplantaforest.admin.cart.Cart;
import org.dicadeveloper.weplantaforest.admin.cart.CartItem;
import org.dicadeveloper.weplantaforest.admin.cart.CartRepository;
import org.dicadeveloper.weplantaforest.admin.cart.CartState;
import org.dicadeveloper.weplantaforest.admin.project.Price;
import org.dicadeveloper.weplantaforest.admin.project.Price.ScontoType;
import org.dicadeveloper.weplantaforest.admin.project.PriceRepository;
import org.dicadeveloper.weplantaforest.admin.project.Project;
import org.dicadeveloper.weplantaforest.admin.project.ProjectArticle;
import org.dicadeveloper.weplantaforest.admin.project.ProjectArticleRepository;
import org.dicadeveloper.weplantaforest.admin.project.ProjectImage;
import org.dicadeveloper.weplantaforest.admin.project.ProjectImageRepository;
import org.dicadeveloper.weplantaforest.admin.project.ProjectRepository;
import org.dicadeveloper.weplantaforest.admin.team.Team;
import org.dicadeveloper.weplantaforest.admin.team.TeamRepository;
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
    private TeamRepository _teamRepository;

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

    @Autowired
    private CartRepository _cartRepository;

    public Project injectProject(String pName, User projectOwner, String desc, boolean shopActive, float latitude, float longitude) {
        Project project = new Project();
        String projectName = pName;
        project.setName(projectName);
        project.setManager(projectOwner);
        project.setDescription(desc);
        project.setImageFileName(projectName);
        project.setShopActive(shopActive);
        project.setLatitude(latitude);
        project.setLongitude(longitude);
        project = _projectRepository.save(project);
        return project;
    }

    public User injectUser(String userName) {
        User userDto = new User();
        userDto.setName(userName);
        return _userRepository.save(userDto);
    }

    public Team injectTeam(String tName, String admin) {
        Team team = new Team();
        team.setName(tName);
        team.setAdmin(_userRepository.findByName(admin));
        team = _teamRepository.save(team);
        addTeamToUser(tName, admin);
        return team;
    }

    private void addTeamToUser(String tName, String userName) {
        User user = _userRepository.findByName(userName);
        user.setTeam(_teamRepository.findByName(tName));
        _userRepository.save(user);
    }

    public TreeType injectTreeType(String name, String desc, double co2) {
        TreeType treeTypeDto = new TreeType();
        treeTypeDto.setName(name);
        treeTypeDto.setDescription(desc);
        treeTypeDto.setAnnualCo2SavingInTons(co2);
        treeTypeDto = _treeTypeRepository.save(treeTypeDto);
        return treeTypeDto;
    }

    public Long injectTree(String treeType, String owner, int amount, long timeOfPlanting) {
        Tree tree = new Tree();
        tree.setLatitude(0);
        tree.setLongitude(0);
        tree.setAmount(amount);
        tree.setTreeType(_treeTypeRepository.findByName(treeType));
        tree.setPlantedOn(new Date(timeOfPlanting).getTime());
        tree.setSubmittedOn(new Date(timeOfPlanting).getTime());
        tree.setOwner(_userRepository.findByName(owner));
        tree = _treeRepository.save(tree);
        return tree.getId();
    }

    public Long injectTreeToProject(TreeType treeType, User owner, int amount, long timeOfPlanting, Project project) {
        Tree tree = new Tree();
        tree.setLatitude(0);
        tree.setLongitude(0);
        tree.setAmount(amount);
        tree.setTreeType(treeType);
        tree.setPlantedOn(new Date(timeOfPlanting).getTime());
        tree.setSubmittedOn(new Date(timeOfPlanting).getTime());
        tree.setOwner(owner);
        tree.setProjectArticle(_projectArticleRepository.findByProjectAndTreeType(project, treeType));
        tree = _treeRepository.save(tree);
        return tree.getId();
    }

    public ProjectArticle injectProjectArticle(TreeType treeType, Project project, double priceAmount) {
        ProjectArticle plantArticle = new ProjectArticle();
        Price price = new Price();

        price.setAmount(new BigDecimal(priceAmount));
        price.setScontoType(ScontoType.NONE);
        _priceRepository.save(price);

        plantArticle.setTreeType(treeType);
        plantArticle.setProject(project);
        plantArticle.setPrice(price);
        plantArticle = _projectArticleRepository.save(plantArticle);
        return plantArticle;
    }

    public void injectProjectArticle(TreeType treeType, Project project, long amount, double priceAmount, double priceMarge) {
        ProjectArticle plantArticle = new ProjectArticle();
        Price price = new Price();

        price.setAmount(new BigDecimal(priceAmount));
        price.setScontoType(ScontoType.NONE);
        price.setMarge(new BigDecimal(priceMarge));
        _priceRepository.save(price);

        plantArticle.setTreeType(treeType);
        plantArticle.setProject(project);
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

    public void injectCart(String buyer, List<Long> treeIds) {
        Cart cart = new Cart();
        cart.setBuyer(_userRepository.findByName(buyer));

        List<Tree> trees = _treeRepository.findTreesByIdIn(treeIds);

        for (Tree tree : trees) {
            CartItem cartItem = new CartItem();
            cartItem.setBasePricePerPiece(new BigDecimal(1.0));
            cartItem.setTotalPrice(new BigDecimal(1.0));
            cartItem.setTree(tree);

            cart.addCartItem(cartItem);
        }
        _cartRepository.save(cart);

    }

    @Transactional
    public Long injectCart(User buyer, Long treeId) {
        Cart cart = new Cart();
        cart.setBuyer(buyer);

        Tree tree = _treeRepository.findTreeById(treeId);

        CartItem cartItem = new CartItem();
        cartItem.setBasePricePerPiece(new BigDecimal(1.0));
        cartItem.setTotalPrice(new BigDecimal(1.0));
        cartItem.setTree(tree);

        cart.addCartItem(cartItem);
        cart.setCartState(CartState.GENERATED);
        cart =  _cartRepository.save(cart);
        return cart.getId();
    }

}

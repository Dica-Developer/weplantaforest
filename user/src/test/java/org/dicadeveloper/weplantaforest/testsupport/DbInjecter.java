package org.dicadeveloper.weplantaforest.testsupport;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.dicadeveloper.weplantaforest.admin.codes.Team;
import org.dicadeveloper.weplantaforest.admin.codes.TeamRepository;
import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.cart.CartItem;
import org.dicadeveloper.weplantaforest.cart.CartRepository;
import org.dicadeveloper.weplantaforest.certificate.Certificate;
import org.dicadeveloper.weplantaforest.certificate.CertificateRepository;
import org.dicadeveloper.weplantaforest.projects.Price;
import org.dicadeveloper.weplantaforest.projects.Price.ScontoType;
import org.dicadeveloper.weplantaforest.projects.PriceRepository;
import org.dicadeveloper.weplantaforest.projects.Project;
import org.dicadeveloper.weplantaforest.projects.ProjectArticle;
import org.dicadeveloper.weplantaforest.projects.ProjectArticleRepository;
import org.dicadeveloper.weplantaforest.projects.ProjectImage;
import org.dicadeveloper.weplantaforest.projects.ProjectImageRepository;
import org.dicadeveloper.weplantaforest.projects.ProjectRepository;
import org.dicadeveloper.weplantaforest.trees.Tree;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.dicadeveloper.weplantaforest.treetypes.TreeType;
import org.dicadeveloper.weplantaforest.treetypes.TreeTypeRepository;
import org.dicadeveloper.weplantaforest.user.User;
import org.dicadeveloper.weplantaforest.user.UserRepository;
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

    @Autowired
    private ProjectImageRepository _projectImageRepository;

    @Autowired
    private CartRepository _cartRepository;

    @Autowired
    private CertificateRepository _certificateRepository;

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
    
    public void injectUser(String userName, String mail) {
        User userDto = new User();
        userDto.setName(userName);
        userDto.setMail(mail);
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
        tree.setProjectArticle(_projectArticleRepository.findByProjectAndTreeType(_projectRepository.findByName(pName), _treeTypeRepository.findByName(treeType)));
        _treeRepository.save(tree);
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

    public void injectProjectImage(String imageTitle, String text, String imageFileName, long date, String projectName) {
        ProjectImage projectImage = new ProjectImage();
        projectImage.setTitle(imageTitle);
        projectImage.setDescription(text);
        projectImage.setImageFileName(imageFileName);
        projectImage.setDate(date);
        projectImage.setProject(_projectRepository.findByName(projectName));
        _projectImageRepository.save(projectImage);
    }

    public void injectCart(String buyer, List<Long> treeIds) {
        Cart cart = new Cart();
        cart.setBuyer(_userRepository.findByName(buyer));

        List<Tree> trees = _treeRepository.findTreesByIdIn(treeIds);

        for (Tree tree : trees) {
            CartItem cartItem = new CartItem();
            cartItem.setAmount(1);
            cartItem.setBasePricePerPiece(new BigDecimal(1.0));
            cartItem.setTotalPrice(new BigDecimal(1.0));
            cartItem.setPlantArticleId(tree.getProjectArticle()
                                           .getArticleId());
            cartItem.setTree(tree);

            cart.addCartItem(cartItem);
        }
        _cartRepository.save(cart);

    }

    public void injectCart(String buyer, List<Long> treeIds, long timeStamp) {
        Cart cart = new Cart();
        cart.setBuyer(_userRepository.findByName(buyer));
        cart.setTimeStamp(timeStamp);

        List<Tree> trees = _treeRepository.findTreesByIdIn(treeIds);

        for (Tree tree : trees) {
            CartItem cartItem = new CartItem();
            cartItem.setAmount(tree.getAmount());
            cartItem.setBasePricePerPiece(new BigDecimal(1.0));

            double totalPrice = cartItem.getBasePricePerPiece()
                                        .doubleValue()
                    * cartItem.getAmount();

            cartItem.setTotalPrice(new BigDecimal(totalPrice));
            cartItem.setPlantArticleId(tree.getProjectArticle()
                                           .getArticleId());
            cartItem.setTree(tree);

            cart.addCartItem(cartItem);
        }
        _cartRepository.save(cart);

    }

    public String injectCertificate(String creatorName, List<Long> cartIds) {
        User creator = _userRepository.findByName(creatorName);

        Certificate certificate = new Certificate();
        certificate.setCreator(creator);
        certificate.setText("db injected test certificate");
        certificate.generateAndSetNumber(_certificateRepository.countCertificatesByUser(creator.getId()));

        List<Cart> carts = new ArrayList<>();

        for (Cart cart : _cartRepository.findAll(cartIds)) {
            carts.add(_cartRepository.findOne(cart.getId()));
        }

        certificate.setCarts(carts);

        _certificateRepository.save(certificate);

        return certificate.getNumber();

    }

}

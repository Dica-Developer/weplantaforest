package org.dicadeveloper.weplantaforest.testsupport;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.dicadeveloper.weplantaforest.abo.Abo;
import org.dicadeveloper.weplantaforest.abo.Abo.Period;
import org.dicadeveloper.weplantaforest.abo.AboRepository;
import org.dicadeveloper.weplantaforest.admin.codes.Team;
import org.dicadeveloper.weplantaforest.admin.codes.TeamRepository;
import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.cart.CartItem;
import org.dicadeveloper.weplantaforest.cart.CartRepository;
import org.dicadeveloper.weplantaforest.cart.CartState;
import org.dicadeveloper.weplantaforest.certificate.Certificate;
import org.dicadeveloper.weplantaforest.certificate.CertificateRepository;
import org.dicadeveloper.weplantaforest.code.Code;
import org.dicadeveloper.weplantaforest.code.CodeGenerator;
import org.dicadeveloper.weplantaforest.common.support.Language;
import org.dicadeveloper.weplantaforest.encryption.PasswordEncrypter;
import org.dicadeveloper.weplantaforest.gift.Gift;
import org.dicadeveloper.weplantaforest.gift.Gift.Status;
import org.dicadeveloper.weplantaforest.gift.GiftRepository;
import org.dicadeveloper.weplantaforest.projects.Price;
import org.dicadeveloper.weplantaforest.projects.Price.ScontoType;
import org.dicadeveloper.weplantaforest.projects.PriceRepository;
import org.dicadeveloper.weplantaforest.projects.Project;
import org.dicadeveloper.weplantaforest.projects.ProjectArticle;
import org.dicadeveloper.weplantaforest.projects.ProjectArticleRepository;
import org.dicadeveloper.weplantaforest.projects.ProjectImage;
import org.dicadeveloper.weplantaforest.projects.ProjectImageRepository;
import org.dicadeveloper.weplantaforest.projects.ProjectRepository;
import org.dicadeveloper.weplantaforest.receipt.Receipt;
import org.dicadeveloper.weplantaforest.receipt.ReceiptRepository;
import org.dicadeveloper.weplantaforest.trees.Tree;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.dicadeveloper.weplantaforest.treetypes.TreeType;
import org.dicadeveloper.weplantaforest.treetypes.TreeTypeRepository;
import org.dicadeveloper.weplantaforest.user.OrganizationType;
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

    @Autowired
    private GiftRepository _giftRepository;

    @Autowired
    private CodeGenerator _codeGenerator;

    @Autowired
    private AboRepository _aboRepository;

    @Autowired
    private PasswordEncrypter _passwordEncrypter;

    @Autowired
    private ReceiptRepository _receiptRepository;

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
        userDto.setPassword(_passwordEncrypter.encryptPassword(userName));
        userDto.setLang(Language.DEUTSCH);
        _userRepository.save(userDto);
    }

    public void injectUser(String userName, String mail) {
        User userDto = new User();
        userDto.setName(userName);
        userDto.setMail(mail);
        userDto.setLang(Language.DEUTSCH);
        _userRepository.save(userDto);
    }

    public void injectUser(String userName, Long regDate) {
        User userDto = new User();
        userDto.setName(userName);
        userDto.setRegDate(regDate);
        userDto.setOrganizationType(OrganizationType.PRIVATE);
        userDto.setLang(Language.DEUTSCH);
        _userRepository.save(userDto);
    }

    public void injectUser(String userName, Long regDate, OrganizationType organizationType) {
        User userDto = new User();
        userDto.setName(userName);
        userDto.setRegDate(regDate);
        userDto.setLastVisit(regDate);
        userDto.setOrganizationType(organizationType);
        userDto.setLang(Language.DEUTSCH);
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
            cartItem.setBasePricePerPiece(new BigDecimal(1.0));
            cartItem.setTotalPrice(new BigDecimal(1.0));
            cartItem.setTree(tree);

            cart.addCartItem(cartItem);
        }
        _cartRepository.save(cart);

    }

    public Cart injectCartWithTrees(String buyer, Tree... trees) {
        Cart cart = new Cart();
        cart.setBuyer(_userRepository.findByName(buyer));

        for (Tree tree : trees) {
            CartItem cartItem = new CartItem();
            cartItem.setBasePricePerPiece(new BigDecimal(1.0));
            cartItem.setTotalPrice(new BigDecimal(1.0));
            cartItem.setTree(tree);

            cart.addCartItem(cartItem);
        }
        _cartRepository.save(cart);

        return cart;

    }

    public void injectCart(String buyer, List<Long> treeIds, long timeStamp) {
        Cart cart = new Cart();
        cart.setBuyer(_userRepository.findByName(buyer));
        cart.setTimeStamp(timeStamp);
        cart.setCartState(CartState.VERIFIED);
        
        List<Tree> trees = _treeRepository.findTreesByIdIn(treeIds);

        for (Tree tree : trees) {
            CartItem cartItem = new CartItem();
            cartItem.setTree(tree);
            cartItem.setBasePricePerPiece(new BigDecimal(1.0));

            double totalPrice = cartItem.getBasePricePerPiece()
                                        .doubleValue()
                    * cartItem.getTree()
                              .getAmount();

            cartItem.setTotalPrice(new BigDecimal(totalPrice));
            cart.addCartItem(cartItem);
        }
        _cartRepository.save(cart);

    }

    public String injectCertificateWithCarts(String creatorName, List<Cart> carts) {
        User creator = _userRepository.findByName(creatorName);

        Certificate certificate = new Certificate();
        certificate.setCreator(creator);
        certificate.setText("db injected test certificate");
        certificate.generateAndSetNumber(_certificateRepository.countCertificatesByUser(creator.getId()));

        certificate.setCarts(carts);

        _certificateRepository.save(certificate);

        return certificate.getNumber();

    }

    public String injectCertificateWithTreesForOneCart(String creatorName, Tree... trees) {
        Cart cart = injectCartWithTrees(creatorName, trees);

        List<Cart> carts = new ArrayList<>();
        carts.add(cart);

        String certificateString = injectCertificateWithCarts("Adam", carts);

        return certificateString;

    }

    public String injectGiftWithCode(String userName, String recipient, Status giftStatus) {
        Gift gift = new Gift();
        gift.setConsignor(_userRepository.findByName(userName));
        gift.setRecipient(_userRepository.findByName(recipient));

        Code code = _codeGenerator.generate(gift);
        gift.setCode(code);
        gift.setStatus(giftStatus);
        _giftRepository.save(gift);

        return gift.getCode()
                   .getCode();
    }

    public Code injectGiftWithCode(String consignor, Status giftStatus) {
        Gift gift = new Gift();
        gift.setConsignor(_userRepository.findByName(consignor));

        Code code = _codeGenerator.generate(gift);
        gift.setCode(code);
        gift.setStatus(giftStatus);
        _giftRepository.save(gift);

        return gift.getCode();
    }

    public void injectAbo(String owner, boolean isActive, int amount, Period period, long timeStamp) {
        Abo abo = new Abo();
        abo.setActive(isActive);
        abo.setAmount(amount);
        abo.setPeriod(period);
        abo.setTimeStamp(timeStamp);
        abo.setUser(_userRepository.findByName(owner));

        _aboRepository.save(abo);
    }

    public void injectReceipt(String owner, long createdOn, long sentOn, String invoiceNumber) {
        Receipt receipt = new Receipt();
        receipt.setOwner(_userRepository.findByName(owner));
        receipt.setSentOn(sentOn);
        receipt.setInvoiceNumber(invoiceNumber);

        _receiptRepository.save(receipt);
    }
    
    public void injectReceipt(String owner, long createdOn, long sentOn, String invoiceNumber, List<Cart> carts) {
        Receipt receipt = new Receipt();
        receipt.setOwner(_userRepository.findByName(owner));
        receipt.setSentOn(sentOn);
        receipt.setInvoiceNumber(invoiceNumber);
        receipt.setCarts(carts);

        _receiptRepository.save(receipt);
    }

}

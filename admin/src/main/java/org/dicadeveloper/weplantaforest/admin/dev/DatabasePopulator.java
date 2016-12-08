package org.dicadeveloper.weplantaforest.admin.dev;

import java.math.BigDecimal;
import java.util.Iterator;
import java.util.List;
import java.util.Random;

import javax.transaction.Transactional;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
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
import org.dicadeveloper.weplantaforest.admin.project.ProjectRepository;
import org.dicadeveloper.weplantaforest.admin.tree.Tree;
import org.dicadeveloper.weplantaforest.admin.tree.TreeRepository;
import org.dicadeveloper.weplantaforest.admin.treeType.TreeType;
import org.dicadeveloper.weplantaforest.admin.treeType.TreeTypeRepository;
import org.dicadeveloper.weplantaforest.admin.user.User;
import org.dicadeveloper.weplantaforest.admin.user.UserRepository;
import org.dicadeveloper.weplantaforest.common.support.TimeConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import com.google.common.collect.ImmutableList;
import com.google.common.collect.Iterators;

import lombok.NonNull;

/**
 * Provides the functionality to easily populate the database with test data.
 */
@Service
public class DatabasePopulator {

    protected final Log LOG = LogFactory.getLog(DatabasePopulator.class.getName());

    private final static List<String> DEFAULT_TREE_TYPES = ImmutableList.of("Buche", "Kiefer", "Birke", "Ahorn", "Eiche", "Esche", "Linde", "Wildapfel", "Robinie", "Espe", "Default");

    private final static List<String> DEFAULT_USERS = ImmutableList.of("admin", "Martin", "Sebastian", "Johannes", "Gab&uuml;r", "Micha", "Christian", "Sven", "Axl", "Philipp", "Adam", "Bert",
            "Claus", "Django", "Emil", "Mr NoTree");

    public final static String DUMMY_IMAGE_FOLDER = "src/test/resources/images/";

    private ProjectRepository _projectRepository;
    private UserRepository _userRepository;
    private TreeTypeRepository _treeTypeRepository;
    private TreeRepository _treeRepository;
    private ProjectArticleRepository _projectArticleRepository;
    private CartRepository _cartRepository;
    private PriceRepository _priceRepository;

    @Autowired
    private @NonNull Environment _env;

    @Autowired
    public DatabasePopulator(ProjectRepository projectRepository, UserRepository userRepository, TreeTypeRepository treeTypeRepository, TreeRepository treeRepository,
            ProjectArticleRepository projectArticleRepository, PriceRepository priceRepository, CartRepository cartRepository) {
        _projectRepository = projectRepository;
        _userRepository = userRepository;
        _treeTypeRepository = treeTypeRepository;
        _treeRepository = treeRepository;
        _projectArticleRepository = projectArticleRepository;
        _cartRepository = cartRepository;
        _priceRepository = priceRepository;
    }

    public DatabasePopulator insertProjects() {
        for (int i = 0; i < 10; i++) {

            String projectName = "Project " + (i + 1) + " von " + DEFAULT_USERS.get(i);
            Project project = new Project();
            project.setName(projectName);
            project.setManager(_userRepository.findByName(DEFAULT_USERS.get(i)));
            project.setDescription(
                    "dksgny.d, mdfgnmn snfad,ng ,ydfng. ,ydfgnk.<sngdk< sglkbsnglkdfnksghnl<k njdjg nsgyö< ögn kl< bsflkjsb gkjs kgs ns< lödgksndlkgnöd<kl dykdyn ökd ökshö<g dysh ögskgös Hskg khoglksg");
            project.setImageFileName("project" + (i + 1) + ".jpg");
            if (i < 5) {
                project.setShopActive(false);
            } else {
                project.setShopActive(true);
            }
            switch (i) {
            case 0:
                project.setLatitude(52.4626536896816f);
                project.setLongitude(13.607287460327143f);
                break;
            case 1:
                project.setLatitude(37.235000f);
                project.setLongitude(-115.811111f);
                break;
            case 2:
                project.setLatitude(52.4626536896816f);
                project.setLongitude(13.607287460327143f);
                break;
            case 3:
                project.setLatitude(52.4626536896816f);
                project.setLongitude(13.607287460327143f);
                break;
            case 4:
                project.setLatitude(52.4626536896816f);
                project.setLongitude(13.607287460327143f);
                break;
            case 5:
                project.setLatitude(52.4626536896816f);
                project.setLongitude(13.607287460327143f);
                break;
            case 6:
                project.setLatitude(52.4626536896816f);
                project.setLongitude(13.607287460327143f);
                break;
            case 7:
                project.setLatitude(52.4626536896816f);
                project.setLongitude(13.607287460327143f);
                break;
            case 8:
                project.setLatitude(52.4626536896816f);
                project.setLongitude(13.607287460327143f);
                break;
            default:
                project.setLatitude(51.482691f);
                project.setLongitude(11.969947f);
                break;
            }
            _projectRepository.save(project);
        }
        return this;
    }

    public DatabasePopulator insertDefaultTreeTypes() {
        DEFAULT_TREE_TYPES.forEach((treeTypeName) -> {
            TreeType treeType = _treeTypeRepository.findByName(treeTypeName);
            if (null == treeType) {
                final String description = "Die " + treeTypeName
                        + " bilden eine Pflanzengattung in der Unterfamilie der Rosskastaniengewächse (Hippocastanoideae) innerhalb der Familie der Seifenbaumgewächse (Sapindaceae). ";
                treeType = new TreeType();
                treeType.setName(treeTypeName);
                treeType.setDescription(description);
                double co2Savings = 0.02;
                switch (treeTypeName) {
                case "Robin":
                case "Wildapfel":
                    co2Savings = 0.01;
                    break;
                case "Default":
                    co2Savings = 0.011;
                    break;
                }
                treeType.setAnnualCo2SavingInTons(co2Savings);
                treeType.setImageFile(treeTypeName + ".jpeg");
                _treeTypeRepository.save(treeType);

            }
        });
        return this;
    }

    public DatabasePopulator insertUsers() {
        long timeNoew = System.currentTimeMillis();

        for (int i = 0; i < DEFAULT_USERS.size(); i++) {
            User user = new User();
            user.setName(DEFAULT_USERS.get(i));
            user.setEnabled(true);
            user.setRegDate(timeNoew - (i + 1) * TimeConstants.YEAR_IN_MILLISECONDS);
            user.setMail(_env.getProperty("mail.receiver"));
            _userRepository.save(user);
        }
        return this;
    }

    public DatabasePopulator insertTrees(int count) {
        Iterator<ProjectArticle> cyclingProjectArticles = Iterators.cycle(loadProjectArticles());
        long timeOfPlant = System.currentTimeMillis();

        ProjectArticle articleToPlant = cyclingProjectArticles.next();
        for (int i = 0; i < count; i++) {
            if (i > 0 && i % 15 == 0) {
                articleToPlant = cyclingProjectArticles.next();
            }

            Tree treeDto = new Tree();
            treeDto.setAmount(i % 20 + 1);
            treeDto.setLatitude(i);
            treeDto.setLongitude(i);
            treeDto.setTreeType(articleToPlant.getTreeType());
            treeDto.setPlantedOn(timeOfPlant - i * 100000000L);
            treeDto.setOwner(_userRepository.findByName(DEFAULT_USERS.get(i % 15)));
            treeDto.setProjectArticle(articleToPlant);
            _treeRepository.save(treeDto);
        }
        return this;
    }

    public DatabasePopulator insertProjectArticles() {
        for (Project project : _projectRepository.findAll()) {
            for (int i = 0; i < 5; i++) {
                Price price = createPrice();

                ProjectArticle plantArticle = new ProjectArticle();
                plantArticle.setTreeType(_treeTypeRepository.findByName(DEFAULT_TREE_TYPES.get(i)));
                plantArticle.setProject(project);
                plantArticle.setPrice(price);
                plantArticle.setAmount(10000L);
                _projectArticleRepository.save(plantArticle);
            }
        }
        return this;
    }

    private Iterable<ProjectArticle> loadProjectArticles() {
        return _projectArticleRepository.findAll();
    }

    private Price createPrice() {
        Price price = new Price();
        Random random = new Random();

        double randomPrice = random.nextDouble() * 6;
        double randomMarge = randomPrice / 2;

        price.setAmount(new BigDecimal(randomPrice));
        price.setScontoType(ScontoType.NONE);
        price.setMarge(new BigDecimal(randomMarge));
        _priceRepository.save(price);
        return price;
    }

    @Transactional
    public DatabasePopulator insertCarts() {
        for (int i = 0; i < 1000; i++) {
            Cart cart = new Cart();
            User buyer = _userRepository.findByName(DEFAULT_USERS.get(i % 10));

            cart.setBuyer(buyer);
            cart.setCartState(CartState.values()[i % 5]);
            cart.setCallBackVorname(DEFAULT_USERS.get(i % 10));
            cart.setCallBackNachname("Nachname");
            cart.setCallBackFirma(DEFAULT_USERS.get(i % 10) + " Industries");
            Tree tree = new Tree();
            ProjectArticle projectArticle = _projectArticleRepository.findOne(1L);
            tree.setAmount(i % 10 + 1);
            tree.setProjectArticle(projectArticle);
            tree.setTreeType(projectArticle.getTreeType());
            tree.setOwner(buyer);

            CartItem cartItem = new CartItem();
            cartItem.setTree(tree);

            cart.addCartItem(cartItem);

            _cartRepository.save(cart);
        }

        return this;
    }

}

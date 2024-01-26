package org.dicadeveloper.weplantaforest.admin.dev;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Iterator;
import java.util.List;
import java.util.Random;

import javax.transaction.Transactional;

import org.dicadeveloper.weplantaforest.admin.FileSystemInjector;
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
import org.dicadeveloper.weplantaforest.admin.slider.MainSliderImage;
import org.dicadeveloper.weplantaforest.admin.slider.MainSliderImageRepository;
import org.dicadeveloper.weplantaforest.admin.tree.Tree;
import org.dicadeveloper.weplantaforest.admin.tree.TreeRepository;
import org.dicadeveloper.weplantaforest.admin.treeType.TreeType;
import org.dicadeveloper.weplantaforest.admin.treeType.TreeTypeRepository;
import org.dicadeveloper.weplantaforest.admin.user.User;
import org.dicadeveloper.weplantaforest.admin.user.UserRepository;
import org.dicadeveloper.weplantaforest.common.support.TimeConstants;
import org.dicadeveloper.weplantaforest.common.user.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import com.google.common.collect.ImmutableList;
import com.google.common.collect.Iterators;

import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;

/**
 * Provides the functionality to easily populate the database with test data.
 */
@Slf4j
@Service
public class DatabasePopulator {

    private static final List<String> DEFAULT_TREE_TYPES = ImmutableList.of("<mlpr>GERMAN<equ>Buche<sep>ENGLISH<equ>Beech Tree<sep>ITALIAN<equ>Beech Tree<sep>", "Kiefer", "Birke", "Ahorn", "Eiche",
            "Esche", "Linde", "Wildapfel", "Robinie", "Espe", "Default");

    private static final List<String> DEFAULT_USERS = ImmutableList.of("admin", "Martin", "Sebastian", "Johannes", "Gab&uuml;r", "Micha", "Christian", "Sven", "Axl", "Philipp", "Adam", "Bert",
            "Claus", "Django", "Emil", "Mr NoTree");

    public static final String DUMMY_IMAGE_FOLDER = "src/test/resources/images/";

    private ProjectRepository projectRepository;
    private UserRepository userRepository;
    private TreeTypeRepository treeTypeRepository;
    private TreeRepository treeRepository;
    private ProjectArticleRepository projectArticleRepository;
    private CartRepository cartRepository;
    private PriceRepository priceRepository;
    private ProjectImageRepository projectImageRepository;
    private MainSliderImageRepository mainSliderImageRepository;

    @Autowired
    private @NonNull Environment env;

    @Autowired
    public DatabasePopulator(ProjectRepository projectRepository, UserRepository userRepository, TreeTypeRepository treeTypeRepository, TreeRepository treeRepository,
            ProjectArticleRepository projectArticleRepository, PriceRepository priceRepository, CartRepository cartRepository, ProjectImageRepository projectImageRepository,
            MainSliderImageRepository mainSliderImageRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.treeTypeRepository = treeTypeRepository;
        this.treeRepository = treeRepository;
        this.projectArticleRepository = projectArticleRepository;
        this.cartRepository = cartRepository;
        this.priceRepository = priceRepository;
        this.projectImageRepository = projectImageRepository;
        this.mainSliderImageRepository = mainSliderImageRepository;

    }

    public DatabasePopulator insertProjects() {
        for (int i = 0; i < 10; i++) {

            String projectName = "Project " + (i + 1) + " von " + DEFAULT_USERS.get(i);
            Project project = new Project();
            project.setName(projectName);
            project.setManager(userRepository.findByName(DEFAULT_USERS.get(i)));
            project.setDescription("<mlpr>GERMAN<equ><p>Projektbeschreibung</p><sep>ENGLISH<equ><p>project description</p><sep>ITALIAN<equ>projecto descriptiones<sep>");
            if (i < 5) {
                project.setShopActive(false);
                project.setVisible(false);
            } else {
                project.setShopActive(true);
                project.setVisible(true);
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
            projectRepository.save(project);
        }
        return this;
    }

    public DatabasePopulator insertProjectImages() {
        for (int i = 1; i <= 10; i++) {
            for (int j = 1; j <= 5; j++) {
                ProjectImage projectImage = new ProjectImage();
                projectImage.setTitle("image " + j);
                projectImage.setDescription("<mlpr>GERMAN<equ>Bildbeschreibung " + j + "<sep>ENGLISH<equ>image description " + j + "<sep>ITALIAN<equ>projecto descriptiones<sep>");
                projectImage.setImageFileName("project" + i + "_" + j + ".jpg");
                projectImage.setDate(100000000L * j);
                projectImage.setProject(projectRepository.findById((long) i).orElse(null));
                projectImageRepository.save(projectImage);
            }
        }

        return this;
    }

    public DatabasePopulator insertDefaultTreeTypes() {
        DEFAULT_TREE_TYPES.forEach((treeTypeName) -> {
            TreeType treeType = treeTypeRepository.findByName(treeTypeName);
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
                    default:
                        co2Savings = 0.011;
                        break;

                }
                treeType.setAnnualCo2SavingInTons(co2Savings);
                treeType.setTreeImageColor(treeTypeName + ".jpeg");
                treeTypeRepository.save(treeType);

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
            user.setMail(DEFAULT_USERS.get(i) + "@" + DEFAULT_USERS.get(i) + ".de");
            if (i < 5) {
                user.addRole(Role.ADMIN);
            } else if (i >= 5 && i < 8) {
                user.addRole(Role.ARTICLE_MANAGER);
            }
            user.addRole(Role.USER);
            userRepository.save(user);
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
            treeDto.setLatitude((float) i);
            treeDto.setLongitude((float) i);
            treeDto.setTreeType(articleToPlant.getTreeType());
            treeDto.setPlantedOn(timeOfPlant - i * 100000000L);
            treeDto.setOwner(userRepository.findByName(DEFAULT_USERS.get(i % 15)));
            treeDto.setProjectArticle(articleToPlant);
            treeRepository.save(treeDto);
        }
        return this;
    }

    public DatabasePopulator insertProjectArticles() {
        for (Project project : projectRepository.findAll()) {
            for (int i = 0; i < 5; i++) {
                Price price = createPrice();

                ProjectArticle plantArticle = new ProjectArticle();
                plantArticle.setTreeType(treeTypeRepository.findByName(DEFAULT_TREE_TYPES.get(i)));
                plantArticle.setProject(project);
                plantArticle.setPrice(price);
                plantArticle.setAmount(10000L);
                projectArticleRepository.save(plantArticle);
            }
        }
        return this;
    }

    private Iterable<ProjectArticle> loadProjectArticles() {
        return projectArticleRepository.findAll();
    }

    private Price createPrice() {
        Price price = new Price();
        Random random = new Random();

        double randomPrice = random.nextDouble() * 6;
        double randomMarge = randomPrice / 2;

        price.setAmount(new BigDecimal(randomPrice));
        price.setScontoType(ScontoType.NONE);
        price.setMarge(new BigDecimal(randomMarge));
        priceRepository.save(price);
        return price;
    }

    @Transactional
    public DatabasePopulator insertCarts() {
        for (int i = 0; i < 1000; i++) {
            Cart cart = new Cart();
            User buyer = userRepository.findByName(DEFAULT_USERS.get(i % 10));

            cart.setBuyer(buyer);
            cart.setTimeStamp(1000000000L * i);
            cart.setCartState(CartState.values()[i % 5]);
            cart.setCallBackVorname(DEFAULT_USERS.get(i % 10));
            cart.setCallBackNachname("Nachname");
            cart.setCallBackFirma(DEFAULT_USERS.get(i % 10) + " Industries");
            Tree tree = new Tree();
            ProjectArticle projectArticle = projectArticleRepository.findById(1L).orElse(null);
            tree.setAmount(i % 10 + 1);
            tree.setProjectArticle(projectArticle);
            tree.setTreeType(projectArticle.getTreeType());
            tree.setOwner(buyer);

            CartItem cartItem = new CartItem();
            cartItem.setTree(tree);

            cart.addCartItem(cartItem);

            cartRepository.save(cart);
        }

        return this;
    }

    public DatabasePopulator addMainImagesToProjectFolder() {
        for (int i = 1; i <= projectRepository.count(); i++) {
            String mainImageFileName = "project" + i + ".jpg";

            Path imageFileSrc = new File(DUMMY_IMAGE_FOLDER + mainImageFileName).toPath();
            String imageFileDest = FileSystemInjector.getImageFolderForProjects() + "/" + mainImageFileName;

            createProjectImageFileAndCopySrcFileIntoIt(imageFileSrc, imageFileDest);
        }

        return this;
    }

    public DatabasePopulator addProjectImages() {
        for (int i = 0; i < projectRepository.count(); i++) {
            for (int j = 1; j <= 5; j++) {
                String projectImageName = "project" + i + "_" + j + ".jpg";

                String imageSrcName = "project" + j + ".jpg";
                Path imageFileSrc = new File(DUMMY_IMAGE_FOLDER + imageSrcName).toPath();

                String imageFileDest = FileSystemInjector.getImageFolderForProjects() + "/" + projectImageName;

                createProjectImageFileAndCopySrcFileIntoIt(imageFileSrc, imageFileDest);
            }
        }

        return this;
    }

    public void createMainSliderImages() {
        for (int i = 1; i <= 4; i++) {
            MainSliderImage image = new MainSliderImage();

            String imageFileName = "main_image" + i + ".jpg";
            image.setImageFileName(imageFileName);
            mainSliderImageRepository.save(image);

            Path imageFileSrc = new File(DUMMY_IMAGE_FOLDER + imageFileName).toPath();
            String imageFileDest = FileSystemInjector.getMainImageFolder() + "/" + imageFileName;
            File newImageFile = new File(imageFileDest);
            try {
                newImageFile.createNewFile();
                Files.copy(imageFileSrc, newImageFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
            } catch (IOException e) {
                LOG.error("Error occured while copying " + imageFileSrc.toString() + " to " + imageFileDest + "!");
            }
        }
    }

    private void createProjectImageFileAndCopySrcFileIntoIt(Path srcPath, String destPath) {
        try {
            File newImageFile = new File(destPath);
            newImageFile.createNewFile();
            Files.copy(srcPath, newImageFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e1) {
            LOG.error("Error occured while copying " + srcPath.toString() + " to " + destPath + "!");
        }
    }

}

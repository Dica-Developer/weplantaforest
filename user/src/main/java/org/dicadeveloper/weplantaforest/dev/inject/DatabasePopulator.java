package org.dicadeveloper.weplantaforest.dev.inject;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Random;
import java.util.concurrent.TimeUnit;

import javax.transaction.Transactional;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dicadeveloper.weplantaforest.FileSystemInjector;
import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.cart.CartItem;
import org.dicadeveloper.weplantaforest.cart.CartRepository;
import org.dicadeveloper.weplantaforest.cart.CartState;
import org.dicadeveloper.weplantaforest.certificate.Certificate;
import org.dicadeveloper.weplantaforest.certificate.CertificateRepository;
import org.dicadeveloper.weplantaforest.code.Code;
import org.dicadeveloper.weplantaforest.code.CodeGenerator;
import org.dicadeveloper.weplantaforest.common.support.Language;
import org.dicadeveloper.weplantaforest.common.support.TimeConstants;
import org.dicadeveloper.weplantaforest.common.user.Role;
import org.dicadeveloper.weplantaforest.encryption.PasswordEncrypter;
import org.dicadeveloper.weplantaforest.gift.Gift;
import org.dicadeveloper.weplantaforest.gift.Gift.Status;
import org.dicadeveloper.weplantaforest.gift.GiftRepository;
import org.dicadeveloper.weplantaforest.mainSliderImage.MainSliderImage;
import org.dicadeveloper.weplantaforest.mainSliderImage.MainSliderImageRepository;
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
import org.dicadeveloper.weplantaforest.team.Team;
import org.dicadeveloper.weplantaforest.team.TeamRepository;
import org.dicadeveloper.weplantaforest.trees.Tree;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.dicadeveloper.weplantaforest.treetypes.TreeType;
import org.dicadeveloper.weplantaforest.treetypes.TreeTypeRepository;
import org.dicadeveloper.weplantaforest.user.OrganizationType;
import org.dicadeveloper.weplantaforest.user.User;
import org.dicadeveloper.weplantaforest.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import com.google.common.base.Verify;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.Iterators;

/**
 * Provides the functionality to easily populate the database with test data.
 */
@Service
public class DatabasePopulator {

    protected static final Log LOG = LogFactory.getLog(DatabasePopulator.class.getName());

    private static final List<String> DEFAULT_TREE_TYPES = ImmutableList.of("Buche", "Kiefer", "Birke", "Ahorn", "Eiche", "Esche", "Linde", "Wildapfel", "Robinie", "Espe", "Default");

    private static final List<String> DEFAULT_USERS = ImmutableList.of("admin", "Martin", "Sebastian", "Johannes", "Gab&uuml;r", "Micha", "Christian", "Sven", "Axl", "Philipp", "Adam", "Bert",
            "Claus", "Django", "Emil", "Mr NoTree");

    public static final String DUMMY_IMAGE_FOLDER = "src/test/resources/images/";

    private ProjectRepository projectRepository;
    private UserRepository userRepository;
    private TreeTypeRepository treeTypeRepository;
    private TreeRepository treeRepository;
    private ProjectArticleRepository projectArticleRepository;
    private PriceRepository priceRepository;
    private ProjectImageRepository projectImageRepository;
    private TeamRepository teamRepository;
    private CartRepository cartRepository;
    private CertificateRepository certificateRepository;
    private GiftRepository giftRepository;
    private CodeGenerator codeGenerator;
    private ReceiptRepository receiptRepository;
    private MainSliderImageRepository mainSliderImageRepository;

    private PasswordEncrypter passwordEncrypter;

    @Autowired
    private Environment env;

    @Autowired
    public DatabasePopulator(ProjectRepository projectRepository, UserRepository userRepository, TreeTypeRepository treeTypeRepository, TreeRepository treeRepository,
            ProjectArticleRepository projectArticleRepository, PriceRepository priceRepository, ProjectImageRepository projectImageRepository, TeamRepository teamRepository,
            CartRepository cartRepository, CertificateRepository certificateRepository, GiftRepository giftRepository, CodeGenerator codeGenerator, PasswordEncrypter passwordEncrypter,
            ReceiptRepository receiptRepository, MainSliderImageRepository mainSliderImageRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.treeTypeRepository = treeTypeRepository;
        this.treeRepository = treeRepository;
        this.projectArticleRepository = projectArticleRepository;
        this.priceRepository = priceRepository;
        this.projectImageRepository = projectImageRepository;
        this.teamRepository = teamRepository;
        this.cartRepository = cartRepository;
        this.certificateRepository = certificateRepository;
        this.giftRepository = giftRepository;
        this.codeGenerator = codeGenerator;
        this.passwordEncrypter = passwordEncrypter;
        this.receiptRepository = receiptRepository;
        this.mainSliderImageRepository = mainSliderImageRepository;
    }

    public DatabasePopulator insertProjects() {
        for (int i = 0; i < 10; i++) {

            String projectName = "Project " + (i + 1) + " von " + DEFAULT_USERS.get(i);
            Project project = new Project();
            project.setName(projectName);
            project.setManager(userRepository.findByName(DEFAULT_USERS.get(i)));
            project.setDescription(
                    "dksgny.d, mdfgnmn snfad,ng ,ydfng. ,ydfgnk.<sngdk< sglkbsnglkdfnksghnl<k njdjg nsgyö< ögn kl< bsflkjsb gkjs kgs ns< lödgksndlkgnöd<kl dykdyn ökd ökshö<g dysh ögskgös Hskg khoglksg");
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
            projectRepository.save(project);
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
                treeType.setTreeImageBW(treeTypeName + ".jpeg");
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
            user.setPassword(passwordEncrypter.encryptPassword(DEFAULT_USERS.get(i)));
            user.setEnabled(true);
            user.setRegDate(timeNoew - (i + 1) * TimeConstants.YEAR_IN_MILLISECONDS);
            user.setLastVisit(timeNoew - TimeConstants.WEEK_IN_MILLISECONDS);
            user.addRole(Role.USER);
            user.setOrganizationType(OrganizationType.PRIVATE);
            user.setMail(env.getProperty("mail.receiver"));
            if (i < 5) {
                user.setImageName("IPAT_logo_Relaunch2016_RZ_RGB.jpg");
                user.addRole(Role.ADMIN);
                user.setLang(Language.DEUTSCH);
            } else if (i < 8) {
                user.setImageName("50.jpg");
                user.setLang(Language.DEUTSCH);
            } else {
                user.setImageName("51.jpg");
                user.setLang(Language.ENGLISH);
            }
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
            treeDto.setLatitude(new Float(i));
            treeDto.setLongitude(new Float(i));
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

    // private Iterable<User> loadUsers() {
    // Verify.verify(_userRepository.count() > 0, "No Users set up!");
    // return userRepository.findAll();
    //
    // }
    //
    // private Iterable<TreeType> loadTreeTypes() {
    // Verify.verify(_treeTypeRepository.count() > 0, "No TreeTypes set up!");
    // return treeTypeRepository.findAll();
    // }

    private Iterable<ProjectArticle> loadProjectArticles() {
        Verify.verify(projectArticleRepository.count() > 0, "No ProjectArticles set up!");
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

    public DatabasePopulator insertProjectImages() {
        for (int i = 1; i <= 10; i++) {
            for (int j = 1; j <= 5; j++) {
                ProjectImage projectImage = new ProjectImage();
                projectImage.setTitle("image " + j);
                projectImage.setDescription(" image description " + j);
                projectImage.setImageFileName("project" + i + "_" + j + ".jpg");
                projectImage.setDate(100000000L * j);
                projectImage.setProject(projectRepository.findById((long) i).orElse(null));
                projectImageRepository.save(projectImage);
            }
        }

        return this;
    }

    public DatabasePopulator insertTeams() {
        for (int i = 0; i < 5; i++) {
            Team team = new Team();
            User admin = userRepository.findByName(DEFAULT_USERS.get(i));

            team.setName("Team " + (i + 1));
            team.setAdmin(admin);
            team.setTimeStamp(10000000L * (i + 1));
            team.setDescription("Can i introduce you: the phenomenal " + "Team " + (i + 1) + "!!!");

            List<User> teamMember = new ArrayList<User>();
            teamMember.add(userRepository.findByName(DEFAULT_USERS.get(i + 5)));

            team.setMembers(teamMember);
            teamRepository.save(team);

            admin.setTeam(team);
            userRepository.save(admin);
            for (User member : team.getMembers()) {
                member.setTeam(team);
                userRepository.save(member);
            }

        }

        return this;
    }

    public DatabasePopulator addUserAndTeamImages() {
        Path imageFileSrc1 = new File(DUMMY_IMAGE_FOLDER + "50.jpg").toPath();
        Path imageFileSrc2 = new File(DUMMY_IMAGE_FOLDER + "51.jpg").toPath();
        Path imageFileSrc3 = new File(DUMMY_IMAGE_FOLDER + "IPAT_logo_Relaunch2016_RZ_RGB.jpg").toPath();

        String imgDest1 = FileSystemInjector.getUserFolder() + "/50.jpg";
        String imgDest2 = FileSystemInjector.getUserFolder() + "/51.jpg";
        String imgDest3 = FileSystemInjector.getUserFolder() + "/IPAT_logo_Relaunch2016_RZ_RGB.jpg";
        String anonymousDest = FileSystemInjector.getUserFolder() + "/anonymous.jpg";

        createProjectImageFileAndCopySrcFileIntoIt(imageFileSrc1, imgDest1);
        createProjectImageFileAndCopySrcFileIntoIt(imageFileSrc2, imgDest2);
        createProjectImageFileAndCopySrcFileIntoIt(imageFileSrc3, imgDest3);
        createProjectImageFileAndCopySrcFileIntoIt(imageFileSrc2, anonymousDest);

        int teamCnt = 1;
        for (Team team : teamRepository.findAll()) {
            new File(FileSystemInjector.getTeamFolder() + "/" + team.getId()).mkdir();
            String imgDest = FileSystemInjector.getTeamFolder() + "/" + teamCnt + ".jpg";
            createProjectImageFileAndCopySrcFileIntoIt(imageFileSrc1, imgDest);
            teamCnt++;
        }
        return this;
    }

    public DatabasePopulator addTreeTypeImages() {
        DEFAULT_TREE_TYPES.forEach((treeTypeName) -> {
            Path imageFileSrc = new File(DUMMY_IMAGE_FOLDER + treeTypeName + ".jpeg").toPath();
            String imgDest = FileSystemInjector.getTreeTypeFolder() + "/" + treeTypeName + ".jpeg";
            createProjectImageFileAndCopySrcFileIntoIt(imageFileSrc, imgDest);
        });

        return this;
    }

    public DatabasePopulator createProjectImageFoldersAndAddMainImages() {
        int projectCount = 1;
        for (Project project : projectRepository.findAll()) {
            String projectName = project.getName();
            String mainImageFileName = "project" + projectCount + ".jpg";

            createProjectFolder(projectName);

            Path imageFileSrc = new File(DUMMY_IMAGE_FOLDER + mainImageFileName).toPath();
            String imageFileDest = FileSystemInjector.getImageFolderForProjects() + "/" + mainImageFileName;

            createProjectImageFileAndCopySrcFileIntoIt(imageFileSrc, imageFileDest);

            projectCount++;
        }

        return this;
    }

    public DatabasePopulator copyAndRenameProjectImagesToProjectFolders() {
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

    @Transactional
    public DatabasePopulator insertCartAndCertificateToCart() {
        Cart cart = new Cart();
        User buyer = userRepository.findByName(DEFAULT_USERS.get(0));

        cart.setBuyer(buyer);
        cart.setCartState(CartState.VERIFIED);
        Tree tree = new Tree();
        ProjectArticle projectArticle = projectArticleRepository.findById(1L).orElse(null);
        tree.setAmount(2);
        tree.setProjectArticle(projectArticle);
        tree.setTreeType(projectArticle.getTreeType());
        tree.setOwner(buyer);

        CartItem cartItem = new CartItem();
        cartItem.setTree(tree);

        cart.addCartItem(cartItem);

        cartRepository.save(cart);

        Certificate certificate = new Certificate();
        certificate.setCreator(userRepository.findByName(DEFAULT_USERS.get(0)));
        certificate.setText("Very happy to save the plaent");
        certificate.generateAndSetNumber(0);

        List<Cart> carts = new ArrayList<>();
        carts.add(cartRepository.findById(1L).orElse(null));
        certificate.setCarts(carts);

        certificateRepository.save(certificate);

        return this;
    }

    public DatabasePopulator insertGifts() {
        for (int i = 0; i < 10; i++) {
            Gift gift = new Gift();
            gift.setConsignor(userRepository.findByName(DEFAULT_USERS.get(i)));
            gift.setRecipient(userRepository.findByName(DEFAULT_USERS.get(9 - i)));
            giftRepository.save(gift);
            Code code = codeGenerator.generate(gift);
            gift.setCode(code);
            gift.setStatus(Status.REDEEMED);
            giftRepository.save(gift);
        }
        return this;
    }

    @Transactional
    public DatabasePopulator insertReceipts() {
        // receipt with one cart
        Receipt receipt = new Receipt();
        receipt.setInvoiceNumber("10001/2016");
        receipt.setOwner(userRepository.findById(1L).orElse(null));
        Cart cart = cartRepository.findById(1L).orElse(null);
        cart.setCallBackFirma("0815 Company");
        cart.setCallBackVorname("Hans");
        cart.setCallBackNachname("Wurst");
        cart.setCallBackPlz("123456");
        cart.setCallBackOrt("Musterstadt");
        cart.setTimeStamp(System.currentTimeMillis());

        cartRepository.save(cart);

        receipt.addCart(cart);
        receiptRepository.save(receipt);

        // receipt with two carts
        createReceiptWithMoreCarts();
        return this;
    }

    private void createReceiptWithMoreCarts() {

        for (int i = 1; i <= 100; i++) {
            User buyer = userRepository.findByName(DEFAULT_USERS.get(1));

            Receipt receipt = new Receipt();
            receipt.setInvoiceNumber("1000" + i + 1 + "/2016");
            receipt.setOwner(buyer);

            for (int j = 0; j <= i; j++) {
                Cart cart = new Cart();

                cart.setBuyer(buyer);
                cart.setCartState(CartState.VERIFIED);
                cart.setCallBackFirma("0815 Company");
                cart.setCallBackVorname("Hans");
                cart.setCallBackNachname("Wurst");
                cart.setCallBackPlz("123456");
                cart.setCallBackOrt("Musterstadt");
                cart.setTimeStamp(System.currentTimeMillis() - TimeUnit.DAYS.toMillis(5) * j);

                Tree tree = new Tree();
                ProjectArticle projectArticle = projectArticleRepository.findById(1L).orElse(null);
                tree.setAmount(2);
                tree.setProjectArticle(projectArticle);
                tree.setTreeType(projectArticle.getTreeType());
                tree.setOwner(buyer);

                CartItem cartItem = new CartItem();
                cartItem.setTree(tree);

                cart.addCartItem(cartItem);

                cartRepository.save(cart);
                receipt.addCart(cart);
            }
            receiptRepository.save(receipt);
        }
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
                LOG.error("Error occured while copying " + imageFileSrc.toString() + " to " + imageFileSrc + "!");
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

    private void createProjectFolder(String projectName) {
        new File(FileSystemInjector.getImageFolderForProjects() + "/" + projectName).mkdir();
    }
}

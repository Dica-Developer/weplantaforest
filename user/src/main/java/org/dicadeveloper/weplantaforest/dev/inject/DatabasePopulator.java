package org.dicadeveloper.weplantaforest.dev.inject;

import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Random;

import org.dicadeveloper.weplantaforest.projects.Project;
import org.dicadeveloper.weplantaforest.projects.ProjectRepository;
import org.dicadeveloper.weplantaforest.trees.Tree;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.dicadeveloper.weplantaforest.trees.User;
import org.dicadeveloper.weplantaforest.trees.UserRepository;
import org.dicadeveloper.weplantaforest.treetypes.TreeType;
import org.dicadeveloper.weplantaforest.treetypes.TreeTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.base.Verify;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.Iterators;

/**
 * Provides the functionality to easily populate the database with test data.
 */
@Service
public class DatabasePopulator {

    private final static List<String> DEFAULT_TREE_TYPES = ImmutableList.of("Buche", "Kiefer", "Birke", "Ahorn", "Eiche", "Esche", "Linde", "Wildapfel", "Robin", "Espe", "Default");

    private final static List<String> DEFAULT_USERS = ImmutableList.of("admin", "Martin", "Sebastian", "Johannes");

    private ProjectRepository _projectRepository;
    private UserRepository _userRepository;
    private TreeTypeRepository _treeTypeRepository;
    private TreeRepository _treeRepository;

    @Autowired
    public DatabasePopulator(ProjectRepository projectRepository, UserRepository userRepository, TreeTypeRepository treeTypeRepository, TreeRepository treeRepository) {
        _projectRepository = projectRepository;
        _userRepository = userRepository;
        _treeTypeRepository = treeTypeRepository;
        _treeRepository = treeRepository;
    }

    public void insertProjects() {
        Random random = new Random();
        for (int i = 0; i < 10; i++) {
            int pickOne = random.nextInt(4);
            String projectName = "Project " + i + " von " + DEFAULT_USERS.get(pickOne);
            Project project = new Project();
            project.setName(projectName);
            project.setManager(_userRepository.findByName(DEFAULT_USERS.get(pickOne)));
            project.setDescription(
                    "dksgny.d, mdfgnmn snfad,ng ,ydfng. ,ydfgnk.<sngdk< sglkbsnglkdfnksghnl<k njdjg nsgyö< ögn kl< bsflkjsb gkjs kgs ns< lödgksndlkgnöd<kl dykdyn ökd ökshö<g dysh ögskgös Hskg khoglksg");
            project.setImageFileName(projectName);
            project.setShopActive(random.nextBoolean());
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
                _treeTypeRepository.save(treeType);
            }
        });
        return this;
    }

    public DatabasePopulator insertUsers() {
        DEFAULT_USERS.forEach((userName) -> {
            User user = new User();
            user.setName(userName);
            user.setEnabled(true);
            _userRepository.save(user);
        });
        return this;
    }

    public DatabasePopulator insertTrees(int count) {
        Iterator<TreeType> cyclingTreeTypes = Iterators.cycle(loadTreeTypes());
        Iterator<User> cyclingUsers = Iterators.cycle(loadUsers());
        for (int i = 0; i < count; i++) {
            Tree treeDto = new Tree();
            treeDto.setAmount(i % 20);
            treeDto.setLatitude(i);
            treeDto.setLongitude(i);
            treeDto.setTreeType(_treeTypeRepository.findByName(cyclingTreeTypes.next().getName()));
            treeDto.setPlantedOn(new Date(i + 1000000L).getTime());
            treeDto.setOwner(cyclingUsers.next());
            _treeRepository.save(treeDto);
        }
        return this;
    }

    private Iterable<User> loadUsers() {
        Verify.verify(_userRepository.count() > 0, "No Users set up!");
        return _userRepository.findAll();

    }

    private Iterable<TreeType> loadTreeTypes() {
        Verify.verify(_treeTypeRepository.count() > 0, "No TreeTypes set up!");
        return _treeTypeRepository.findAll();
    }
}

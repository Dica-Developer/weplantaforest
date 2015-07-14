package org.dicadeveloper.weplantaforest.dev.inject;

import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Random;

import jersey.repackaged.com.google.common.collect.Iterators;

import org.dicadeveloper.weplantaforest.persist.dto.TreeDto;
import org.dicadeveloper.weplantaforest.persist.dto.TreeTypeDto;
import org.dicadeveloper.weplantaforest.persist.dto.UserDto;
import org.dicadeveloper.weplantaforest.projects.ProjectDto;
import org.dicadeveloper.weplantaforest.projects.ProjectService;
import org.dicadeveloper.weplantaforest.services.TreeService;
import org.dicadeveloper.weplantaforest.services.TreeTypeService;
import org.dicadeveloper.weplantaforest.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.base.Verify;
import com.google.common.collect.ImmutableList;

/**
 * Provides the functionality to easily populate the database with test data.
 */
@Service
public class DatabasePopulator {

    private final static List<String> DEFAULT_TREE_TYPES = ImmutableList.of("Buche", "Kiefer", "Birke", "Ahorn", "Eiche", "Esche", "Linde", "Wildapfel", "Robin", "Espe", "Default");
    private final static List<String> DEFAULT_USERS = ImmutableList.of("admin", "Martin", "Sebastian", "Johannes");

    @Autowired
    private UserService _userService;
    @Autowired
    private TreeTypeService _treeTypeService;
    @Autowired
    private TreeService _treeService;

    @Autowired
    private ProjectService _projectService;

    public void insertProjects() {
        Random random = new Random();
        Date now = new Date();
        for (int i = 0; i < 10; i++) {
            int pickOne = random.nextInt(4);
            String projectName = "Project " + i + " von " + DEFAULT_USERS.get(pickOne);
            ProjectDto project = new ProjectDto(projectName, now, now, random.nextBoolean());
            project.setManager(_userService.findByName(DEFAULT_USERS.get(pickOne)));
            project.setDescription("dksgny.d, mdfgnmn snfad,ng ,ydfng. ,ydfgnk.<sngdk< sglkbsnglkdfnksghnl<k njdjg nsgyö< ögn kl< bsflkjsb gkjs kgs ns< lödgksndlkgnöd<kl dykdyn ökd ökshö<g dysh ögskgös Hskg khoglksg");
            project.setImageFileName(projectName);
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
            _projectService.save(project);
        }
    }

    public DatabasePopulator insertDefaultTreeTypes() {
        DEFAULT_TREE_TYPES.forEach((treeTypeName) -> {
            TreeTypeDto findByName = _treeTypeService.findByName(treeTypeName);
            if (TreeTypeDto.NO_TREE_TYPE.equals(findByName)) {
                final String description = "Die " + treeTypeName
                        + " bilden eine Pflanzengattung in der Unterfamilie der Rosskastaniengewächse (Hippocastanoideae) innerhalb der Familie der Seifenbaumgewächse (Sapindaceae). ";
                TreeTypeDto treeType = new TreeTypeDto(treeTypeName, description);
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
                _treeTypeService.save(treeType);
            }
        });
        return this;
    }

    public DatabasePopulator insertUsers() {
        DEFAULT_USERS.forEach((userName) -> {
            UserDto user = new UserDto();
            user.setName(userName);
            user.setEnabled(true);
            _userService.save(user);
        });
        return this;
    }

    public DatabasePopulator insertTrees(int count) {
        Iterator<TreeTypeDto> cyclingTreeTypes = Iterators.cycle(loadTreeTypes());
        Iterator<UserDto> cyclingUsers = Iterators.cycle(loadUsers());
        for (int i = 0; i < count; i++) {
            TreeDto treeDto = new TreeDto(i, i, i % 20);
            treeDto.setTreeType(_treeTypeService.findByName(cyclingTreeTypes.next().getName()));
            treeDto.setPlantedOn(new Date(i + 1000000L));
            treeDto.setOwner(cyclingUsers.next());
            _treeService.save(treeDto);
        }
        return this;
    }

    private List<UserDto> loadUsers() {
        List<UserDto> allUsers = _userService.findAll();
        Verify.verify(allUsers.size() > 0, "No Users set up!");
        return allUsers;
    }

    private List<TreeTypeDto> loadTreeTypes() {
        List<TreeTypeDto> allTreeTypes = _treeTypeService.findAll();
        Verify.verify(allTreeTypes.size() > 0, "No TreeTypes set up!");
        return allTreeTypes;
    }
}

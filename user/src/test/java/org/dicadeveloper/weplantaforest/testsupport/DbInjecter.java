package org.dicadeveloper.weplantaforest.testsupport;

import org.dicadeveloper.weplantaforest.projects.Project;
import org.dicadeveloper.weplantaforest.projects.ProjectRepository;
import org.dicadeveloper.weplantaforest.trees.User;
import org.dicadeveloper.weplantaforest.trees.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository("dbInjecter")
public class DbInjecter {

    @Autowired
    private ProjectRepository _projectRepository;

    @Autowired
    private UserRepository _userRepository;

    public void createAndSaveProect(String pName, String mName, String desc, boolean shopActive, float latitude, float longitude) {
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

    public void createAndSaveUser(String userName) {
        User userDto = new User();
        userDto.setName(userName);
        _userRepository.save(userDto);
    }

}

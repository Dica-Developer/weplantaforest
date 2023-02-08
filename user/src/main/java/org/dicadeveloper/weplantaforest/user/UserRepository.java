package org.dicadeveloper.weplantaforest.user;

import java.util.List;

import org.dicadeveloper.weplantaforest.common.support.Language;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends CrudRepository<User, Long> {

    public static final String USER_EXISTS_QUERY = "SELECT COUNT(_name) FROM User WHERE BINARY _name = :name";

    public static final String USER_WITH_MAIL_EXISTS_QUERY = "SELECT COUNT(user) FROM User user WHERE user.mail = :mail";

    public static final String GET_USER_DETAILS_QUERY = "SELECT new org.dicadeveloper.weplantaforest.user.UserReportData(user.id, user.name, user.imageName, COALESCE(user.mail, ''), "
            + " user.regDate, user.lastVisit, user.organizationType, COALESCE(tm.name, ''), COALESCE(user.aboutMe, ''), COALESCE(user.location, ''), COALESCE(user.organisation, ''), "
            + " COALESCE(user.homepage, ''), user.lang, user.newsletter)" + " FROM User user LEFT JOIN user.team tm WHERE user.name = :name";

    public static final String GET_USER_LANGUAGE = "SELECT user.lang FROM User user WHERE user.name = :name";

    public static final String GET_TEAM_MEMBER_QUERY = "SELECT user FROM User user WHERE user.team.name = :teamName";

    public static final String COUNT_ANONYM_USER_QUERY = "SELECT count(user) FROM User user WHERE user.name like \'Anonymous%\'";

    public static final String GET_ALL_TEAM_MEMBER = "Select user FROM User user WHERE user.team.id = :teamId";

    @Query(value = "SELECT * FROM User user WHERE BINARY _name = :name", nativeQuery = true)
    public User findByName(@Param("name") String name);

    @Query(value = USER_EXISTS_QUERY, nativeQuery = true)
    public long userExists(@Param("name") String name);

    @Query(value = USER_WITH_MAIL_EXISTS_QUERY)
    public long userWithMailExists(@Param("mail") String mail);

    @Query(value = GET_USER_DETAILS_QUERY)
    public UserReportData getUserDetails(@Param("name") String name);

    @Query(value = GET_USER_LANGUAGE)
    public Language getUserLanguage(@Param("name") String name);

    @Query(value = GET_TEAM_MEMBER_QUERY)
    public Page<User> getTeamMember(@Param("teamName") String teamName, Pageable page);

    @Query(value = GET_ALL_TEAM_MEMBER)
    public List<User> getAllTeamMember(@Param("teamId") Long teamId);

    @Query(value = COUNT_ANONYM_USER_QUERY)
    public long countAnonymUser();

    @Query(value = "SELECT user FROM User user WHERE user.mail = :email")
    public User findByEmail(@Param("email") String email);

    @Query(value = "SELECT user FROM User user WHERE user.name LIKE %:searchValue%")
    public List<User> searchUsers(@Param("searchValue") String searchValue);

}

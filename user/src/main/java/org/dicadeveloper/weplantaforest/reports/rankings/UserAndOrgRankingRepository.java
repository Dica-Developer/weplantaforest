package org.dicadeveloper.weplantaforest.reports.rankings;

import org.dicadeveloper.weplantaforest.trees.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface UserAndOrgRankingRepository extends CrudRepository<User, Long> {

    public final static String FIND_LAST_CREATED_USER_QUERY = "SELECT user FROM User user ORDER BY user._regDate DESC";

    public final static String FIND_BEST_USER_QUERY = "SELECT owner FROM Tree as tree GROUP BY tree.owner ORDER BY sum(_amount) desc";

    public final static String GET_AMOUNT_OF_TREES_FROM_USER = "SELECT sum(tree.amount) FROM Tree as tree where tree.owner = :owner";

    public final static String GET_CO2_SAVING_FROM_USER = "SELECT sum(tree.amount * tree.treeType.annualCo2SavingInTons * ((:timeOfMeasurement - tree.plantedOn) / 3.1536E10)) FROM Tree as tree where tree.owner = :owner";

    @Query(FIND_LAST_CREATED_USER_QUERY)
    @Transactional(readOnly = true)
    public Page<User> findLastCreatedUser(Pageable pageable);

    @Query(FIND_BEST_USER_QUERY)
    @Transactional(readOnly = true)
    public Page<User> findBestUser(Pageable pageable);

    @Query(GET_AMOUNT_OF_TREES_FROM_USER)
    Long getAmountOfTrees(@Param("owner") User owner);

    @Query(GET_CO2_SAVING_FROM_USER)
    Double getCo2SavingFromUser(@Param("timeOfMeasurement") long timeOfMeasurement, @Param("owner") User owner);

}

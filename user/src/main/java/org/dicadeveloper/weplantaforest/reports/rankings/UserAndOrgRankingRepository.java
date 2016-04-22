package org.dicadeveloper.weplantaforest.reports.rankings;

import org.dicadeveloper.weplantaforest.trees.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

public interface UserAndOrgRankingRepository extends PagingAndSortingRepository<User, Long> {

    public final static String CO2_CALC_QUERY = "sum(tree.amount * tree.treeType.annualCo2SavingInTons * ((:time - tree.plantedOn) / 3.1536E10)) ";

    public final static String FIND_BEST_USER_QUERY = "SELECT new org.dicadeveloper.weplantaforest.reports.rankings.RankedUser(tree.owner.name, sum(tree.amount), " + CO2_CALC_QUERY + ")"
            + "FROM Tree as tree GROUP BY tree.owner ORDER BY sum(tree.amount) desc";

    public final static String COUNT_BEST_USER_QUERY = "SELECT count(distinct tree.owner.name) from Tree as tree where :time = :time";

    @Query(value = FIND_BEST_USER_QUERY, countQuery = COUNT_BEST_USER_QUERY)
    Page<RankedUser> getBestUser(@Param("time") long timeOfMeasurement, Pageable page);
}

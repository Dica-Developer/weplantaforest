package org.dicadeveloper.weplantaforest.reports.rankings;

import java.util.List;

import org.dicadeveloper.weplantaforest.common.support.TimeConstants;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.dicadeveloper.weplantaforest.user.OrganizationType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class RankingController {

    private @NonNull RankingRepository _rankingRepository;

    // @Cacheable(value = CacheConfiguration.TEN_MINUTE_CACHE)
    @RequestMapping(value = Uris.RANKING_BEST_USER, method = RequestMethod.GET)
    public Page<TreeRankedUserData> getBestUser(@RequestParam(value = "page") int page, @RequestParam(value = "size") int size, @RequestParam(value = "lastYear") boolean lastYear) {
        if (lastYear) {
            return _rankingRepository.getBestUserForLastYear(System.currentTimeMillis(), PageRequest.of(page, size));
        } else {
            return _rankingRepository.getBestUser(System.currentTimeMillis(), PageRequest.of(page, size));
        }
    }

    @RequestMapping(value = Uris.RANKING_LAST_CREATED_USER, method = RequestMethod.GET)
    public List<TimeRankedUserData> getLastUser() {
        return _rankingRepository.getLastCreatedUser(PageRequest.of(0, 10));
    }

    // @Cacheable(value = CacheConfiguration.TEN_MINUTE_CACHE)
    @RequestMapping(value = Uris.RANKING_BEST_ORGANIZATION_TYPE + "{organizationType}", method = RequestMethod.GET)
    public Page<TreeRankedUserData> getBestUserFromOrganizationType(@PathVariable OrganizationType organizationType, @Param(value = "page") int page, @Param(value = "size") int size,
            @RequestParam(value = "lastYear") boolean lastYear) {
        if (lastYear) {
            return _rankingRepository.getBestUserFromOrganizationTypeForLastYear(System.currentTimeMillis(), organizationType, PageRequest.of(page, size));
        } else {
            return _rankingRepository.getBestUserFromOrganizationType(System.currentTimeMillis(), organizationType, PageRequest.of(page, size));
        }
    }

    @RequestMapping(value = Uris.RANKING_LAST_PLANTED_TREES, method = RequestMethod.GET)
    public Page<TimeRankedTreeData> getLastPlantedTrees(@Param(value = "page") int page, @Param(value = "size") int size) {
        return _rankingRepository.getLastPlantedTrees(PageRequest.of(page, size));
    }

    // @Cacheable(value = CacheConfiguration.TEN_MINUTE_CACHE)
    @RequestMapping(value = Uris.RANKING_BEST_TEAM, method = RequestMethod.GET)
    public Page<TreeRankedUserData> getBestTeams(@Param(value = "page") int page, @Param(value = "size") int size, @RequestParam(value = "lastYear") boolean lastYear) {
        if (lastYear) {
            return _rankingRepository.getBestTeamsForLastYear(System.currentTimeMillis(), PageRequest.of(page, size));
        } else {
            return _rankingRepository.getBestTeams(System.currentTimeMillis(), PageRequest.of(page, size));
        }
    }

    @RequestMapping(value = Uris.RANKING_BEST_USER_FOR_TIMERANGE + "{timeRange}", method = RequestMethod.GET)
    public List<TreeRankedUserData> getBestUserFromTimeRange(@PathVariable String timeRange) {
        Long timeRangeEnd = System.currentTimeMillis();
        Long timeRangeStart = 0L;
        switch (timeRange) {
            case "year":
                timeRangeStart = timeRangeEnd - TimeConstants.YEAR_IN_MILLISECONDS;
                break;
            case "week":
                timeRangeStart = timeRangeEnd - TimeConstants.WEEK_IN_MILLISECONDS;
                break;
            default:
                timeRangeStart = timeRangeEnd - TimeConstants.YEAR_IN_MILLISECONDS;
                break;
        }
        return _rankingRepository.getBestUserFromTimeRange(timeRangeStart, timeRangeEnd, PageRequest.of(0, 10));
    }

    @RequestMapping(value = Uris.RANKING_BEST_USER_FOR_PROJECT, method = RequestMethod.GET)
    public Page<TreeRankedUserData> getBestUserForProject(@Param(value = "projectName") String projectName, @Param(value = "page") int page, @Param(value = "size") int size) {
        return _rankingRepository.getBestUserForProject(projectName, System.currentTimeMillis(), PageRequest.of(page, size));
    }

    @RequestMapping(value = Uris.RANKING_BEST_TEAM_FOR_PROJECT, method = RequestMethod.GET)
    public Page<TreeRankedUserData> getBestTeamsForProject(@Param(value = "projectName") String projectName, @Param(value = "page") int page, @Param(value = "size") int size) {
        return _rankingRepository.getBestTeamsForProject(projectName, System.currentTimeMillis(), PageRequest.of(page, size));
    }

    @RequestMapping(value = Uris.RANKING_LAST_PLANTED_TREES_IN_PROJECT, method = RequestMethod.GET)
    public Page<TimeRankedTreeData> getLastPlantedTreesInProject(@Param(value = "projectName") String projectName, @Param(value = "page") int page, @Param(value = "size") int size) {
        return _rankingRepository.getLastPlantedTreesInProject(projectName, PageRequest.of(page, size));
    }

}

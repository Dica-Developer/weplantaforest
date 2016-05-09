package org.dicadeveloper.weplantaforest.reports.rankings;

import java.util.List;

import org.dicadeveloper.weplantaforest.CacheConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class RankingController {

    private @NonNull RankingRepository _rankingRepository;

    @Cacheable(value = CacheConfiguration.TEN_MIUTE_CACHE)
    @RequestMapping(value = "/ranking/bestUser/{pageNr}/{pageSize}", method = RequestMethod.GET)
    public Page<TreeRankedUserData> getBestUser(@PathVariable int pageNr, @PathVariable int pageSize) {
        return _rankingRepository.getBestUser(System.currentTimeMillis(), new PageRequest(pageNr, pageSize));
    }

    @RequestMapping(value = "/ranking/lastCreatedUser", method = RequestMethod.GET)
    public List<TimeRankedUserData> getLastUser() {
        return _rankingRepository.getLastCreatedUser(new PageRequest(0, 10));
    }

    @Cacheable(value = CacheConfiguration.TEN_MIUTE_CACHE)
    @RequestMapping(value = "/ranking/bestOrgType/{organizationType}/{pageNr}/{pageSize}", method = RequestMethod.GET)
    public Page<TreeRankedUserData> getBestUserFromOrganizationType(@PathVariable int organizationType,
            @PathVariable int pageNr, @PathVariable int pageSize) {
        return _rankingRepository.getBestUserFromOrganizationType(System.currentTimeMillis(), organizationType,
                new PageRequest(pageNr, pageSize));
    }

    @RequestMapping(value = "/ranking/lastPlantedTrees", method = RequestMethod.GET)
    public List<TimeRankedTreeData> getLastPlantedTrees() {
        return _rankingRepository.getLastPlantedTrees(new PageRequest(0, 10));
    }

    @Cacheable(value = CacheConfiguration.TEN_MIUTE_CACHE)
    @RequestMapping(value = "/ranking/bestTeam/{pageNr}/{pageSize}", method = RequestMethod.GET)
    public Page<TreeRankedUserData> getBestTeams(@PathVariable int pageNr, @PathVariable int pageSize) {
        return _rankingRepository.getBestTeams(System.currentTimeMillis(), new PageRequest(pageNr, pageSize));
    }

}

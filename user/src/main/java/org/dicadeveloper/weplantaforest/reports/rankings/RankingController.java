package org.dicadeveloper.weplantaforest.reports.rankings;

import org.springframework.beans.factory.annotation.Autowired;
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

    private @NonNull RankingRepository _userAndOrgRankingRepo;

    @RequestMapping(value = "/ranking/bestUser/{pageNr}/{pageSize}", method = RequestMethod.GET)
    public Page<TreeRankedUserData> getBestUser(@PathVariable int pageNr, @PathVariable int pageSize) {
        return _userAndOrgRankingRepo.getBestUser(System.currentTimeMillis(), new PageRequest(pageNr, pageSize));
    }

    @RequestMapping(value = "/ranking/lastCreatedUser/{pageNr}/{pageSize}", method = RequestMethod.GET)
    public Page<TimeRankedUserData> getLastUser(@PathVariable int pageNr, @PathVariable int pageSize) {
        return _userAndOrgRankingRepo.getLastCreatedUser(new PageRequest(pageNr, pageSize));
    }

}

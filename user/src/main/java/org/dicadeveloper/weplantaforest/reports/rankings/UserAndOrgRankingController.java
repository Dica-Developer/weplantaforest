package org.dicadeveloper.weplantaforest.reports.rankings;

import java.util.ArrayList;
import java.util.List;

import org.dicadeveloper.weplantaforest.helper.DateHelper;
import org.dicadeveloper.weplantaforest.trees.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.hateoas.ResourceSupport;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class UserAndOrgRankingController {

    private @NonNull UserAndOrgRankingRepository _userAndOrgRankingRepository;

    @RequestMapping(value = "/reports/ranking/bestUser/{pageNr}/{pageSize}", method = RequestMethod.GET)
    public HttpEntity<?> getBestUser(@PathVariable Integer pageNr, @PathVariable Integer pageSize) {
        List<String> names = new ArrayList<String>();
        List<Long> amounts = new ArrayList<Long>();
        List<Double> co2Savings = new ArrayList<Double>();
        final PageRequest pageRequest = new PageRequest(pageNr, pageSize);

        Page<User> bestUser = _userAndOrgRankingRepository.findBestUser(pageRequest);

        for (User u : bestUser.getContent()) {
            names.add(u.getName());
            amounts.add(_userAndOrgRankingRepository.getAmountOfTrees(u));
            co2Savings.add(_userAndOrgRankingRepository.getCo2SavingFromUser(System.currentTimeMillis(), u));
        }

        final BestUserResource resource = new BestUserResource(names, amounts, co2Savings);
        return new ResponseEntity<>(resource, HttpStatus.OK);
    }

    @RequestMapping(value = "/reports/ranking/lastUser/{page}/{pageSize}", method = RequestMethod.GET)
    public HttpEntity<?> getLastCreatedUser(@PathVariable Integer page, @PathVariable Integer pageSize) {
        List<String> names = new ArrayList<String>();
        List<String> dates = new ArrayList<String>();
        List<String> times = new ArrayList<String>();
        final PageRequest pageRequest = new PageRequest(page, pageSize);

        Page<User> lastUser = _userAndOrgRankingRepository.findLastCreatedUser(pageRequest);

        for (User u : lastUser.getContent()) {
            names.add(u.getName());
            String[] dateAndTime = DateHelper.getDateAndTimeAsString(u.get_regDate());

            dates.add(dateAndTime[0]);
            times.add(dateAndTime[1]);
        }

        final LastUserResource resource = new LastUserResource(names, dates, times);
        return new ResponseEntity<>(resource, HttpStatus.OK);
    }

    @Getter
    @AllArgsConstructor
    private class BestUserResource extends ResourceSupport {
        private List<String> names;
        private List<Long> amount;
        private List<Double> co2Saved;
    }

    @Getter
    @AllArgsConstructor
    private class LastUserResource extends ResourceSupport {
        private List<String> names;
        private List<String> dates;
        private List<String> times;
    }
}
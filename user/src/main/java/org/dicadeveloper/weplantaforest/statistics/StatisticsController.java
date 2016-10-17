package org.dicadeveloper.weplantaforest.statistics;

import java.util.ArrayList;
import java.util.List;

import org.dicadeveloper.weplantaforest.support.Uris;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired) )
@Profile({"production", "mysql", "staging"})
public class StatisticsController {

    private @NonNull StatisticsRepository _statisticsRepository;

    @RequestMapping(value = Uris.TREE_STATISTIC, method = RequestMethod.GET)
    public ResponseEntity<?> getTreeStatistic(@RequestParam String year) {
        List<TreeAmountStatisticData> treeStatistic = _statisticsRepository.getTreesPerMonthForYear(year);
        List<TreeAmountStatisticData> orderedList = new ArrayList<>();
        for (Integer i = 1; i <= 12; i++) {
            for (TreeAmountStatisticData entry : treeStatistic) {
                if (entry.getMonth()
                         .equals(i.toString())) {
                    orderedList.add(entry);
                }
            }
        }

        return new ResponseEntity<>(orderedList, HttpStatus.OK);

    }

}
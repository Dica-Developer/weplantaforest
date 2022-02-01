package org.dicadeveloper.weplantaforest.statistics;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Locale;

import org.dicadeveloper.weplantaforest.reports.co2.Co2Repository;
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
import lombok.val;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Profile({ "production", "mysql", "staging" })
public class StatisticsController {

    private @NonNull StatisticsRepository statisticsRepository;

    private @NonNull Co2Repository co2Repository;

    @RequestMapping(value = Uris.TREE_STATISTIC_PER_MONTH, method = RequestMethod.GET)
    public ResponseEntity<?> getTreeStatisticForYear(@RequestParam String year) {
        List<TreeAmountStatisticData> treeStatistic = statisticsRepository.getTreesPerMonthForYear(year);
        List<TreeAmountStatisticData> orderedList = new ArrayList<>();
        for (Integer i = 1; i <= 12; i++) {
            for (TreeAmountStatisticData entry : treeStatistic) {
                if (entry.getLabel().equals(i.toString())) {
                    orderedList.add(entry);
                }
            }
        }
        return new ResponseEntity<>(orderedList, HttpStatus.OK);
    }

    @RequestMapping(value = Uris.TREE_STATISTIC_PER_YEAR, method = RequestMethod.GET)
    public ResponseEntity<?> getOverallTreeStatistic() {
        List<TreeAmountStatisticData> treeStatistic = statisticsRepository.getTreesPerYear();
        List<TreeAmountStatisticData> orderedList = new ArrayList<>();

        Calendar year2007 = new GregorianCalendar(2007, 0, 1);
        int years = getDiffYears(year2007, new Date(System.currentTimeMillis()));

        for (Integer i = 2007; i <= (2007 + years); i++) {
            for (TreeAmountStatisticData entry : treeStatistic) {
                if (entry.getLabel().equals(i.toString())) {
                    orderedList.add(entry);
                }
            }
        }
        return new ResponseEntity<>(orderedList, HttpStatus.OK);
    }

    @RequestMapping(value = Uris.TREE_STATISTIC_PER_ORGTYPE, method = RequestMethod.GET)
    public ResponseEntity<?> getTreesPerOrgType() {
        List<TreeOrgTypeStatisticData> treeStatistic = statisticsRepository.getTreesPerOrgType();
        return new ResponseEntity<>(treeStatistic, HttpStatus.OK);
    }

    @RequestMapping(value = Uris.CO2_STATISTIC, method = RequestMethod.GET)
    public ResponseEntity<?> getCo2Statistic() {
        List<Co2StatisticData> result = new ArrayList<>();

        for (int year = 2008; year <= LocalDate.now().getYear() + 1; year++) {
            LocalDateTime startDate = null;
            if (year == (LocalDate.now().getYear() + 1)) {
                startDate = LocalDateTime.now();
            } else {
                startDate = LocalDateTime.of(year, 1, 1, 0, 0);
            }
            val co2 = co2Repository.getAllTreesAndCo2Saving(startDate.toInstant(ZoneOffset.UTC).toEpochMilli());
            Co2StatisticData co2StatisticData = new Co2StatisticData(Math.floor(co2.getCo2()), String.valueOf(startDate.getYear() - 1));
            result.add(co2StatisticData);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    private int getDiffYears(Calendar first, Date last) {
        Calendar b = getCalendar(last);
        return b.get(Calendar.YEAR) - first.get(Calendar.YEAR);
    }

    private Calendar getCalendar(Date date) {
        Calendar cal = Calendar.getInstance(Locale.GERMANY);
        cal.setTime(date);
        return cal;
    }

    @RequestMapping(value = Uris.USER_STATISTIC_PER_YEAR, method = RequestMethod.GET)
    public ResponseEntity<?> getOverallUserStatistic() {
        List<TreeAmountStatisticData> treeStatistic = statisticsRepository.getUserPerYear();
        List<TreeAmountStatisticData> orderedList = new ArrayList<>();
        orderedList.add(new TreeAmountStatisticData(0L, "2007"));

        Calendar year2007 = new GregorianCalendar(2007, 0, 1);
        int years = getDiffYears(year2007, new Date(System.currentTimeMillis()));

        for (Integer i = 2007; i <= 2007 + years; i++) {
            for (TreeAmountStatisticData entry : treeStatistic) {
                if (null != entry.getLabel() && entry.getLabel().equals(i.toString())) {
                    orderedList.add(entry);
                }
            }
        }
        return new ResponseEntity<>(orderedList, HttpStatus.OK);
    }

}
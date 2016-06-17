package org.dicadeveloper.weplantaforest.gift;

import java.util.List;

import org.dicadeveloper.weplantaforest.support.Uris;
import org.dicadeveloper.weplantaforest.views.Views;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired) )
public class GiftController {

    @Autowired
    private @NonNull GiftRepository _giftRepository;

    @RequestMapping(value = Uris.GIFTS_BY_CONSIGNOR + "{userId}", method = RequestMethod.GET)
    @JsonView(Views.OverviewGift.class)
    public List<Gift> findGiftsByConsignor(@PathVariable("userId") long userId) {
        return _giftRepository.findGiftsByConsignor(userId);
    }

    @RequestMapping(value = Uris.GIFTS_BY_RECIPIENT + "{userId}", method = RequestMethod.GET)
    @JsonView(Views.OverviewGift.class)
    public List<Gift> findGiftsByRecipient(@PathVariable("userId") long userId) {
        return _giftRepository.findGiftsByRecipient(userId);
    }

}

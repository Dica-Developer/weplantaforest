package org.dicadeveloper.weplantaforest.gift;

import java.util.List;

import javax.transaction.Transactional;

import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.cart.CartRepository;
import org.dicadeveloper.weplantaforest.code.Code;
import org.dicadeveloper.weplantaforest.code.CodeGenerator;
import org.dicadeveloper.weplantaforest.gift.Gift.Status;
import org.dicadeveloper.weplantaforest.planting.plantbag.PlantBag;
import org.dicadeveloper.weplantaforest.planting.plantbag.PlantBagValidator;
import org.dicadeveloper.weplantaforest.support.PlantBagToCartConverter;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.dicadeveloper.weplantaforest.user.User;
import org.dicadeveloper.weplantaforest.user.UserRepository;
import org.dicadeveloper.weplantaforest.views.Views;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired) )
public class GiftController {

    private @NonNull GiftRepository _giftRepository;

    private @NonNull PlantBagValidator _plantBagValidator;

    private @NonNull PlantBagToCartConverter plantBagToCartConverter;

    private @NonNull CartRepository _cartRepository;

    private @NonNull UserRepository _userRepository;

    private @NonNull CodeGenerator _codeGenerator;

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

    @RequestMapping(value = "/gift/create", method = RequestMethod.POST)
    @Transactional
    public ResponseEntity<?> generateGift(@RequestBody PlantBag plantBag) {
        if (_plantBagValidator.isPlantPageDataValid(plantBag)) {
            User consignor = _userRepository.findOne(plantBag.getUserId());

            Gift gift = new Gift();
            gift.setConsignor(consignor);
            gift.setStatus(Status.NEW);
            _giftRepository.save(gift);

            Code code = _codeGenerator.generate(gift);
            gift.setCode(code);
            _giftRepository.save(gift);

            Cart cart = plantBagToCartConverter.convertPlantPageDataToCart(plantBag);
            cart.setBuyer(consignor);
            cart.setCode(code);
            cart.setGift(true);
            _cartRepository.save(cart);

            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

}

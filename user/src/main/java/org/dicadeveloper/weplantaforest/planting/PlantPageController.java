package org.dicadeveloper.weplantaforest.planting;
import java.util.List;
import lombok.NonNull;
import org.dicadeveloper.weplantaforest.cart.CartService;
import org.dicadeveloper.weplantaforest.common.errorhandling.ErrorCodes;
import org.dicadeveloper.weplantaforest.common.errorhandling.IpatException;
import org.dicadeveloper.weplantaforest.common.errorhandling.IpatPreconditions;
import org.dicadeveloper.weplantaforest.messages.MessageByLocaleService;
import org.dicadeveloper.weplantaforest.planting.plantbag.PlantBag;
import org.dicadeveloper.weplantaforest.planting.plantbag.PlantBagHelper;
import org.dicadeveloper.weplantaforest.planting.plantbag.PlantBagValidator;
import org.dicadeveloper.weplantaforest.support.PlantBagToCartConverter;
import org.dicadeveloper.weplantaforest.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.cart.CartRepository;
import org.dicadeveloper.weplantaforest.cart.CartService;
import org.dicadeveloper.weplantaforest.cart.CartState;
import org.dicadeveloper.weplantaforest.code.Code;
import org.dicadeveloper.weplantaforest.code.CodeRepository;
import org.dicadeveloper.weplantaforest.common.errorhandling.ErrorCodes;
import org.dicadeveloper.weplantaforest.common.errorhandling.IpatException;
import org.dicadeveloper.weplantaforest.common.errorhandling.IpatPreconditions;
import org.dicadeveloper.weplantaforest.messages.MessageByLocaleService;
import org.dicadeveloper.weplantaforest.planting.plantbag.PlantBag;
import org.dicadeveloper.weplantaforest.planting.plantbag.PlantBagHelper;
import org.dicadeveloper.weplantaforest.planting.plantbag.PlantBagValidator;
import org.dicadeveloper.weplantaforest.security.TokenAuthenticationService;
import org.dicadeveloper.weplantaforest.support.PlantBagToCartConverter;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.dicadeveloper.weplantaforest.user.User;
import org.dicadeveloper.weplantaforest.user.UserRepository;
import org.dicadeveloper.weplantaforest.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import lombok.extern.slf4j.Slf4j;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.val;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Slf4j
public class PlantPageController {

    private @NonNull PlantBagHelper plantPageDataHelper;

    private @NonNull PlantBagToCartConverter plantPageToCartConverter;

    private @NonNull CartRepository _cartRepository;

    private @NonNull PlantBagValidator _plantPageDataValidator;

    private @NonNull TreeRepository _treeRepository;

    private @NonNull TokenAuthenticationService _tokenAuthenticationService;

    private @NonNull UserService _userHelper;

    private @NonNull MessageByLocaleService _messageByLocaleService;

    private @NonNull UserRepository _userRepository;

    private @NonNull CartService _cartService;

    private @NonNull CodeRepository _codeRepository;

    @RequestMapping(value = Uris.COMPLEX_PROPOSAL_FOR_PRICE + "{targetedPrice}", method = RequestMethod.GET)
    @Transactional
    public PlantBag getCartProposal(@PathVariable long targetedPrice) {
        return plantPageDataHelper.createPlantProposalForTargetPrice(targetedPrice);
    }

    @RequestMapping(value = Uris.COMPLEX_DONATION, method = RequestMethod.POST)
    @Transactional
    public ResponseEntity<Long> processPlant(@RequestHeader(value = "X-AUTH-TOKEN") String userToken, @RequestBody PlantBag plantBag) throws IpatException {
        val buyer = _tokenAuthenticationService.getBuyer(userToken);
        if (buyer != null) {
            final Cart previousUnpaidCart = _cartRepository.findCartByUserAndOpen(buyer.getId());
            if (null != previousUnpaidCart) {
                if (null != previousUnpaidCart.getCode()) {
                    Code code = previousUnpaidCart.getCode();
                    code.setCart(null);
                    previousUnpaidCart.setCode(null);
                    _codeRepository.delete(code);
                }
                _cartRepository.delete(previousUnpaidCart);
            }
            _plantPageDataValidator.validatePlantBag(plantBag);
            Cart cart = _cartService.createCartAndSave(plantBag, buyer, CartState.INITIAL);
            return new ResponseEntity<Long>(cart.getId(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

    }

    @RequestMapping(value = Uris.PLANT_FOR_USER, method = RequestMethod.POST)
    @Transactional
    public ResponseEntity<List<Long>> plantForUser(@RequestHeader(value = "X-AUTH-TOKEN") String userToken, @RequestBody PlantForUserRequest plantForUserRequest) throws IpatException {
        if (_tokenAuthenticationService.isAdmin(userToken)) {
            User buyer = _userRepository.findById(plantForUserRequest.getUserId()).orElse(null);
            IpatPreconditions.checkNotNull(buyer, ErrorCodes.USER_NOT_FOUND);
            _plantPageDataValidator.validatePlantBag(plantForUserRequest.getPlantBag());
            List<Cart> carts = _cartService.createCarts(plantForUserRequest.getPlantBag(), buyer, CartState.valueOf(plantForUserRequest.getCartState()),
                    (int) plantForUserRequest.getAmountOfPlantBags());
            for(Cart c: carts) {
              c.setReceiptable(false);
              _cartRepository.save(c);
            }
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

    }

    @RequestMapping(value = Uris.VALIDATE_PLANTBAG, method = RequestMethod.POST)
    public ResponseEntity<?> validatePlantBag(@RequestHeader(value = "X-AUTH-TOKEN") String userToken, @RequestBody PlantBag plantBag) throws IpatException {
        if (_tokenAuthenticationService.isAdmin(userToken)) {
            _plantPageDataValidator.validatePlantBag(plantBag);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

}

package org.dicadeveloper.weplantaforest.planting;

import java.util.List;

import org.dicadeveloper.weplantaforest.cart.CartRepository;
import org.dicadeveloper.weplantaforest.cart.CartService;
import org.dicadeveloper.weplantaforest.cart.CartState;
import org.dicadeveloper.weplantaforest.common.errorHandling.ErrorCodes;
import org.dicadeveloper.weplantaforest.common.errorHandling.IpatException;
import org.dicadeveloper.weplantaforest.common.errorHandling.IpatPreconditions;
import org.dicadeveloper.weplantaforest.messages.MessageByLocaleService;
import org.dicadeveloper.weplantaforest.planting.plantbag.PlantBag;
import org.dicadeveloper.weplantaforest.planting.plantbag.PlantBagHelper;
import org.dicadeveloper.weplantaforest.planting.plantbag.PlantBagValidator;
import org.dicadeveloper.weplantaforest.security.TokenAuthenticationService;
import org.dicadeveloper.weplantaforest.support.PlantBagToCartConverter;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.dicadeveloper.weplantaforest.user.User;
import org.dicadeveloper.weplantaforest.user.UserHelper;
import org.dicadeveloper.weplantaforest.user.UserRepository;
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

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired) )
public class PlantPageController {

    private @NonNull PlantBagHelper plantPageDataHelper;

    private @NonNull PlantBagToCartConverter plantPageToCartConverter;

    private @NonNull CartRepository _cartRepository;

    private @NonNull PlantBagValidator _plantPageDataValidator;

    private @NonNull TreeRepository _treeRepository;

    private @NonNull TokenAuthenticationService _tokenAuthenticationService;

    private @NonNull UserHelper _userHelper;

    private @NonNull MessageByLocaleService _messageByLocaleService;

    private @NonNull UserRepository _userRepsoitory;

    private @NonNull CartService _cartService;

    @RequestMapping(value = Uris.COMPLEX_PROPOSAL_FOR_PRICE + "{targetedPrice}", method = RequestMethod.GET)
    @Transactional
    public PlantBag getCartProposal(@PathVariable long targetedPrice) {
        return plantPageDataHelper.createPlantProposalForTargetPrice(targetedPrice);
    }

    @RequestMapping(value = Uris.COMPLEX_DONATION, method = RequestMethod.POST)
    @Transactional
    public ResponseEntity<Long> processPlant(@RequestHeader(value = "X-AUTH-TOKEN") String userToken, @RequestBody PlantBag plantBag) throws IpatException {
        User buyer = _tokenAuthenticationService.getBuyer(userToken);
        if (buyer != null) {
            long cartId = _cartService.createCartAndSave(plantBag, buyer, CartState.INITIAL);
            return new ResponseEntity<Long>(cartId, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

    }

    @RequestMapping(value = Uris.PLANT_FOR_USER, method = RequestMethod.POST)
    @Transactional
    public ResponseEntity<List<Long>> plantForUser(@RequestBody PlantForUserRequest plantForUserRequest) throws IpatException {
        User buyer = _userRepsoitory.findOne(plantForUserRequest.getUserId());
        IpatPreconditions.checkNotNull(buyer, ErrorCodes.USER_NOT_FOUND);
        _plantPageDataValidator.validatePlantBag(plantForUserRequest.getPlantBag());
        List<Long> cartIds = _cartService.createCarts(plantForUserRequest.getPlantBag(), buyer, CartState.valueOf(plantForUserRequest.getCartState()), (int) plantForUserRequest.getAmountOfPlantBags());
        return new ResponseEntity<List<Long>>(cartIds, HttpStatus.OK);

    }

    @RequestMapping(value = Uris.VALIDATE_PLANTBAG, method = RequestMethod.POST)
    public ResponseEntity<?> validatePlantBag(@RequestBody PlantBag plantBag) throws IpatException {
        _plantPageDataValidator.validatePlantBag(plantBag);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}

package org.dicadeveloper.weplantaforest.planting;

import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.cart.CartRepository;
import org.dicadeveloper.weplantaforest.common.support.Language;
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

    private final static String ANONYMOUS_TOKEN = "anonym-user";

    @RequestMapping(value = Uris.COMPLEX_PROPOSAL_FOR_PRICE + "{targetedPrice}", method = RequestMethod.GET)
    @Transactional
    public PlantBag getCartProposal(@PathVariable long targetedPrice) {
        return plantPageDataHelper.createPlantProposalForTargetPrice(targetedPrice);
    }

   
    @RequestMapping(value = Uris.COMPLEX_DONATION, method = RequestMethod.POST)
    @Transactional
    public ResponseEntity<Long> processPlant(@RequestHeader(value = "X-AUTH-TOKEN") String userToken, @RequestBody PlantBag plantBag) {       
        String message;
        if (_plantPageDataValidator.isPlantPageDataValid(plantBag)) {
            User buyer = _tokenAuthenticationService.getUserFromToken(userToken);
            if (buyer == null) {
                if (userToken.equals(ANONYMOUS_TOKEN)) {
                    buyer = _userHelper.createAnonymous();
                    if (buyer == null) {
                        message = _messageByLocaleService.getMessage("no.anonymous.created", Language.DEUTSCH.getLocale());
                        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                    }else{
                        Cart cart = plantPageToCartConverter.convertPlantPageDataToCart(plantBag, buyer);
                        _cartRepository.save(cart);
                        return new ResponseEntity<Long>(cart.getId(), HttpStatus.OK);
                    }
                }else {
                    return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
                }
            } else{
                Cart cart = plantPageToCartConverter.convertPlantPageDataToCart(plantBag, buyer);
                _cartRepository.save(cart);
                return new ResponseEntity<Long>(cart.getId(), HttpStatus.OK);                
            }
        } else {
            // TODO: add validation messages to PlantBagValidation results
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }
    
    @RequestMapping(value = Uris.PLANT_FOR_USER , method = RequestMethod.POST)
    @Transactional
    public ResponseEntity<Long> plantForUser(@RequestBody PlantForUserRequest plantForUserRequest) {       
        if (_plantPageDataValidator.isPlantPageDataValid(plantForUserRequest.getPlantBag())) {
            User buyer = _userRepsoitory.findOne(plantForUserRequest.getUserId());
            if (buyer == null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            } else{
                Cart cart = plantPageToCartConverter.convertPlantPageDataToCart(plantForUserRequest.getPlantBag(), buyer);
                _cartRepository.save(cart);
                return new ResponseEntity<Long>(cart.getId(), HttpStatus.OK);                
            }
        } else {
            // TODO: add validation messages to PlantBagValidation results
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

}

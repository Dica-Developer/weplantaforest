package org.dicadeveloper.weplantaforest.planting;

import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.cart.CartRepository;
import org.dicadeveloper.weplantaforest.common.errorHandling.IpatException;
import org.dicadeveloper.weplantaforest.planting.plantbag.SimplePlantBag;
import org.dicadeveloper.weplantaforest.planting.plantbag.SimplePlantBagHelper;
import org.dicadeveloper.weplantaforest.planting.plantbag.SimplePlantBagValidator;
import org.dicadeveloper.weplantaforest.security.TokenAuthenticationService;
import org.dicadeveloper.weplantaforest.support.PlantBagToCartConverter;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.dicadeveloper.weplantaforest.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired) )
public class SimplePlantPageController {

    private @NonNull SimplePlantBagHelper simplePlantPageDataHelper;

    private @NonNull PlantBagToCartConverter plantPageToCartConverter;

    private @NonNull CartRepository _cartRepository;

    private @NonNull SimplePlantBagValidator _simplePlantPageDataValidator;

    private @NonNull TreeRepository _treeRepository;

    private @NonNull TokenAuthenticationService _tokenAuthenticationService;

    @RequestMapping(value = Uris.SIMPLE_PROPOSAL_FOR_TREE + "{amountOfTrees}", method = RequestMethod.GET)
    @Transactional
    public SimplePlantBag getCartProposalForAmountOfTrees(@PathVariable long amountOfTrees) throws IpatException {
        return simplePlantPageDataHelper.createPlantProposalForAmountOfTrees(amountOfTrees);
    }

    @RequestMapping(value = Uris.SIMPLE_PROPOSAL_FOR_TREE_AND_PROJECT, method = RequestMethod.GET)
    @Transactional
    public SimplePlantBag getCartProposalForAmountOfTrees(@RequestParam String projectName, @RequestParam long amountOfTrees) {
        return simplePlantPageDataHelper.createPlantProposalForAmountOfTrees(projectName, amountOfTrees);
    }

    @RequestMapping(value = Uris.SIMPLE_DONATION, method = RequestMethod.POST)
    public ResponseEntity<?> processPlant(@RequestHeader(value = "X-AUTH-TOKEN") String userToken, @RequestBody SimplePlantBag plantPageData) {
        User buyer = _tokenAuthenticationService.getUserFromToken(userToken);
        if (buyer != null) {
            if (_simplePlantPageDataValidator.isPlantPageDataValid(plantPageData)) {
                Cart cart = plantPageToCartConverter.convertSimplePlantPageDataToCart(plantPageData, buyer);
                _cartRepository.save(cart);
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

}

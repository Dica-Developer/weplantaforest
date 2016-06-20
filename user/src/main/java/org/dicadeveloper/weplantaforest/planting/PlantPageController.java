package org.dicadeveloper.weplantaforest.planting;

import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.cart.CartRepository;
import org.dicadeveloper.weplantaforest.planting.plantbag.PlantBag;
import org.dicadeveloper.weplantaforest.planting.plantbag.PlantBagHelper;
import org.dicadeveloper.weplantaforest.planting.plantbag.PlantBagValidator;
import org.dicadeveloper.weplantaforest.support.PlantBagToCartConverter;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
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

    @RequestMapping(value = Uris.COMPLEX_PROPOSAL_FOR_PRICE + "{targetedPrice}", method = RequestMethod.GET)
    @Transactional
    public PlantBag getCartProposal(@PathVariable long targetedPrice) {
        return plantPageDataHelper.createPlantProposalForTargetPrice(targetedPrice);
    }

    @RequestMapping(value = Uris.COMPLEX_DONATION, method = RequestMethod.POST)
    @Transactional
    public ResponseEntity<?> processPlant(@RequestBody PlantBag plantPageData) {

        if (_plantPageDataValidator.isPlantPageDataValid(plantPageData)) {
            Cart cart = plantPageToCartConverter.convertPlantPageDataToCart(plantPageData);
            _cartRepository.save(cart);

            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}

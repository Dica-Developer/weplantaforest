package org.dicadeveloper.weplantaforest.planting;

import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.cart.CartRepository;
import org.dicadeveloper.weplantaforest.planting.plantbag.SimplePlantBag;
import org.dicadeveloper.weplantaforest.planting.plantbag.SimplePlantBagHelper;
import org.dicadeveloper.weplantaforest.planting.plantbag.SimplePlantBagValidator;
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
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class SimplePlantPageController {

    private @NonNull SimplePlantBagHelper simplePlantPageDataHelper;

    private @NonNull PlantBagToCartConverter plantPageToCartConverter;

    private @NonNull CartRepository _cartRepository;

    private @NonNull SimplePlantBagValidator _simplePlantPageDataValidator;

    private @NonNull TreeRepository _treeRepository;

    @RequestMapping(value = Uris.SIMPLE_PROPOSAL_FOR_TREE + "{amountOfTrees}", method = RequestMethod.GET)
    @Transactional
    public SimplePlantBag getCartProposalForAmountOfTrees(@PathVariable long amountOfTrees) {
        return simplePlantPageDataHelper.createPlantProposalForAmountOfTrees(amountOfTrees);
    }

    @RequestMapping(value = Uris.SIMPLE_DONATION, method = RequestMethod.POST)
    public ResponseEntity<?> processPlant(@RequestBody SimplePlantBag plantPageData) {
        if (_simplePlantPageDataValidator.isPlantPageDataValid(plantPageData)) {
            Cart cart = plantPageToCartConverter.convertSimplePlantPageDataToCart(plantPageData);
            _cartRepository.save(cart);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}

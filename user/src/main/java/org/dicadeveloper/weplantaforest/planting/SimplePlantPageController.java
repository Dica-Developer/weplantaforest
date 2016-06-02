package org.dicadeveloper.weplantaforest.planting;

import java.util.List;

import org.dicadeveloper.weplantaforest.admin.codes.Cart;
import org.dicadeveloper.weplantaforest.admin.codes.CartRepository;
import org.dicadeveloper.weplantaforest.support.CartToTreeListConverter;
import org.dicadeveloper.weplantaforest.support.PlantPageDataToCartConverter;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.dicadeveloper.weplantaforest.trees.Tree;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    private @NonNull SimplePlantPageDataHelper simplePlantPageDataHelper;

    private @NonNull PlantPageDataToCartConverter plantPageToCartConverter;

    private @NonNull CartRepository _cartRepository;

    private @NonNull SimplePlantPageDataValidator _simplePlantPageDataValidator;

    private @NonNull CartToTreeListConverter _cartToTreeListConverter;

    private @NonNull TreeRepository _treeRepository;

    @RequestMapping(value = Uris.SIMPLE_PROPOSAL_FOR_TREE + "{amountOfTrees}", method = RequestMethod.GET)
    public SimplePlantPageData getCartProposalForAmountOfTrees(@PathVariable long amountOfTrees) {
        return simplePlantPageDataHelper.createPlantProposalForAmountOfTrees(amountOfTrees);
    }

    @RequestMapping(value = Uris.SIMPLE_DONATION, method = RequestMethod.POST)
    public ResponseEntity<?> processPlant(@RequestBody SimplePlantPageData plantPageData) {

        if (_simplePlantPageDataValidator.isPlantPageDataValid(plantPageData)) {
            Cart cart = plantPageToCartConverter.convertSimplePlantPageDataToCart(plantPageData);
            _cartRepository.save(cart);

            List<Tree> treeList = _cartToTreeListConverter.createTreeListFromCart(cart);
            _treeRepository.save(treeList);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}

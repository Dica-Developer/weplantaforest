package org.dicadeveloper.weplantaforest.planting;

import org.dicadeveloper.weplantaforest.admin.codes.Cart;
import org.dicadeveloper.weplantaforest.admin.codes.CartRepository;
import org.dicadeveloper.weplantaforest.support.PlantPageDataToCartConverter;
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
public class PlantPageController {

    private @NonNull PlantPageHelper plantPageHelper;

    private @NonNull PlantPageDataToCartConverter plantPageToCartConverter;

    private @NonNull CartRepository _cartRepository;

    private @NonNull PlantPageDataValidator _plantPageDataValidator;

    @RequestMapping(value = "/plantProposal/{targetedPrice}", method = RequestMethod.GET)
    public PlantPageData getCartProposal(@PathVariable long targetedPrice) {
        return plantPageHelper.createPlantProposalForTargetPrice(targetedPrice);
    }

    @RequestMapping(value = "/donateTrees", method = RequestMethod.POST)
    public ResponseEntity<?> processPlant(@RequestBody PlantPageData plantPageData) {

        if (_plantPageDataValidator.isPlantPageDataValid(plantPageData)) {
            Cart cart = plantPageToCartConverter.convertPlantPageDataToCart(plantPageData);
            _cartRepository.save(cart);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}

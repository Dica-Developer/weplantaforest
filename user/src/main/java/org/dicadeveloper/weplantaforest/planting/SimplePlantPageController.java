package org.dicadeveloper.weplantaforest.planting;

import org.dicadeveloper.weplantaforest.admin.codes.CartRepository;
import org.dicadeveloper.weplantaforest.support.PlantPageDataToCartConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class SimplePlantPageController {

    private @NonNull PlantPageDataHelper plantPagePriceHelper;
    
    private @NonNull SimplePlantPageDataHelper plantPageTreeHelper;
    
    private @NonNull PlantPageDataToCartConverter plantPageToCartConverter;

    private @NonNull CartRepository _cartRepository;

    private @NonNull PlantPageDataValidator _plantPageDataValidator;

    @RequestMapping(value = "/simplePlantProposalForTrees/{amountOfTrees}", method = RequestMethod.GET)
    public SimplePlantPageData getCartProposalForAmountOfTrees(@PathVariable long amountOfTrees) {
        return plantPageTreeHelper.createPlantProposalForAmountOfTrees(amountOfTrees);
    }

}

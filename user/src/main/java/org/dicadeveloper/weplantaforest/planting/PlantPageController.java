package org.dicadeveloper.weplantaforest.planting;

import org.dicadeveloper.weplantaforest.admin.codes.Cart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class PlantPageController {

   private @NonNull PlantPageHelper cartHelper;

    @RequestMapping(value = "/cartProposal", method = RequestMethod.GET)
    public Cart getCartProposal() {
        return cartHelper.createCartProposal();
    }

}

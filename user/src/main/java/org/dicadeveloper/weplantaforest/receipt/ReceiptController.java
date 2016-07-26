package org.dicadeveloper.weplantaforest.receipt;

import java.util.List;

import org.dicadeveloper.weplantaforest.support.Uris;
import org.dicadeveloper.weplantaforest.views.Views;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired) )
public class ReceiptController {

    private @NonNull ReceiptRepository _receiptReopository;

    @RequestMapping(value = Uris.RECEIPTS, method = RequestMethod.GET)
    @JsonView(Views.ReceiptOverview.class)
    public List<Receipt> getReceiptsByOwnerId(@RequestParam Long ownerId) {
        return _receiptReopository.findByOwnerId(ownerId);
    }
    
    

}

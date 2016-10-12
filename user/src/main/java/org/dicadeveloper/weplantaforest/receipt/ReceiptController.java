package org.dicadeveloper.weplantaforest.receipt;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dicadeveloper.weplantaforest.security.TokenAuthenticationService;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.dicadeveloper.weplantaforest.user.User;
import org.dicadeveloper.weplantaforest.views.Views;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestHeader;
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

    private @NonNull ReceiptRepository _receiptRepository;

    private @NonNull TokenAuthenticationService _tokenAuthenticationService;
    
    protected final Log LOG = LogFactory.getLog(ReceiptController.class.getName());

    private final static String RELATIVE_STATIC_IMAGES_PATH = "/static/images/pdf";

    @RequestMapping(value = Uris.RECEIPTS, method = RequestMethod.GET)
    @JsonView(Views.ReceiptOverview.class)
    public ResponseEntity<?> getReceiptsByOwnerId(@RequestHeader(value = "X-AUTH-TOKEN") String userToken) {
        User user = _tokenAuthenticationService.getUserFromToken(userToken);
        if(user == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);             
        }else{
            List<Receipt> receipts = _receiptRepository.findByOwnerId(user.getId());
            return new ResponseEntity<>(receipts, HttpStatus.OK);
        }        
    }

    @RequestMapping(value = Uris.RECEIPT_PDF, method = RequestMethod.GET, headers = "Accept=application/pdf")
    public ResponseEntity<?> createReceiptPdf(HttpServletResponse response, @RequestParam Long receiptId) {
        Receipt receipt = _receiptRepository.findOne(receiptId);
        PdfReceiptView pdf = new PdfReceiptView();

        try {
            pdf.writePdfDataToOutputStream(response.getOutputStream(), RELATIVE_STATIC_IMAGES_PATH, receipt);
        } catch (Exception e) {
            LOG.error("Error occured while creating PDF for receipt with id " + receiptId + "!\n", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(HttpStatus.OK);

    }

}

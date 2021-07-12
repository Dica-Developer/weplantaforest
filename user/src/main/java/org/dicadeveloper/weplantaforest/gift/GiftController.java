package org.dicadeveloper.weplantaforest.gift;

import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dicadeveloper.weplantaforest.cart.CartRepository;
import org.dicadeveloper.weplantaforest.code.CodeGenerator;
import org.dicadeveloper.weplantaforest.common.errorhandling.IpatException;
import org.dicadeveloper.weplantaforest.messages.MessageByLocaleService;
import org.dicadeveloper.weplantaforest.planting.plantbag.PlantBag;
import org.dicadeveloper.weplantaforest.planting.plantbag.PlantBagValidator;
import org.dicadeveloper.weplantaforest.security.TokenAuthenticationService;
import org.dicadeveloper.weplantaforest.support.PlantBagToCartConverter;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.dicadeveloper.weplantaforest.user.UserRepository;
import org.dicadeveloper.weplantaforest.views.Views;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.val;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class GiftController {

    protected final static Log LOG = LogFactory.getLog(GiftController.class.getName());

    private @NonNull GiftRepository _giftRepository;

    private @NonNull GiftService _giftService;

    private @NonNull PlantBagValidator _plantBagValidator;

    private @NonNull PlantBagToCartConverter plantBagToCartConverter;

    private @NonNull CartRepository _cartRepository;

    private @NonNull UserRepository _userRepository;

    private @NonNull CodeGenerator _codeGenerator;

    private @NonNull TokenAuthenticationService _tokenAuthenticationService;

    private @NonNull MessageByLocaleService _messageByLocaleService;

    @RequestMapping(value = Uris.GIFTS_BY_CONSIGNOR, method = RequestMethod.GET)
    @JsonView(Views.OverviewGift.class)
    public ResponseEntity<?> findGiftsByConsignor(@RequestHeader(value = "X-AUTH-TOKEN") String userToken, @RequestParam String userName) {
        if (_tokenAuthenticationService.isAuthenticatedUser(userToken, userName)) {
            List<Gift> gifts = _giftRepository.findGiftsByConsignorExceptStatusNew(userName);
            return new ResponseEntity<>(gifts, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @RequestMapping(value = Uris.GIFTS_BY_RECIPIENT, method = RequestMethod.GET)
    @JsonView(Views.OverviewGift.class)
    public ResponseEntity<?> findGiftsByRecipient(@RequestHeader(value = "X-AUTH-TOKEN") String userToken, @RequestParam String userName) {
        if (_tokenAuthenticationService.isAuthenticatedUser(userToken, userName)) {
            List<Gift> gifts = _giftRepository.findGiftsByRecipient(userName);
            return new ResponseEntity<>(gifts, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    /*
     * inserting Gift and Cart to database and returning the
     * cartId(responseIds[0]) and giftId(responseIds[1])
     */
    @RequestMapping(value = Uris.GIFT_CREATE, method = RequestMethod.POST)
    @Transactional
    public ResponseEntity<?> generateGift(@RequestHeader(value = "X-AUTH-TOKEN") String userToken, @RequestBody PlantBag plantBag) throws IpatException {
        val authUser = _tokenAuthenticationService.getUserFromToken(userToken);
        if (authUser != null) {
            val consignor = _userRepository.findByName(authUser.getName());
            Long[] responseIds = _giftService.generateGift(consignor, plantBag);
            return new ResponseEntity<>(responseIds, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @RequestMapping(value = Uris.GIFT_PDF, method = RequestMethod.GET, headers = "Accept=application/pdf")
    public ResponseEntity<?> createGiftPdf(HttpServletResponse response, @RequestHeader(value = "X-AUTH-TOKEN") String userToken, @RequestParam long giftId) throws IpatException {
        val gift = _giftRepository.findById(giftId).orElse(null);
        val isAllowed = _tokenAuthenticationService.isAuthenticatedUser(userToken, gift.getConsignor().getUsername());
        if (isAllowed) {
            _giftService.createGiftPdf(giftId, response);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

}

package org.dicadeveloper.weplantaforest.gift;

import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.cart.CartRepository;
import org.dicadeveloper.weplantaforest.code.Code;
import org.dicadeveloper.weplantaforest.code.CodeGenerator;
import org.dicadeveloper.weplantaforest.gift.Gift.Status;
import org.dicadeveloper.weplantaforest.planting.plantbag.PlantBag;
import org.dicadeveloper.weplantaforest.planting.plantbag.PlantBagValidator;
import org.dicadeveloper.weplantaforest.support.PlantBagToCartConverter;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.dicadeveloper.weplantaforest.trees.Tree;
import org.dicadeveloper.weplantaforest.user.User;
import org.dicadeveloper.weplantaforest.user.UserRepository;
import org.dicadeveloper.weplantaforest.views.Views;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired) )
public class GiftController {

    protected final static Log LOG = LogFactory.getLog(GiftController.class.getName());

    private @NonNull GiftRepository _giftRepository;

    private @NonNull PlantBagValidator _plantBagValidator;

    private @NonNull PlantBagToCartConverter plantBagToCartConverter;

    private @NonNull CartRepository _cartRepository;

    private @NonNull UserRepository _userRepository;

    private @NonNull CodeGenerator _codeGenerator;

    private final static String RELATIVE_STATIC_IMAGES_PATH = "src/main/resources/static/images/pdf";

    @RequestMapping(value = Uris.GIFTS_BY_CONSIGNOR + "{userId}", method = RequestMethod.GET)
    @JsonView(Views.OverviewGift.class)
    public List<Gift> findGiftsByConsignor(@PathVariable("userId") long userId) {
        return _giftRepository.findGiftsByConsignor(userId);
    }

    @RequestMapping(value = Uris.GIFTS_BY_RECIPIENT + "{userId}", method = RequestMethod.GET)
    @JsonView(Views.OverviewGift.class)
    public List<Gift> findGiftsByRecipient(@PathVariable("userId") long userId) {
        return _giftRepository.findGiftsByRecipient(userId);
    }

    @RequestMapping(value = Uris.GIFT_CREATE, method = RequestMethod.POST)
    @Transactional
    public ResponseEntity<?> generateGift(@RequestBody PlantBag plantBag) {
        if (_plantBagValidator.isPlantPageDataValid(plantBag)) {
            User consignor = _userRepository.findOne(plantBag.getUserId());
            Cart cart = plantBagToCartConverter.convertPlantPageDataToCart(plantBag);

            Gift gift = new Gift();
            gift.setConsignor(consignor);
            gift.setStatus(Status.NEW);

            Code code = _codeGenerator.generate(gift);
            code.setTreeCount(cart.getTreeCount());

            gift.setCode(code);
            _giftRepository.save(gift);

            cart.setCode(code);
            cart.setGift(true);
            _cartRepository.save(cart);

            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = Uris.GIFT_PDF, method = RequestMethod.GET, headers = "Accept=application/pdf")
    public ResponseEntity<?> createGiftPdf(HttpServletResponse response, @RequestParam long giftId) {
        Gift gift = _giftRepository.findOne(giftId);
        Code code = gift.getCode();

        String codeString = code.getCode();
        String[] splittedCode = codeString.split("-");

        PdfGiftView pdf = new PdfGiftView();

        try {
            pdf.buildPdfDocument(response.getOutputStream(), gift.getConsignor()
                                                                 .getMail(),
                    code.getTreeCount(), splittedCode, RELATIVE_STATIC_IMAGES_PATH);
        } catch (Exception e) {
            LOG.error("Error occured while creating PDF!", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = Uris.GIFT_REDEEM, method = RequestMethod.GET)
    @Transactional
    public ResponseEntity<?> redeemGiftCode(@RequestParam String giftCode, @RequestParam long userId) {
        if (_codeGenerator.isValid(giftCode)) {
            Gift gift = _giftRepository.findGiftByCode(giftCode);
            if (gift.getStatus() == Status.UNREDEEMED) {
                User recipient = _userRepository.findOne(userId);
                Cart cartToGift = _cartRepository.findCartByCode(giftCode);

                gift.setRecipient(recipient);
                gift.setStatus(Status.REDEEMED);

                for (Tree cartTree : cartToGift.getTrees()) {
                    cartTree.setOwner(recipient);
                }
                _cartRepository.save(cartToGift);
                _giftRepository.save(gift);
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

}

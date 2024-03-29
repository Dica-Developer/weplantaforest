package org.dicadeveloper.weplantaforest.gift;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;

import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.cart.CartRepository;
import org.dicadeveloper.weplantaforest.cart.CartState;
import org.dicadeveloper.weplantaforest.code.Code;
import org.dicadeveloper.weplantaforest.code.CodeGenerator;
import org.dicadeveloper.weplantaforest.code.CodeRepository;
import org.dicadeveloper.weplantaforest.common.errorhandling.ErrorCodes;
import org.dicadeveloper.weplantaforest.common.errorhandling.IpatException;
import org.dicadeveloper.weplantaforest.common.errorhandling.IpatPreconditions;
import org.dicadeveloper.weplantaforest.gift.Gift.Status;
import org.dicadeveloper.weplantaforest.messages.MessageByLocaleService;
import org.dicadeveloper.weplantaforest.planting.plantbag.PlantBag;
import org.dicadeveloper.weplantaforest.planting.plantbag.PlantBagValidator;
import org.dicadeveloper.weplantaforest.support.PlantBagToCartConverter;
import org.dicadeveloper.weplantaforest.trees.Tree;
import org.dicadeveloper.weplantaforest.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class GiftService {

    private @NonNull GiftRepository _giftRepository;

    private @NonNull CodeRepository _codeRepository;

    private @NonNull CodeGenerator _codeGenerator;

    private @NonNull PlantBagToCartConverter plantBagToCartConverter;

    private @NonNull CartRepository _cartRepository;

    private @NonNull PlantBagValidator _plantBagValidator;

    private @NonNull MessageByLocaleService _messageByLocaleService;

    private final static String RELATIVE_STATIC_IMAGES_PATH = "/static/images/pdf";
    private final static String RELATIVE_STATIC_FONT_PATH = "/static/font";


    @Transactional
    public Long[] generateGift(User consignor, PlantBag plantBag) throws IpatException {
        Long[] ids = new Long[2];
        _plantBagValidator.validatePlantBag(plantBag);
        Cart cart = plantBagToCartConverter.convertPlantPageDataToCart(plantBag, consignor, CartState.INITIAL);

        Gift gift = new Gift();
        gift.setConsignor(consignor);
        gift.setStatus(Status.NEW);

        Code code = _codeGenerator.generate(gift);

        gift.setCode(code);
        _giftRepository.save(gift);

        cart.setCode(code);
        cart.setGift(true);
        cart = _cartRepository.save(cart);

        code.setCart(cart);
        _codeRepository.save(code);

        ids[0] = cart.getId();
        ids[1] = gift.getId();
        return ids;
    }

    @Transactional
    public void redeemGiftCode(User recipient, String giftCode) throws IpatException {
        Gift gift = _giftRepository.findGiftByCode(giftCode);
        IpatPreconditions.checkNotNull(gift, ErrorCodes.GIFT_IS_NULL);

        boolean isGiftOnlyCreatedButNotPaid = (gift.getStatus() == Status.NEW);
        IpatPreconditions.checkArgument(!isGiftOnlyCreatedButNotPaid, ErrorCodes.GIFT_NOT_PAID);

        boolean isGiftAlreadyRedeemed = (gift.getStatus() == Status.REDEEMED);
        IpatPreconditions.checkArgument(!isGiftAlreadyRedeemed, ErrorCodes.CODE_ALREADY_REDEEMED);

        Cart cartToGift = _cartRepository.findCartByCode(giftCode);
        IpatPreconditions.checkNotNull(cartToGift, ErrorCodes.CART_TO_GIFT_IS_NULL);

        gift.setRecipient(recipient);
        gift.setStatus(Status.REDEEMED);

        for (Tree cartTree : cartToGift.getTrees()) {
            cartTree.setOwner(recipient);
        }
        _cartRepository.save(cartToGift);
        _giftRepository.save(gift);
    }

    public void createGiftPdf(long giftId, HttpServletResponse response) throws Exception {
        Gift gift = _giftRepository.findById(giftId).orElse(null);
        IpatPreconditions.checkNotNull(gift, ErrorCodes.GIFT_IS_NULL);
        Code code = gift.getCode();
        String codeString = code.getCode();

        Cart cart = _cartRepository.findCartByCode(codeString);
        IpatPreconditions.checkNotNull(cart, ErrorCodes.CART_TO_GIFT_IS_NULL);
        int treeCount = cart.getTreeCount();

        String[] splittedCode = codeString.split("-");

        PdfGiftView pdf = new PdfGiftView();

        Map<String, String> pdfTexts = generateTextMap(cart.getBuyer().getLang().getLocale());
        pdfTexts.put("treeCount", String.valueOf(treeCount));

        try {
            pdf.buildPdfDocument(response.getOutputStream(), pdfTexts, splittedCode, RELATIVE_STATIC_IMAGES_PATH, RELATIVE_STATIC_FONT_PATH);
        } catch (Exception e) {
          throw e;
            // throw new IpatException(ErrorCodes.ERROR_WHILE_CREATING_PDF_FOR_GIFT);
        }
    }

    private Map<String, String> generateTextMap(Locale locale) {
        Map<String, String> textMap = new HashMap<String, String>();
        textMap.put("gift.gift", _messageByLocaleService.getMessage("gift.gift", locale));
        textMap.put("gift.about", _messageByLocaleService.getMessage("gift.about", locale));
        textMap.put("gift.tree", _messageByLocaleService.getMessage("gift.tree", locale));
        textMap.put("gift.trees", _messageByLocaleService.getMessage("gift.trees", locale));
        textMap.put("gift.planted_from", _messageByLocaleService.getMessage("gift.planted_from", locale));
        textMap.put("header_homepage", _messageByLocaleService.getMessage("header_homepage", locale));
        textMap.put("adress_1", _messageByLocaleService.getMessage("adress_1", locale));
        textMap.put("adress_2", _messageByLocaleService.getMessage("adress_2", locale));
        textMap.put("bank_adress_1", _messageByLocaleService.getMessage("bank_adress_1", locale));
        textMap.put("bank_adress_2", _messageByLocaleService.getMessage("bank_adress_2", locale));
        textMap.put("bank_adress_3", _messageByLocaleService.getMessage("bank_adress_3", locale));
        textMap.put("gift.redeem", _messageByLocaleService.getMessage("gift.redeem", locale));
        textMap.put("gift.redeem_1", _messageByLocaleService.getMessage("gift.redeem_1", locale));
        textMap.put("gift.redeem_2", _messageByLocaleService.getMessage("gift.redeem_2", locale));
        textMap.put("gift.redeem_3", _messageByLocaleService.getMessage("gift.redeem_3", locale));
        textMap.put("gift.redeem_4", _messageByLocaleService.getMessage("gift.redeem_4", locale));
        textMap.put("gift.redeem_5", _messageByLocaleService.getMessage("gift.redeem_5", locale));

        return textMap;
    }
}

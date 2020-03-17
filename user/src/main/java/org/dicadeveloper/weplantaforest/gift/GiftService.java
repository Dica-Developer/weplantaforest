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

    public void createGiftPdf(long giftId, HttpServletResponse response) throws IpatException {
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
            pdf.buildPdfDocument(response.getOutputStream(), pdfTexts, splittedCode, RELATIVE_STATIC_IMAGES_PATH);
        } catch (Exception e) {
            throw new IpatException(ErrorCodes.ERROR_WHILE_CREATING_PDF_FOR_GIFT);
        }
    }

    private Map<String, String> generateTextMap(Locale locale) {
        Map<String, String> textMap = new HashMap<String, String>();
        textMap.put("gift.gift", _messageByLocaleService.getMessage("gift.gift", locale));
        textMap.put("gift.planted_tree", _messageByLocaleService.getMessage("gift.planted_tree", locale));
        textMap.put("gift.planted_trees", _messageByLocaleService.getMessage("gift.planted_trees", locale));
        textMap.put("gift.main_text", _messageByLocaleService.getMessage("gift.main_text", locale));
        textMap.put("gift.call_url", _messageByLocaleService.getMessage("gift.call_url", locale));
        textMap.put("gift.how_it_works", _messageByLocaleService.getMessage("gift.how_it_works", locale));
        textMap.put("gift.insert_code", _messageByLocaleService.getMessage("gift.insert_code", locale));
        textMap.put("gift.now_login", _messageByLocaleService.getMessage("gift.now_login", locale));
        textMap.put("gift.have_fun", _messageByLocaleService.getMessage("gift.have_fun", locale));
        return textMap;
    }
}

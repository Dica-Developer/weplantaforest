package org.dicadeveloper.weplantaforest.dev.controller;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.cart.CartRepository;
import org.dicadeveloper.weplantaforest.certificate.Certificate;
import org.dicadeveloper.weplantaforest.certificate.CertificateRepository;
import org.dicadeveloper.weplantaforest.certificate.PdfCertificateView;
import org.dicadeveloper.weplantaforest.code.Code;
import org.dicadeveloper.weplantaforest.gift.Gift;
import org.dicadeveloper.weplantaforest.gift.GiftRepository;
import org.dicadeveloper.weplantaforest.gift.PdfGiftView;
import org.dicadeveloper.weplantaforest.user.User;
import org.dicadeveloper.weplantaforest.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Profile("dev")
@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired) )
public class DummyPdfController {

    private @NonNull GiftRepository _giftRepository;

    private @NonNull UserRepository _userRepository;

    private @NonNull CartRepository _cartRepository;

    private @NonNull CertificateRepository _certificateRepository;

    private final static String RELATIVE_STATIC_IMAGES_PATH_GIFT = "src/main/resources/static/images/gift";

    private final static String RELATIVE_STATIC_IMAGES_PATH_CERTIFICATE = "src/main/resources/static/images/pdf";

    @RequestMapping(value = "/gift/pdf/test", method = RequestMethod.GET, headers = "Accept=application/pdf")
    public ResponseEntity<?> createGiftPdf(HttpServletResponse response) {
        Gift gift = _giftRepository.findOne(1L);
        Code code = gift.getCode();

        String codeString = code.getCode();
        String[] splittedCode = codeString.split("-");

        PdfGiftView pdf = new PdfGiftView();

        try {
            pdf.buildPdfDocument(response.getOutputStream(), gift.getConsignor().getMail(), code.getTreeCount(), splittedCode, RELATIVE_STATIC_IMAGES_PATH_GIFT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(HttpStatus.OK);

    }

    @RequestMapping(value = "/certificate/pdf/test", method = RequestMethod.GET, headers = "Accept=application/pdf")
    public ResponseEntity<?> createCertificatePdf(HttpServletResponse response) {
        User user = _userRepository.findOne(1L);

        Long[] cartIds = { 1L };

        Certificate certificate = new Certificate();

        certificate.setCreator(user);
        certificate.setText("Dies ist mein Beitrag zur Rettung der Umwelt. Ich freue mich wie ein Schnitzel und kann gar nicht glauben, wie toll das ist.");

        List<Cart> carts = _cartRepository.findCartsByIdIn(cartIds);

        // get tree count
        int treeCount = 0;
        for (Cart cart : carts) {
            certificate.addCart(cart);
            treeCount = +cart.getTreeCount();
        }

        // generate certificate number
        int certificateCountByUser = _certificateRepository.countCertificatesByUser(1L);
        String certificateNumber = certificate.generateAndSetNumber(certificateCountByUser);

        _certificateRepository.save(certificate);

        PdfCertificateView pdf = new PdfCertificateView();
        try {
            pdf.writePdfDataToOutputStream(response.getOutputStream(), treeCount, certificate.getText(), user.getName(), certificateNumber, RELATIVE_STATIC_IMAGES_PATH_CERTIFICATE);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.OK);

    }

}

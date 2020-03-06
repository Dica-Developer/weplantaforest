package org.dicadeveloper.weplantaforest.dev.controller;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.cart.CartRepository;
import org.dicadeveloper.weplantaforest.certificate.Certificate;
import org.dicadeveloper.weplantaforest.certificate.CertificateRepository;
import org.dicadeveloper.weplantaforest.certificate.PdfCertificateView;
import org.dicadeveloper.weplantaforest.certificate.PdfCertificateView2;
import org.dicadeveloper.weplantaforest.common.errorHandling.IpatException;
import org.dicadeveloper.weplantaforest.gift.GiftRepository;
import org.dicadeveloper.weplantaforest.gift.GiftService;
import org.dicadeveloper.weplantaforest.receipt.PdfReceiptView;
import org.dicadeveloper.weplantaforest.receipt.Receipt;
import org.dicadeveloper.weplantaforest.receipt.ReceiptRepository;
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
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class DummyPdfController {

    private @NonNull GiftRepository _giftRepository;

    private @NonNull GiftService _giftService;

    private @NonNull UserRepository _userRepository;

    private @NonNull CartRepository _cartRepository;

    private @NonNull CertificateRepository _certificateRepository;

    private @NonNull ReceiptRepository _receiptRepository;

    private final static String RELATIVE_STATIC_IMAGES_PATH_GIFT = "src/main/resources/static/images/pdf";

    private final static String RELATIVE_STATIC_IMAGES_PATH_CERTIFICATE = "src/main/resources/static/images/pdf";

    @RequestMapping(value = "/gift/pdf/test", method = RequestMethod.GET, headers = "Accept=application/pdf")
    public ResponseEntity<?> createGiftPdf(HttpServletResponse response) throws IpatException {
        _giftService.createGiftPdf(1L, response);
        return new ResponseEntity<>(HttpStatus.OK);

    }

    @RequestMapping(value = "/certificate/pdf/test", method = RequestMethod.GET, headers = "Accept=application/pdf")
    public ResponseEntity<?> createCertificatePdf(HttpServletResponse response) {
        User user = _userRepository.findById(1L).orElse(null);

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
        // try {
        // pdf.writePdfDataToOutputStream(response.getOutputStream(), treeCount,
        // certificate.getText(), user.getName(), certificateNumber,
        // RELATIVE_STATIC_IMAGES_PATH_CERTIFICATE);
        // } catch (Exception e) {
        // return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        // }
        return new ResponseEntity<>(HttpStatus.OK);

    }

    @RequestMapping(value = "/certificate/pdf/test2", method = RequestMethod.GET, headers = "Accept=application/pdf")
    public ResponseEntity<?> createCertificatePdf2(HttpServletResponse response) {
        User user = _userRepository.findById(1L).orElse(null);

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

        PdfCertificateView2 pdf = new PdfCertificateView2();
        try {
            pdf.writePdfDataToOutputStream(response.getOutputStream(), treeCount, certificate.getText(), user.getName(), certificateNumber, RELATIVE_STATIC_IMAGES_PATH_CERTIFICATE);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.OK);

    }

    @RequestMapping(value = "/receipt/pdf/test", method = RequestMethod.GET, headers = "Accept=application/pdf")
    public ResponseEntity<?> createReceiptPdf(HttpServletResponse response) {
        Receipt receipt = _receiptRepository.findById(1L).orElse(null);

        PdfReceiptView pdf = new PdfReceiptView();

        try {
            pdf.writePdfDataToOutputStream(response.getOutputStream(), RELATIVE_STATIC_IMAGES_PATH_GIFT, receipt);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(HttpStatus.OK);

    }

}

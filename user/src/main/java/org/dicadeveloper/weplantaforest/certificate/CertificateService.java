package org.dicadeveloper.weplantaforest.certificate;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.messages.MessageByLocaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class CertificateService {

    private @NonNull MessageByLocaleService _messageByLocaleService;

    private final static String RELATIVE_STATIC_IMAGES_PATH = "/static/images/pdf";
    private final static String RELATIVE_STATIC_FONT_PATH = "/static/font";

    public void generatePdf(Certificate certificate, HttpServletResponse response, String certificateNumber) throws Exception {
        PdfCertificateView pdf = new PdfCertificateView();
        Integer treeCount = calcTreeCount(certificate);
        Map<String, String> pdfTexts = generateTextMap(certificate.getCreator().getLang().getLocale());
        pdfTexts.put("treeCount", treeCount.toString());
        pdfTexts.put("certificateText", certificate.getText());
        pdfTexts.put("creatorName", certificate.getCreator().getName());
        pdfTexts.put("certificateNumber", certificateNumber);
        try {
            pdf.writePdfDataToOutputStream(response.getOutputStream(), pdfTexts, RELATIVE_STATIC_IMAGES_PATH, certificate.getCreator().getLang().getShortName(), RELATIVE_STATIC_FONT_PATH);
        } catch (Exception e) {
            throw e;
        }
    }

    private Integer calcTreeCount(Certificate certificate) {
        int treeCount = 0;
        for (Cart cart : certificate.getCarts()) {
            treeCount += cart.getTreeCount();
        }
        return treeCount;
    }

    private Map<String, String> generateTextMap(Locale locale) {
        Map<String, String> textMap = new HashMap<String, String>();

        textMap.put("certificate.header_company", _messageByLocaleService.getMessage("certificate.header_company", locale));
        textMap.put("certificate.header_account", _messageByLocaleService.getMessage("certificate.header_account", locale));
        textMap.put("certificate.header_homepage", _messageByLocaleService.getMessage("certificate.header_homepage", locale));
        textMap.put("certificate.about", _messageByLocaleService.getMessage("certificate.about", locale));
        textMap.put("certificate.trees", _messageByLocaleService.getMessage("certificate.trees", locale));
        textMap.put("certificate.tree", _messageByLocaleService.getMessage("certificate.tree", locale));
        textMap.put("certificate.certify_text", _messageByLocaleService.getMessage("certificate.certify_text", locale));
        textMap.put("certificate.planted_from", _messageByLocaleService.getMessage("certificate.planted_from", locale));
        textMap.put("certificate.no_confirmation", _messageByLocaleService.getMessage("certificate.no_confirmation", locale));
        textMap.put("certificate.halle", _messageByLocaleService.getMessage("certificate.halle", locale));
        textMap.put("certificate.founder", _messageByLocaleService.getMessage("certificate.founder", locale));
        textMap.put("certificate.header_text", _messageByLocaleService.getMessage("certificate.header_text", locale));
        return textMap;
    }
}

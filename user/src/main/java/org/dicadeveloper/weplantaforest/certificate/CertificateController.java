package org.dicadeveloper.weplantaforest.certificate;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dicadeveloper.weplantaforest.admin.codes.Cart;
import org.dicadeveloper.weplantaforest.admin.codes.CartRepository;
import org.dicadeveloper.weplantaforest.trees.Tree;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.dicadeveloper.weplantaforest.trees.User;
import org.dicadeveloper.weplantaforest.trees.UserRepository;
import org.dicadeveloper.weplantaforest.views.Views;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired) )
public class CertificateController {

    protected final static Log LOG = LogFactory.getLog(CertificateController.class.getName());

    private @NonNull CertificateRepository _certificateRepository;

    private @NonNull TreeRepository _treeRepository;

    private @NonNull UserRepository _userRepository;

    private @NonNull CartRepository _cartRepository;

    private final static String RELATIVE_STATIC_IMAGES_PATH = "src/main/resources/static/images/pdf";

    @RequestMapping(value = "/certificate/search/{certificateNumber:.+}", method = RequestMethod.GET)
    @JsonView(Views.PlantedTree.class)
    @Transactional
    public ResponseEntity<List<Tree>> findTreesForCertificateNumber(@PathVariable("certificateNumber") String certificateNumber) {
        certificateNumber = certificateNumber.replace("#", "");

        Certificate certificate = _certificateRepository.findByNumber(certificateNumber);

        if (null != certificate) {
            List<Long> treeIds = new ArrayList<>();
            for (Cart cart : certificate.getCarts()) {
                treeIds.addAll(cart.getTreeIds());
            }

            List<Tree> trees = _treeRepository.findTreesByIdIn(treeIds);

            return new ResponseEntity<>(trees, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/certificate/create", method = RequestMethod.POST)
    public ResponseEntity<byte[]> createCertificate(@RequestParam(value = "userId", required = false) final long userId, @RequestParam(value = "text", required = false) final String text,
            @RequestParam(value = "cartIds", required = false) final Long[] cartIds) {
        if (cartIds != null && cartIds.length > 0) {
            User user = _userRepository.findOne(userId);

            Certificate certificate = new Certificate();

            certificate.setCreator(user);
            certificate.setText(text);

            List<Cart> carts = _cartRepository.findCartsByIdIn(cartIds);

            // get tree count
            int treeCount = 0;
            for (Cart cart : carts) {
                certificate.addCart(cart);
                treeCount = +cart.getTreeCount();
            }

            // generate certificate number
            int certificateCountByUser = _certificateRepository.countCertificatesByUser(userId);
            String certificateNumber = certificate.generateAndSetNumber(certificateCountByUser);

            _certificateRepository.save(certificate);

            PdfCertificateView pdf = new PdfCertificateView();
            byte[] pdfBytes = null;
            try {
                File pdfFile = pdf.buildPdfDocument(treeCount, text, user.getName(), certificateNumber, RELATIVE_STATIC_IMAGES_PATH);
                pdfBytes = getCertificateAsPdf(pdfFile);
            } catch (Exception e) {
                LOG.error("Error occured while creating PDF!", e);
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return new ResponseEntity<>(pdfBytes, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    private byte[] getCertificateAsPdf(File pdfFile) {
        final ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        try {
            final FileInputStream inputStream = new FileInputStream(pdfFile);
            final byte[] bytes = new byte[1024];
            int read = 0;
            while ((read = inputStream.read(bytes, 0, bytes.length)) != -1) {
                outputStream.write(bytes, 0, read);
            }
            outputStream.flush();
            outputStream.close();
            inputStream.close();
        } catch (final IOException e) {
            LOG.error("could not load pdf!", e);
            return null;
        }
        return outputStream.toByteArray();
    }

}